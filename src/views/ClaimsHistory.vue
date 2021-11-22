<template>
  <div class="claims-history container-fluid">
    <div class="row">
      <div class="d-flex mb-5 mt-5">
      <h1>Claims / Advances History</h1>
      </div>
      <hr>
      <div v-for="(successfulClaim, index) in recentlySuccessfulUnnotifiedClaims" :key="index" class="alert alert-success success-notification" role="alert">
        Congrats, your claim for wallet lost on <b>{{getShortDate(successfulClaim.dateTimeOfLosingWallet)}}</b> with claim ID <b>{{successfulClaim.id}}</b> is successful. Claim Amount is <b>{{successfulClaim.claimAmount}}</b>.
        <br>
        Please click the button to activate your Virtual card.
        <button @click="updateNotifiedTimestamp(successfulClaim)" class="ml-3 btn btn-success">Thanks</button>
      </div>
    </div>
    <div v-if="claimsHistoryList">
      <div class="row" v-if="claimsHistoryList.length > 0">
        <div v-for="(claim, index) in claimsHistoryList" :key="index" class="card col-lg-4">
          <div class="card-body">
            <h5 class="card-title">Claim ID : <span class="text-bold">{{claim.id}}</span></h5>
            <h5 class="card-title">{{getShortDate(claim.dateTimeOfLosingWallet)}}</h5>
            <p class="card-text">From : <span class="text-bold">{{claim.locationOfLosingWallet}}</span></p>
            <div v-show="getStatusAttributes(claim).statusProcessing" class="spinner-border" :class="getStatusAttributes(claim).statusClass" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-show="!getStatusAttributes(claim).statusProcessing">
              <span class="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" width="24px" height="24px"><path fill="#32BEA6" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"/><path fill="#FFF" d="M392.6,172.9c-5.8-15.1-17.7-12.7-30.6-10.1c-7.7,1.6-42,11.6-96.1,68.8c-22.5,23.7-37.3,42.6-47.1,57c-6-7.3-12.8-15.2-20-22.3C176.7,244.2,152,229,151,228.4c-10.3-6.3-23.8-3.1-30.2,7.3c-6.3,10.3-3.1,23.8,7.2,30.2c0.2,0.1,21.4,13.2,39.6,31.5c18.6,18.6,35.5,43.8,35.7,44.1c4.1,6.2,11,9.8,18.3,9.8c1.2,0,2.5-0.1,3.8-0.3c8.6-1.5,15.4-7.9,17.5-16.3c0.1-0.2,8.8-24.3,54.7-72.7c37-39.1,61.7-51.5,70.3-54.9c0.1,0,0.1,0,0.3,0c0,0,0.3-0.1,0.8-0.4c1.5-0.6,2.3-0.8,2.3-0.8c-0.4,0.1-0.6,0.1-0.6,0.1l0-0.1c4-1.7,11.4-4.9,11.5-5C393.3,196.1,397,184.1,392.6,172.9z"/></svg>
                <p class="ml-3" v-if="claim.claimAmount">{{claim.claimAmount}}</p>
              </span>            
            </div>
          </div>
        </div>
      </div>
      <div v-if="claimsHistoryList.length===0">
        <h2 class="text-muted">No Claims Found. </h2>
        <br>
        <router-link to="/lostWalletRecords"><h4>Create a new Claim of lost wallet record</h4></router-link>
        <router-link to="/policyDetails"><h4>Check policy</h4></router-link>
      </div>
    </div>
    <div v-if="!claimsHistoryList">
      <h2 class="text-muted">Unable to load claims / advances history. </h2>
      <br>
      <h4>Server Issue</h4>
      <h4>We are sorry for the inconvinience, please try again after some time</h4>
    </div>
    <hr>
  </div>
</template>

<script>
import { getClaimsHistory, updateNotifiedTimestampForClaim, getCustomerDetailsService } from '@/service/service.js'
import { mapState, mapActions } from 'vuex';
import { isValidSession } from '@/common.js';

export default {
name: 'ClaimsHistory',
data(){ 
    return {
        claimsHistoryList : null,
        recentlySuccessfulUnnotifiedClaims : [],

        loggedInUserMobileNum : ''
    }
},
computed: {
    ...mapState(['loggedInUser']),
  },
methods: {
    ...mapActions(['getCustomerDetailsAction']),
    async initialiseValues(){
      let customerDetails = await getCustomerDetailsService(this.loggedInUser);
      // Add the Customer mobile number to fetch the cards registered with the logged in user
      this.loggedInUserMobileNum = customerDetails[0].mobileNum;
      this.claimsHistoryList = await this.getAllClaimsHistory();
      this.recentlySuccessfulUnnotifiedClaims = this.getRecentlySuccessfulUnnotifiedClaims(this.claimsHistoryList);
    },
    async getAllClaimsHistory(){
      const claimsHistory = await getClaimsHistory(this.loggedInUserMobileNum);
      return claimsHistory;
    },
    getShortDate(date){
      let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      let shortDate = new Date(date).toLocaleDateString("en-US", dateOptions)
      return shortDate;
    },
    getStatusAttributes(claim){
      let statusClass = (claim.status.toLowerCase() === "processing") ? 'text-warning' : '';
      let statusProcessing = (claim.status.toLowerCase() === "processing");
      return {statusClass, statusProcessing};
    },
    getRecentlySuccessfulUnnotifiedClaims(allClaimsHistory){
      let filteredList = allClaimsHistory.filter(claim => (claim.status.toLowerCase()==="success" && claim.notifiedOn===''))
      return filteredList;
    },
    async updateNotifiedTimestamp(claim){
      let updatedNotifiedTimestampForClaim = {...claim};
      let updatedNotifiedTimestampForClaimId = updatedNotifiedTimestampForClaim.id;
      updatedNotifiedTimestampForClaim.notifiedOn = new Date();
      const updateTimestampStatusText = await updateNotifiedTimestampForClaim(claim.id, updatedNotifiedTimestampForClaim)
      if(updateTimestampStatusText==="OK"){
        this.recentlySuccessfulUnnotifiedClaims = this.recentlySuccessfulUnnotifiedClaims.filter(claim => claim.id !== updatedNotifiedTimestampForClaimId);
      }
    }
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
  .text-bold{
    font-weight: 600;
  }
  .ml-3{
    margin-left: 3rem;
  }
  .claims-history{
    font-size : 1.3rem;
  }
  .success-notification{
    font-size: 1.6rem;
  }
</style>

