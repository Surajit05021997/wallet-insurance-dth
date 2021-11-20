<template>
  <div>
    <div class="mb-5 mt-5">
      <h1>Policy Details</h1>
    </div>
    <hr>
    <div v-if="policyDetails">
      <div v-if="this.selectedLogin==='Employee'">
          <table class="table table-hover">
            <thead>
            <tr>
              <th v-for="(policyDetailsField, index) in policyDetailsFields" :key="index">{{policyDetailsField}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(policyDetail, index) in policyDetails" :key="index">
              <td>{{policyDetail.id}}</td>
              <td>{{policyDetail.startDate}}</td>
              <td>{{policyDetail.endDate}}</td>
              <td>{{policyDetail.insuranceAmount}}</td>
              <td><button class="btn btn-danger" v-show="showRenewPolicyButton(policyDetail.endDate)" :disabled="!showRenewPolicyButton(policyDetail.endDate)">Renew Policy</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.selectedLogin==='Customer'">
        <div v-if="latestPolicy" class="container">
          <div class="row">
              <div v-if="!showRenewPolicyButton(latestPolicy.endDate)" class="col-lg-4">
                <div class="centered-content">
                  <h2 class="text-success"><b>You are Protected</b></h2>
                </div>
                <div class="centered-content">
                    <img src="../assets/protection-shield.jpg" alt="Wallet Protected Image">
                </div>
              </div>
              <div v-if="showRenewPolicyButton(latestPolicy.endDate)" class="col-lg-4">
                <div class="centered-content">
                  <h2 class="text-danger"><b>You are not insured</b></h2>
                </div>
                <div class="centered-content">
                    <img src="../assets/vulnerability.png" alt="Wallet unprotected Image">
                </div>     
              </div>
              <div class="col-lg-8">
                <table class="table table-hover font-size-1_6rem">
                    <!-- <tr v-for="(policyDetailsField, index) in policyDetailsFields" :key="index">
                      <th>{{policyDetailsField}}</th>
                      <td>{{renderLatestPolicy(index)}}</td>
                    </tr> -->
                  <thead>
                    <tr>
                      <th v-for="(policyDetailsField, index) in policyDetailsFields" :key="index">{{policyDetailsField}}</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr class="table-secondary">
                    <td>{{latestPolicy.id}}</td>
                    <td>{{latestPolicy.startDate}}</td>
                    <td>{{latestPolicy.endDate}}</td>
                    <td>{{latestPolicy.insuranceAmount}}</td>
                  </tr>
                  </tbody>
                </table>
                <div class="mt-6">
                  <h1 class="card-title">{{getTitleStringForCard(getRemainingDays(latestPolicy.endDate))}}</h1>
                  <button class="btn btn-danger font-size-1_6rem" v-show="showRenewPolicyButton(latestPolicy.endDate)" :disabled="!showRenewPolicyButton(latestPolicy.endDate)">Renew Policy</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!policyDetails" class="container">
      <h2 class="text-muted">Unable to load policy details.</h2>
      <br>
      <h4>Server Issue</h4>
      <h4>We are sorry for the inconvinience, please try again after some time</h4>
    </div>
  </div>
</template>

<script>
import { getSearchValue, getPolicyDetailsWithMobNum, getPolicyDetailsWithID, getLoginType, getCustomerDetailsService } from '@/service/service.js';
import { mapState, mapActions } from 'vuex';
import { isValidSession } from '@/common.js';

export default {
name: 'PolicyDetails',
data(){
    return {
        policyDetailsFields : [],
        policyDetails : null,
        latestPolicy : null,
        searchVal: '',
        selectedLogin: ''     
    }
},
computed: {
    ...mapState(['loggedInUser']),
  },
methods: {
    ...mapActions(['getCustomerDetailsAction']),
    async initialiseValues(){
      const response = await getLoginType();
      this.selectedLogin = response.loginType;
      console.log(this.selectedLogin);
      if(this.selectedLogin === "Customer"){
        let customerDetails = await getCustomerDetailsService(this.loggedInUser);
        this.policyDetails =  await getPolicyDetailsWithMobNum(customerDetails[0].mobileNum);
        this.latestPolicy = this.policyDetails[0];
      }
      else 
      this.showPolicyDataEmployeePortal();

      this.policyDetailsFields = [
        'Policy ID',
        'Start Date',
        'End Date',
        'Insurance Amount',
      ];
    },
    async showPolicyDataEmployeePortal() {
      const response = await getSearchValue();
      this.searchVal = response[0].searchVal;
      if(this.searchVal.charAt(0) !== 'P') {
        this.policyDetails =  await getPolicyDetailsWithMobNum(this.searchVal);
      } else {
        this.policyDetails =  await getPolicyDetailsWithID(this.searchVal);
      }
    },
    
    showRenewPolicyButton(checkEndDate){
      return (this.getRemainingDays(checkEndDate) < 0);
    },
    
    getPolicyId() {
      Math.random();
      Math.floor(Math.random());
      return Math.floor(Math.random() * 10) + 1;
    },
    getStarDate() {
      let timestamp = 1607110465663;
      let date = new Date(timestamp);
      return (date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());
    },
    getEndDate() {
      let timestamp = 1607110465663;
      let date = new Date(timestamp);
      this.endDate = (date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+(date.getFullYear()+1));
      return (date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+(date.getFullYear()+1)+
                " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());
    },
    getInsuranceAmount() {
      let insuranceAmt = 100000;
      let claimAmount = 10000;
      return (insuranceAmt - claimAmount);
    },
    getRemainingDays(date){
      let todaysDate = new Date();
      let endDate = new Date(date);
      let remainingDays = Math.round((endDate - todaysDate)/(1000*60*60*24));
      console.log(remainingDays);
      return remainingDays;
    },
    getTitleStringForCard(remainingDays){
      if (remainingDays === 0){
        return "Ending today, Renew Now"
      }
      else if(remainingDays < 0){
        return `Policy ended ${-remainingDays} days back, Renew Now`
      }
      else 
      return `${remainingDays} days remaining`
    },
    // renderLatestPolicy(index){
    //   switch(Object.keys(this.latestPolicy)[index]){
    //     case "id" : return this.latestPolicy["id"]
    //     case "startDate" : return this.latestPolicy["startDate"]
    //     case "endDate" : return this.latestPolicy["endDate"]
    //     case "insuranceAmount" : return this.latestPolicy["insuranceAmount"]
    //   }
    //   we know 
    //   this.policyDetailsFields = [
    //     'Policy ID',
    //     'Start Date',
    //     'End Date',
    //     'Insurance Amount',
    //   ];
    // }
}, 
created(){
  if(!isValidSession()){
      this.$router.push({
        name: 'Login'
      })
    }
  this.getCustomerDetailsAction(this.loggedInUser);
    this.initialiseValues();
  }
}
</script>

<style scoped>
  .centered-content{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .font-size-1_6rem{
    font-size: 1.6rem;
  }
  .mt-6{
    margin-top: 6rem;
  }
</style>