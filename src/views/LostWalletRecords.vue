<template>
  <div>
    <add-lost-wallet-record @lost-wallet-record-added="fetchLostWalletRecords()"></add-lost-wallet-record>
    <div class="d-flex mb-5 mt-5">
      <h1>Lost wallet Records</h1>
      <span class="ml-1"></span>
      <div v-if="checkIfPolicyExpired">
        <button :disabled="checkIfPolicyExpired" type="button" class="btn btn-outline-danger btn-text-1_5rem rounded-3">Can not add Lost Wallet Record, Policy Expired</button>
        <router-link to="/policyDetails"> <button type="button" class="btn btn-outline-info btn-text-1_5rem rounded-3">See Policy Details</button></router-link>
      </div>
      <div v-if="!checkIfPolicyExpired && checkIfNoRegisteredCards">
        <button :disabled="checkIfNoRegisteredCards" type="button" class="btn btn-outline-danger btn-text-1_5rem rounded-3">Can not add Lost Wallet Record, No Registered Cr / D Cards Found</button>
        <router-link to="/registeredCards"> <button type="button" class="btn btn-outline-info btn-text-1_5rem rounded-3">Register Cards</button></router-link>
      </div>
      <div v-if="!checkIfPolicyExpired && !checkIfNoRegisteredCards">
        <button type="button" class="btn btn-outline-success btn-text-1_5rem rounded-3" data-bs-toggle="modal" data-bs-target="#addLostWalletRecord">+ Add Lost Wallet Record</button>
      </div>
    </div>
    <hr>
    <div v-if="lostWalletRecords">
      <map-of-lost-wallet-records :refreshMapList="refreshMap"></map-of-lost-wallet-records>
      <hr>
      <table v-if="lostWalletRecords.length > 0" class="table table-hover">
        <thead>
          <tr>
            <th v-for="(lostWalletField, index) in lostWalletFields" :key="index">{{lostWalletField}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lostWalletRecord, index) in lostWalletRecords" :key="index">
            <td>{{lostWalletRecord.id}}</td>
            <td>{{lostWalletRecord.howYouLostWallet}}</td>
            <td>{{lostWalletRecord.dateTimeOfLosingWallet}}</td>
            <td>{{lostWalletRecord.locationOfLosingWallet}}</td>
            <td>{{lostWalletRecord.additionalDetailsOfLostWallet}}</td>
            <td>
              <span v-for="(card, index) in lostWalletRecord.listOfCardsToBlock" :key="index">
                <p>{{getCardDetailsWithCardId(card)}}</p>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!lostWalletRecords" class="container">
      <h2 class="text-muted">Unable to load lost wallet records.</h2>
      <br>
      <h4>Server Issue</h4>
      <h4>We are sorry for the inconvinience, please try again after some time</h4>
    </div>
  </div>
</template>

<script>
import { getLostWalletRecords, getPolicyDetailsWithMobNum, getCustomerDetailsService, getRegisteredCards } from '@/service/service.js';
import AddLostWalletRecord from '../components/AddLostWalletRecord.vue';
import MapOfLostWalletRecords from '../components/MapOfLostWalletRecords.vue';
import { mapState, mapActions } from 'vuex';
import { isValidSession } from '@/common.js';

export default {
  components: { AddLostWalletRecord
  , MapOfLostWalletRecords 
  },
name: 'LostWalletRecords',
data(){ 
    return {
        lostWalletFields : [],
        lostWalletRecords : null,
        refreshMap : false,
        checkIfPolicyExpired : null,
        checkIfNoRegisteredCards : null,

        loggedInUserMobileNum : '',
        allRegisteredCardsIncludingBlocked : null
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
      this.checkIfPolicyExpired = await this.isPolicyExpired();
      this.checkIfNoRegisteredCards = await this.areNoRegisteredCardsAdded();
      this.lostWalletFields = [
        'Claim ID',
        'How You Lost Wallet',
        'Date',
        'Location',
        'Additional Details',
        'Blocked Cards'
      ];
      await this.fetchLostWalletRecords();
    },
    async areNoRegisteredCardsAdded(){
      let filterCardType = [
        'cardTypeDebit',
        'cardTypeCredit'
      ];
      let allCards = await getRegisteredCards(this.loggedInUserMobileNum);
      this.allRegisteredCardsIncludingBlocked = allCards;
      let debitCreditCardList = allCards.filter(eachCard => !eachCard.isBlocked && (filterCardType.includes(eachCard.cardType)));
      console.log(debitCreditCardList);
      if (debitCreditCardList.length === 0 )
        return true;
      return false
    },
    async isPolicyExpired(){
      let policyDetails = await getPolicyDetailsWithMobNum(this.loggedInUserMobileNum);
      let latestPolicy = policyDetails[0];
      let todaysDate = new Date();
      let endDate = new Date(latestPolicy.endDate);
      let remainingDays = Math.round((endDate - todaysDate)/(1000*60*60*24));
      if(remainingDays < 0)
        return true;
      return false;      
    },
    async fetchLostWalletRecords(){
      this.lostWalletRecords = await getLostWalletRecords(this.loggedInUserMobileNum);
      // This we are doing just to refresh the mapMarkerslist as refreshMap is on "watch" in map Marker
      this.refreshMap = true
      setTimeout(()=>{
        this.refreshMap = false;
      },2000)      
    },
    getCardDetailsWithCardId(cardId){
      let parsedCardId = parseInt(cardId);
      let cardDetails = this.allRegisteredCardsIncludingBlocked.filter(card => card.id === parsedCardId);
      // the cardDetails will contain only one elememt, but as an array, so retrieve that with cardDetails[0]
      let stringForCardDetails = `${cardDetails[0].bank.slice(0, cardDetails[0].bank.length/2)} - xx ${cardDetails[0].cardNumber.slice(cardDetails[0].cardNumber.length - 4)}`;
      return stringForCardDetails;
    },
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
  .btn-text-1_5rem{
  font-size: 1.5rem
}
.ml-1{
  margin-left:1rem;
}
</style>

