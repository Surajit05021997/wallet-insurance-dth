<template>
  <div class="container-fluid">
    <div class="d-flex mb-5 mt-5">
      <h1>Virtual Card</h1>
    </div>
    <hr>
    <div v-if="!activeVirtualCard">
      <h3 class="text-muted">The card is currently inactive</h3>
      <h3 class="text-muted">You can check if your claim is approved under Claims / Advances</h3>
      <div class="row">
        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-4">
          <!-- Payment card Start -->
          <div class="p-3 my-3 opaque-card">
            <div class="height-100 d-flex justify-content-center align-items-center">
                <div class="card p-3">
                    <div class="d-flex justify-content-between align-items-center"> <span class="text-1_5rem">xxx</span>
                        <h2>Virtual Card</h2>
                    </div>
                    <div class="px-2 number mt-3 d-flex justify-content-between align-items-center"> <span>xxxx</span> <span>xxxx</span> <span>xxxx</span> <span>xxxx</span> </div>
                    <div class="p-4 card-border mt-4">
                        <div class="d-flex justify-content-between align-items-center"> <span class="cardholder">Name</span> <span class="expires">Expires</span> </div>
                        <div class="d-flex justify-content-between align-items-center"> <span class="name">xxxx xxxx</span> <span class="date">xx / xx</span> </div>
                    </div>
                </div>
            </div>      
          </div>
          <!-- Payment card End -->
        </div>
      </div>
    </div>
    <div v-if="activeVirtualCard">
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4">
          <h3 class="text-muted">Use the Below card for assistance in payment.</h3>
          <h3 class="text-muted">See Card details by verifying with OTP.</h3>
          <h3 class="text-muted">OTP Will be sent to your registered mobile number.</h3>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4">
          <h3 class="text-muted">Scan QR code for assistance in payment.</h3>
          <h3 class="text-muted">Use camera to search of QR Code</h3>
          <h3 class="text-muted">Any payment above limit will be declined</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-4">
          <!-- Payment card Start -->
          <div class="p-3 my-3">
            <div class="height-100 d-flex justify-content-center align-items-center">
                <div class="card p-3">
                    <div class="d-flex justify-content-between align-items-center"> 
                      <span v-if="isIdentityVerifiedViaOtp" class="text-1_5rem">{{activeVirtualCard.cvv}}</span>
                      <span v-if="!isIdentityVerifiedViaOtp" class="text-1_5rem">xxx</span>
                        <h2>Virtual Card</h2>
                    </div>

                    <div v-if="isIdentityVerifiedViaOtp" class="px-2 number mt-3 d-flex justify-content-between align-items-center"> <span>{{activeVirtualCard.cardNumber.substr(0,4)}}</span> <span>{{activeVirtualCard.cardNumber.substr(4,4)}}</span> <span>{{activeVirtualCard.cardNumber.substr(8,4)}}</span> <span>{{activeVirtualCard.cardNumber.substr(12,4)}}</span> </div>
                    <div v-if="!isIdentityVerifiedViaOtp" class="px-2 number mt-3 d-flex justify-content-between align-items-center"> <span>xxxx</span> <span>xxxx</span> <span>xxxx</span> <span>xxxx</span> </div>

                    <div class="p-4 card-border mt-4">
                        <div class="d-flex justify-content-between align-items-center"> <span class="cardholder">Name</span> <span class="expires">Expires</span> </div>
                        <div v-if="isIdentityVerifiedViaOtp" class="d-flex justify-content-between align-items-center"> <span class="name">{{activeVirtualCard.nameOnCard}}</span> <span class="date">{{activeVirtualCard.expiryDate}}</span> </div>
                        <div v-if="!isIdentityVerifiedViaOtp" class="d-flex justify-content-between align-items-center"> <span class="name">xxxx xxxx</span> <span class="date">xx / xx</span> </div>
                    </div>
                </div>
            </div>      
          </div>
          <!-- Payment card End -->
          <!-- Identity Verification Form Start-->
          <div class="mx-sm-3">
            <button @click="sendOtpButtonClicked()" type="submit" class="btn btn-outline-primary mb-2 text-1_5rem float-end">Send OTP</button>
            <div v-if="showOtpVerificationForm">
              <div class="form-group mb-2">
                <input type="text" class="form-control text-1_5rem" id="otpVerificationInput" placeholder="Enter OTP" v-model="otpInput">
              </div>
              <button @click="verifyOtpButtonClicked()" type="submit" class="btn btn-success mb-2 text-1_5rem float-end">Confirm OTP</button>
            </div>
          </div>
          <!-- Identity verification Form End -->
        </div>
        <!-- Scan QR code start -->
         <div class="offset-xl-1 offset-lg-1 offset-md-1 offset-sm-1 col-xl-5 col-lg-5 col-md-5 col-sm-4">
           <div class="centered-content">
              <img v-if="showQrCodeImage" width="275px" src="data:image/png;base64,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" alt="">
              <video id="video" v-if="!showQrCodeImage" width="275px">Video Here</video>
           </div>
           <br>
           <button @click="openCameraButtonClicked()" type="submit" class="btn btn-outline-primary mb-2 text-1_5rem float-end">Open Camera</button>
         </div>
         <!-- Scan QR code End -->
      </div>
    </div>
  </div>
</template>

<script>
import { getCustomerDetailsService, getClaimsHistory } from '@/service/service.js'
import { mapState, mapActions } from 'vuex';
import { isValidSession } from '@/common.js';

export default {
  name: 'VirtualCardPayment',
  data(){
    return {
      customerName : '',
      showOtpVerificationForm : false,
      isIdentityVerifiedViaOtp : false,
      activeVirtualCard : null,
      recentSuccessfulClaim : null,
      loggedInUserMobileNum : '',
      otpInput : '',
      showQrCodeImage : true,
    }
  },
  computed: {
    ...mapState(['loggedInUser']),
  },
  methods: {
    ...mapActions(['getCustomerDetailsAction']),
    async initialiseValues(){
      let customerDetails = await getCustomerDetailsService(this.loggedInUser);
      this.customerName = customerDetails[0].name;
      // Add the Customer mobile number to fetch the cards registered with the logged in user
      this.loggedInUserMobileNum = customerDetails[0].mobileNum;
      await this.getRecentSuccessfulClaim();
      if(this.recentSuccessfulClaim){
        const startDate = new Date(this.recentSuccessfulClaim.notifiedOn);
        let expiryDate = new Date(this.recentSuccessfulClaim.notifiedOn); // we will modify the expiry date via next operation
        expiryDate.setDate(startDate.getDate() + 7); // setted expiry date 7 days more than notified timestamp
        this.activeVirtualCard = {};
        this.activeVirtualCard["nameOnCard"] = this.customerName;
        this.activeVirtualCard["cardNumber"] = "9850914745890042";
        this.activeVirtualCard["expiryDate"] = this.getMonthYear(expiryDate);
        this.activeVirtualCard["cvv"] = "972";
        this.activeVirtualCard["claimAmount"] = this.recentSuccessfulClaim.claimAmount;
      }
    },
    async getRecentSuccessfulClaim(){
      const claimsHistory = await getClaimsHistory(this.loggedInUserMobileNum);

      let filteredClaims = claimsHistory?.filter(claim=>(claim.status.toLowerCase()==="success" && this.isVirtualCardValid(claim)))
      
      if(claimsHistory.length > 0){
        this.recentSuccessfulClaim = filteredClaims[0]; // get Last element of filtered Claim
      }
    },
    isVirtualCardValid(claim){
      if(!claim.notifiedOn)
      {
        return false;
      }
      const today = new Date();
      const virtualCardStartDate = new Date(claim.notifiedOn);
      const virtualCardActiveDays = Math.round((today - virtualCardStartDate)/(1000*60*60*24));
      if(virtualCardActiveDays > 7)
        return false;
      return true;
    },
    getMonthYear(date){
      let dateOptions = { year: '2-digit', month: 'numeric'};
      let monthYear = new Date(date).toLocaleDateString("en-US", dateOptions)
      return monthYear;
    },
    sendOtpButtonClicked(){
      this.showOtpVerificationForm = true;
    },
    verifyOtpButtonClicked(){
      if(this.otpInput.length === 0){
        this.otpInput = "Enter Correct OTP Here"
      }
      else{
      this.otpInput = "OTP Verified, See card Details above";
      this.isIdentityVerifiedViaOtp = true;
      this.$swal({
            title: 'Identity Verified',
            html: `<h4>See card details. The Limit of expense is</h4> <h3><b>${this.activeVirtualCard.claimAmount}</b></h3>`,
            icon: 'success',
            timer: 4000
        });
      }
    },
    openCameraButtonClicked(){
      let video = document.querySelector("#video");
      navigator.mediaDevices.getUserMedia({video : true, audio: false})
      .then((stream)=>{
          this.showQrCodeImage = false;
          video.srcObject = stream;
          video.play();
      }).catch(()=>{
        console.log("Camera Permission Denied");
      })
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
 .radio-toolbar, .d-flex {
  display: flex;
}
.m-1{
  margin: 8px;
}
.mx-0_5rem{
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.mx-1rem{
  margin-left: 1rem;
  margin-right: 1rem;
}

.btn-text-1_5rem, .text-1_5rem{
  font-size: 1.5rem
}

.extra-options-over-card{
  right: 9%;
  top: 20px;
  opacity: 0;
  transition: 0.1s ease-in;
}

.paymentCard:hover:not(.decrease-opacity) ~ .extra-options-over-card, .extra-options-over-card:hover{
  opacity: 1;
}

.paymentCard{
  transition: 0.1s ease-in;
}

.decrease-opacity{
  transform: scale(0.97);
  opacity: 0.1;
}

.hide-button{
  display: none;
}

.ml-1{
  margin-left:1rem;
}

.card {
    border: none;
    width: 35rem;
    border-radius: 12px;
    background-image: linear-gradient(to right top, #dfe0e0, #c4b0ec)
}

.number span {
    font-size: 20px;
    font-weight: 600
}

.cardholder,
.expires {
    font-weight: 600;
    font-size: 17px
}

.name,
.date {
    font-size: 15px
}

.card-border {
    border-top-left-radius: 30px !important;
    border-top-right-radius: 30px !important;
    border: none;
    border-radius: 6px;
    background-color: blue;
    background-image: linear-gradient(to left bottom, #dfe0e0, #c4b0ec)
}

.paymentGatewayImage{
    width: auto;
    max-height: 3rem;
}
.opaque-card{
  border: #c4b0ec solid 2px;
  opacity: 0.5;
}
.centered-content{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>