<template>
<div>
  <div class="modal fade" id="addFamilyMember" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addFamilyMemberLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered max-width-35rem">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title card-title" id="addFamilyMemberLabel">Add a Family Member</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="mb-3">
                  <label for="familyMemberName" class="form-label">Name</label>
                  <input type="text" class="form-control font-size-1_5" id="familyMemberName" placeholder="Enter Name" v-model="addFormFamilyMemberName">
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label for="familyMemberEmail" class="form-label">Email</label>
                  <input type="text" class="form-control font-size-1_5" id="familyMemberEmail" placeholder="Enter Email ID" v-model="addFormFamilyMemberEmail">
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label for="familyMemberMobile" class="form-label">Mobile Number</label>
                  <input type="text" class="form-control font-size-1_5" id="familyMemberEmail" placeholder="Enter Mobile Number" v-model="addFormFamilyMemberMobile">
                </div>
              </div>
              <div class="row">
                <label for="familyMemberRelation" class="form-label">Relation</label>
                <select id="familyMemberRelation" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="addFormFamilyMemberRelation">
                  <option disabled value="">Mention Relation</option>
                  <option v-for="(relation, index) in relationsList" :key="index" :value="relation">{{relation}}</option>
                </select>
                <span class="mb-3" v-if="addFormFamilyMemberName && addFormFamilyMemberRelation">Make Sure this is correct : {{addFormFamilyMemberName}} is your {{addFormFamilyMemberRelation}} ?</span>
              </div>
              <div class="row">
                <div class="mb-3">
                  <input type="checkbox" autocomplete="off" :value="addFormFamilyMemberIsAuthorised" class="btn-check" id="familyMemberIsAuthorised" v-model="addFormFamilyMemberIsAuthorised">
                  <label for="familyMemberIsAuthorised" class="btn btn-outline-danger">Is Authorised for any actions ?</label>
                  <span class="ml-3">{{ addFormFamilyMemberIsAuthorised ? 'Yes' : 'No'}}</span>
                </div>
              </div>
            </div>
          <div v-if="addFormProcessing" class="spinner-border text-primary float-end" role="status">
            <span class="sr-only"></span>
          </div>
          <button :disabled="addFormProcessing" type="button" @click="verifyFormInputsAndAddFamilyMember()" class="btn btn-primary float-end">Add Member</button>
            <p v-if="addFormErrors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li class="text-danger" v-for="(error,index) in addFormErrors" :key="index">{{ error }}</li>
              </ul>
            </p>
        </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { addFamilyMember } from '@/service/service.js';

export default {
  name: "AddCard",
  data(){
    return {
      relationsList : [],
      addFormFamilyMemberIsAuthorised : false,
      addFormFamilyMemberName : '',
      addFormFamilyMemberEmail : '',
      addFormFamilyMemberMobile : '',
      addFormFamilyMemberRelation : '',
      addFormErrors: [],
      addFormProcessing: false,
    }
  },
  created(){
    this.initialiseValues();
  },
  methods: {
    initialiseValues(){
      this.relationsList = [
        'Father',
        'Mother',
        'Brother',
        'Sister',
        'Grandfather',
        'Grandmother',
        'Grandson',
        'Granddaughter',
        'Gaurdian'
      ]
    },
    async verifyFormInputsAndAddFamilyMember(){
      this.addFormErrors = [];

      if(!this.addFormFamilyMemberName){
        this.addFormErrors.push('Name is Mandatory');
      }
      if(!this.addFormFamilyMemberEmail){
        this.addFormErrors.push('Email ID is Mandatory');
      }
      if(!this.addFormFamilyMemberRelation){
        this.addFormErrors.push('Please select Relation from dropdown');
      }

      if(!this.addFormFamilyMemberMobile){
        this.addFormErrors.push('Mobile Number is Mandatory');
      }

      if(this.addFormFamilyMemberMobile){
        this.validateMobileNumberRegEx(this.addFormFamilyMemberMobile);
      }

      if(this.addFormFamilyMemberEmail){
        this.validateEmailRegEx(this.addFormFamilyMemberEmail);
      }

      if(this.addFormErrors.length === 0){
        this.addFormErrors = [];
        await this.addCard();
      }
    },
    validateMobileNumberRegEx(mobileNumber){
      const mobileNumberRegEx = '^[6-9][0-9]{9}$';
      if(mobileNumber.match(mobileNumberRegEx))
        return true;
      else 
      this.addFormErrors.push('Add 10 Digit VALID Mobile Number');
      return false;
    },
    validateEmailRegEx(email){
      if(email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))
        return true;
      else 
      this.addFormErrors.push('Add Valid Email ID');
      return false;
    },
    async addCard(){
      let addFormFields = {
        familyMemberName : this.addFormFamilyMemberName,
        familyMemberEmail : this.addFormFamilyMemberEmail,
        familyMemberMobile : this.addFormFamilyMemberMobile,
        familyMemberRelation : this.addFormFamilyMemberRelation || 'IdCard',
        isAuthorised : this.addFormFamilyMemberIsAuthorised,
      }
      this.addFormProcessing = true;
      let addFamilyMemberStatusText = await addFamilyMember(addFormFields);
      if(addFamilyMemberStatusText==="Created"){
        this.resetFormFields();
          this.$swal({
                title: 'Added',
                text: "Family member has successfully been added",
                icon: 'success',
                timer: 2000
            });
        this.$emit('family-member-added');
      }
      else{
        this.$swal({
          title: 'Server Issue',
          text: "Sorry for inconvinience, please reload page",
          icon: 'warning',
          timer: 3000
        })
      }
      this.addFormProcessing = false;
      let addFamilyMemberModalCloseButton = document.querySelector("#addFamilyMember [data-bs-dismiss=modal]");
      addFamilyMemberModalCloseButton.click();
      },
    resetFormFields(){
        this.addFormFamilyMemberName = '';
        this.addFormFamilyMemberEmail = '';
        this.addFormFamilyMemberMobile = '';
        this.addFormFamilyMemberRelation = '';
        this.addFormFamilyMemberIsAuthorised = false;
        this.addFormErrors = [];
    },
  }
}
</script>

<style scoped>
  .max-width-35rem{
    width: 35rem;
  }

  #addPaymentCard{
    font-size: 1.3rem;
  }

  #addCardLabel, .font-size-1_5{
    font-size: 1.5rem;
  }

  button.btn{
    font-size: 1.3rem;
  }

  .ml-3{
    margin-left: 3rem;
  }
</style>

