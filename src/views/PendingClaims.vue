<template>
  <div>
    <div class="mb-5 mt-5">
      <h1>Pending Claims / Advances</h1>
    </div>
    <hr>
    <div class="radio-toolbar" id="option-selected">
      <div v-for="(eachOption, index) in this.selectionOptions" :key="index" :checked="eachOption.type===selectedOption" class="m-1">
        <input type="radio" class="form-check-input btn-text-1_5rem" name="filter-selection-option" :value="eachOption.type" :id="eachOption.option" :checked="eachOption.type===selectedOption" @change="getSelectedOption()">
        <label class="mx-0_5rem form-check-label btn-text-1_5rem" :for="eachOption.option">{{eachOption.option}}</label>
      </div>
    </div>
    <h3>Click on a claim for more information</h3>
    <div>
      <!-- Accordian Start -->

    <div class="accordion accordion-flush" id="accordionAllClaimsHistoryList">
  <div class="accordion-item" v-for="(claim, index) in filteredClaimsHistoryList" :key="index">
      <h2 class="accordion-header" :id="`accordian_${claim.id}`">
      <button class="accordion-button collapsed btn-text-1_5rem" type="button" data-bs-toggle="collapse" :data-bs-target="`#accordian_${claim.id}_collapse`" aria-expanded="false" :aria-controls="`accordian_${claim.id}_collapse`" @click="resetClientPolicyDetails()">
        Claim ID # : {{claim.id}}
      </button>
    </h2>
    <div :id="`accordian_${claim.id}_collapse`" class="accordion-collapse collapse" :aria-labelledby="`accordian_${claim.id}`" data-bs-parent="#accordionAllClaimsHistoryList">
      <div class="accordion-body text-1_3rem">
        <h3>Location of Losing Wallet : <b>{{claim.locationOfLosingWallet}}</b></h3>
        <h4>Date and Time of Losing Wallet : <b>{{getShortDateTime(claim.dateTimeOfLosingWallet)}}</b></h4>
        <h5>Client mobile number : {{claim.mobileNum}}</h5>
        <div>
          <span class="d-flex">
            <h2>Policy Details for this client</h2>
            <button class='ml-2 btn btn-outline-primary text-1_7rem' @click="getPolicyDetailsForClient(claim.mobileNum)">See Policy for client</button>
          </span>
          <div v-if="clientPolicyDetails">
            <p>Start Date : {{getShortDate(clientPolicyDetails.startDate)}}</p>
            <p>End Date : {{getShortDate(clientPolicyDetails.endDate)}}</p>
            <p>Insurance amount: {{clientPolicyDetails.insuranceAmount}}</p>
          </div>
          <div v-if="selectedOption==='pendingClaims'">

              <input type="radio" class="btn-check" name="approve-or-reject" value="approveClaim" id="approveClaimButton" @change="getSelectedClaimStatusUpdate()">
              <label class="btn btn-outline-success text-1_7rem" for="approveClaimButton">Approve Claim</label>
                <span class="ml-2"></span>
              <input type="radio" class="btn-check" name="approve-or-reject" value="rejectClaim" id="rejectClaimButton" @change="getSelectedClaimStatusUpdate()">
              <label class="btn btn-outline-danger text-1_7rem" for="rejectClaimButton">Reject Claim</label>

            <!-- <button @click="approveClaimClicked()" class="btn btn-success">Approve Claim</button>
            <button @click="rejectClaimClicked()" class="ml-2 btn btn-outline-danger">Reject Claim</button> -->
            <!-- Show approval input or rejection reason input -->
              <!-- Approval button clicked -->
            <div v-if="approveClaimSectionOpen" class="form-group">
              <label class="text-1_7rem" for="pendingClaimFormApproveAmount">Enter Amount to Approve claim / Advance</label>
              <input type="text" class="form-control text-1_7rem" id="pendingClaimFormApproveAmount" placeholder="Enter Amount" v-model="pendingClaimFormApproveAmountInput">
            </div>
            <!-- Rejected Button clicked -->
            <div v-if="rejectClaimSectionOpen" class="form-group">
              <label class="text-1_7rem" for="pendingClaimFormRejectionReason">Enter Rejection Reason</label>
              <input type="text" class="form-control text-1_7rem" id="pendingClaimFormRejectionReason" placeholder="Enter Rejection Reason" v-model="pendingClaimFormRejectionReasonInput">
            </div>
            <p v-if="pendingClaimFormErrors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li class="text-danger" v-for="(error,index) in pendingClaimFormErrors" :key="index">{{ error }}</li>
              </ul>
            </p>
            <button v-if="rejectClaimSectionOpen!==approveClaimSectionOpen" :disabled="submitClaimUpdateProcessing" type="button" @click="verifyFormInputsAndSubmitClaimUpdate(claim)" class="btn btn-primary text-1_7rem">Submit</button>
            
          </div>
          <div v-if="selectedOption==='showAll'">
            <div v-show="getStatusAttributes(claim).status" class="spinner-border" :class="getStatusAttributes(claim).statusClass" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3 :class="getStatusAttributes(claim).statusClass">{{getStatusAttributes(claim).statusText}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <!-- Accordian End -->
    </div>
    
  </div>
</template>

<script>
import { getLoginType, getAllClaims, getPolicyDetailsWithMobNum, updateClaimStatus } from '@/service/service.js';
import { mapState } from 'vuex';
import { isValidSession } from '@/common.js';

export default {
name: 'PendingClaims',
data(){
    return {
        claimsHistoryList : null,
        filteredClaimsHistoryList : null,
        selectedOption : '',
        selectionOptions : [],
        clientPolicyDetails : null,
        pendingClaimFormApproveAmountInput : '',
        pendingClaimFormRejectionReasonInput : '',
        approveClaimSectionOpen : false,
        rejectClaimSectionOpen : false,
        submitClaimUpdateProcessing : false,
        pendingClaimFormErrors : []
    }
},
computed: {
    ...mapState(['loggedInUser']),
  },
methods: {
    async initialiseValues(){
        this.selectedOption = 'pendingClaims',
        await this.fetchClaims();
        this.getFilteredClaims();      
      
      this.selectionOptions = [
          {
          'option' : 'Show All',
          'value' : 'Show All',
          'type' : 'showAll'
          },
          {
          'option' : 'Only Pending Claims',
          'value' : 'Pending Claims',
          'type' : 'pendingClaims'
          },
        ]
    },
    getSelectedOption(){
    let selectedMenu = document.querySelector('input[name="filter-selection-option"]:checked').value;
    this.selectedOption = selectedMenu;
    this.resetClientPolicyDetails();
    this.getFilteredClaims();
    
  },
  getSelectedClaimStatusUpdate(){
    let selectedClaimStatusUpdate = document.querySelector('input[name="approve-or-reject"]:checked').value;
    if(selectedClaimStatusUpdate==="approveClaim"){
      this.approveClaimClicked();
    }
    if(selectedClaimStatusUpdate==="rejectClaim"){
      this.rejectClaimClicked();
    }
  },
  async fetchClaims(){
    this.claimsHistoryList = await getAllClaims();
  },
  getFilteredClaims(){
    if(this.selectedOption==="pendingClaims")
    {
      this.filteredClaimsHistoryList = this.claimsHistoryList.filter(claim => claim.status.toLowerCase()==="processing")
    }
    else {
      this.filteredClaimsHistoryList = this.claimsHistoryList
    }
  },
  getShortDateTime(dateTime){
      let dateOptions = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      let shortDateTime = new Date(dateTime).toLocaleDateString("en-US", dateOptions)
      return shortDateTime;
    },

  getShortDate(date){
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric',};
    let shortDate = new Date(date).toLocaleDateString("en-US", dateOptions)
    return shortDate;
  },
  async getPolicyDetailsForClient(mobileNum){
    if(!this.clientPolicyDetails)
    {
      const response = await getPolicyDetailsWithMobNum(mobileNum);
      this.clientPolicyDetails = response[0];
    }
    else
      this.resetClientPolicyDetails();

    // client POlicy details will be nullfied after 5 seconds
    // setTimeout(()=>{
    //   this.clientPolicyDetails = null;
    // }, 3000)
  },
  resetClientPolicyDetails(){
    this.clientPolicyDetails = null;
  },
  getStatusAttributes(claim){
    // The logic is currently working only for Successful or Pending claims
      let statusClass = (claim.status.toLowerCase() === "processing") ? 'text-warning' : 'text-success';
      let statusProgress = (claim.status.toLowerCase() === "processing");
      let statusText = (claim.status.toLowerCase() === "processing" ? 'Claim in Process' : 'Successful Claim');
      return {statusClass, statusProgress, statusText};
    },
  approveClaimClicked(){
    this.rejectClaimSectionOpen = false;
    this.approveClaimSectionOpen = true;
  },
  rejectClaimClicked(){
    this.approveClaimSectionOpen = false;
    this.rejectClaimSectionOpen = true;
  },
  async verifyFormInputsAndSubmitClaimUpdate(claim){
    this.pendingClaimFormErrors = []
    if(this.approveClaimSectionOpen && !this.pendingClaimFormApproveAmountInput)
    {
      this.pendingClaimFormErrors.push("Please enter Approval Amount")
    }

    if(this.rejectClaimSectionOpen && !this.pendingClaimFormRejectionReasonInput)
    {
      this.pendingClaimFormErrors.push("Please enter Rejection Reason")
    }

    if(this.approveClaimSectionOpen && this.pendingClaimFormApproveAmountInput){
      const approvalAmountRegEx = '^[1-9][0-9]{1,5}$';
      if(!this.pendingClaimFormApproveAmountInput.match(approvalAmountRegEx))
      {
        this.pendingClaimFormErrors.push("Please enter Valid amount")
      }
    }

    if(this.pendingClaimFormErrors.length === 0){
        this.pendingClaimFormErrors = [];
        await this.submitClaimUpdate(claim);
      }
  },
  async submitClaimUpdate(claim){
      let submitClaimUpdateFormFields = {...claim};
      if(this.approveClaimSectionOpen){
        submitClaimUpdateFormFields.status = "success";
        submitClaimUpdateFormFields.claimAmount = this.pendingClaimFormApproveAmountInput;
        submitClaimUpdateFormFields.claimRejectionReason = ""
      }
      if(this.rejectClaimSectionOpen){
        submitClaimUpdateFormFields.status = "rejected";
        submitClaimUpdateFormFields.claimAmount = "";
        submitClaimUpdateFormFields.claimRejectionReason = this.pendingClaimFormRejectionReasonInput;
      }
      this.submitClaimUpdateProcessing = true;
      const submitClaimUpdateStatusText = await updateClaimStatus(claim.id, submitClaimUpdateFormFields)
      if(submitClaimUpdateStatusText==="OK"){
        this.resetFormFields();
                this.$swal({
                  title: 'Updated',
                  text: "Claim status updated",
                  icon: 'success',
                  timer: 2000
              });
        }
        else{
            this.$swal({
              title: 'Server Issue',
              text: "Could not update claim. Sorry for inconvinience, please reload page",
              icon: 'warning',
              timer: 3000
            });
        }
        this.submitClaimUpdateProcessing = false;
        this.collapseAllAccordians();
        await this.fetchClaims();
        this.getFilteredClaims();
  },
  resetFormFields(){
    this.pendingClaimFormApproveAmountInput = '';
    this.pendingClaimFormRejectionReasonInput = '';
  },
  collapseAllAccordians(){
    let collapsedAccordian = document.querySelector('#accordionAllClaimsHistoryList .accordion-item .accordion-collapse.collapse.show');
    let collapseAccordianButtons = document.querySelectorAll('#accordionAllClaimsHistoryList .accordion-item .accordion-button');
    if(collapsedAccordian){
      collapsedAccordian.classList.remove('show'); // Remove the 'show' class so that the accordian will not be visible
    }
    collapseAccordianButtons.forEach(button => {
      if(!button.classList.contains('collapsed')){
        button.classList.add('collapsed')
      }
    });
  }
},
async created(){
      const response = await getLoginType();
      this.selectedLogin = response.loginType;
      if(!isValidSession() || (this.selectedLogin !== "Employee")){
          this.$router.push({
            name: 'Login'
          })
        }
      this.initialiseValues();
  },
}
</script>

<style scoped>
  .btn-text-1_5rem{
  font-size: 1.5rem !important; 
}

.text-1_3rem{
  font-size: 1.3rem !important; 
}

.text-1_7rem{
  font-size: 1.7rem !important; 
}

.ml-2{
  margin-left: 2rem;
}

 .radio-toolbar, .d-flex {
  display: flex;
}
</style>