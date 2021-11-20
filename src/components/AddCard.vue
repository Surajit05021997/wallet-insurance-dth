<template>
<div>
  <div class="modal fade" id="addPaymentCard" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCardLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered max-width-35rem">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title card-title" id="addCardLabel">Add a Card</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div v-for="(option, index) in selectionOptions" :key="index" class="mb-3 col-lg-4">
                <input class="form-check-input" type="radio" name="cardType" :id="option.id" :value="option.id" @change="getSelectedOption()" v-model="addFormCardType">
                <label class="form-check-label" :for="option.id">
                &nbsp;{{option.value}}
              </label>
              </div>
            </div>
            <div v-if="selectedOption!=='cardTypeIdCard'" class="mb-3">
              <label for="selectBank" class="form-label">Select Bank</label>
              <select id="selectBank" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="addFormSelectBank">
                <option disabled value="">Select Bank</option>
                <option v-for="(bank, index) in banksList" :key="index" :value="bank">{{bank}}</option>
              </select>
              <label for="paymentGatewayType" class="form-label">Select Payment Gateway</label>
              <select id="paymentGatewayType" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="addFormPaymentGatewayType">
                <option disabled value="">Payment Gateway</option>
                <option v-for="(paymentGatewayType, index) in paymentGatewayTypes" :key="index" :value="paymentGatewayType">{{paymentGatewayType}}</option>
              </select>
              <div class="row">
                <div class="mb-3">
                  <label for="cardNumber" class="form-label">Card Number</label>
                  <input type="text" class="form-control font-size-1_5" id="cardNumber" placeholder="Enter 16 Digit Card Number" v-model="addFormCardNumber">
                </div>
              </div>
            </div>
            <div v-if="selectedOption==='cardTypeIdCard'" class="mb-3">
              <label for="selectIdCard" class="form-label">Select ID Card</label>
              <select id="selectIdCard" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="addFormSelectBank">
                <option disabled value="">ID Card</option>
                <option v-for="(idCard, index) in idCardsList" :key="index" :value="idCard">{{idCard}}</option>
              </select>
              <div class="row">
                <div class="mb-3">
                  <label for="cardNumber" class="form-label">ID Card Number</label>
                  <input type="text" class="form-control font-size-1_5" id="cardNumber" placeholder="Enter ID Card Number" v-model="addFormCardNumber">
                </div>
              </div>
            </div>
          <div v-if="addFormProcessing" class="spinner-border text-primary float-end" role="status">
            <span class="sr-only"></span>
          </div>
          <button :disabled="addFormProcessing" type="button" @click="verifyFormInputsAndAddCard()" class="btn btn-primary float-end">Add Card</button>
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
import { addRegisteredCard, getCustomerDetailsService } from '@/service/service.js';
import { mapState, mapActions } from 'vuex';

export default {
  name: "AddCard",
  data(){
    return {
      selectionOptions : [],
      selectedOption : '',
      banksList : [],
      idCardsList : [],
      paymentGatewayTypes : [],
      paymentCards : false,
      idCards : false,
      addFormCardNumber : '',
      addFormSelectBank : '',
      addFormCardType : '',
      addFormPaymentGatewayType : '',
      addFormErrors: [],
      addFormProcessing: false,

      loggedInUserMobileNum : ''
    }
  },
  created(){
    this.getCustomerDetailsAction(this.loggedInUser);
    this.initialiseValues();
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
      this.selectedOption='cardTypeCredit';
      this.selectionOptions = [
        {
        id: 'cardTypeCredit',
        value: 'Credit Card'
        },
        {
        id: 'cardTypeDebit',
        value: 'Debit Card'
        },
        {
        id: 'cardTypeIdCard',
        value: 'ID Card'
        },
      ],
      this.banksList = [
        'State Bank of India',
        'ICICI Bank',
        'Axis Bank',
        'Kotak Mahindra Bank',
        'Bank of India',
      ],
      this.idCardsList = [
        'Aadhaar Card',
        'Pan Card',
        'Driving Lisence',
      ]
      this.paymentGatewayTypes = [
        'MasterCard',
        'Visa',
        'Maestro'
      ]
    },
    async verifyFormInputsAndAddCard(){
      this.addFormErrors = [];

      if(!this.addFormCardNumber){
        this.addFormErrors.push('Card Number is Mandatory');
      }
      if(!this.addFormCardType){
        this.addFormErrors.push('Select a Card Type');
      }
      if(!this.addFormSelectBank){
        if(this.addFormCardType==="cardTypeIdCard")
        {
          this.addFormErrors.push('Select ID Card from Dropdown');
        }
        else this.addFormErrors.push('Select Bank from Dropdown');
      }

      if(!this.addFormPaymentGatewayType){
        if(this.addFormCardType!=="cardTypeIdCard"){
        this.addFormErrors.push('Select Payment Gateway');
        }
      }

      if(this.addFormCardNumber){
        this.validateCardNumberRegEx(this.addFormCardNumber);
      }

      if(this.addFormErrors.length === 0){
        this.addFormErrors = [];
        await this.addCard();
      }
    },
    validateCardNumberRegEx(cardNumber){
      // For ID card, just the Card Number Should not be Empty
      if(this.addFormCardType==="cardTypeIdCard")
        return true;
      // For Cards Other than ID Card, the card number must be 16 Digits
      const paymentCardRegEx = '^[1-9][0-9]{15}$';
      if(cardNumber.match(paymentCardRegEx))
        return true;
      else 
      this.addFormErrors.push('Add 16 Digit Card Number');
      return false;
    },
    async addCard(){
      let addFormFields = {
        id : Date.now(),
        cardNumber : this.addFormCardNumber,
        bank : this.addFormSelectBank,
        cardType : this.addFormCardType,
        paymentGatewayType : this.addFormPaymentGatewayType || 'IdCard',
        mobileNum :  this.loggedInUserMobileNum,
        isBlocked : false,
      }
      this.addFormProcessing = true;
      const addCardStatusText = await addRegisteredCard(addFormFields);
      if(addCardStatusText==="Created"){
        this.resetFormFields();
                    this.$swal({
                          title: 'Added',
                          text: "Your card has successfully been added",
                          icon: 'success',
                          timer: 2000
                      });
                  this.$emit('card-added');
      }
      else{
         this.$swal({
            title: 'Server Issue',
            text: "Sorry for inconvinience, please reload page",
            icon: 'warning',
            timer: 3000
            });
      }
      this.addFormProcessing = false;
      let addPaymentCardModalCloseButton = document.querySelector("#addPaymentCard [data-bs-dismiss=modal]");
      addPaymentCardModalCloseButton.click();
      },
    getSelectedOption(){
      let selectedMenu = document.querySelector('input[name="cardType"]:checked').value;
      this.selectedOption = selectedMenu;
      this.resetFormFields();
      this.addFormCardType = this.selectedOption;
    },
    resetFormFields(){
        this.addFormCardNumber = '';
        this.addFormSelectBank = '';
        this.addFormCardType = '';
        this.addFormPaymentGatewayType = '';
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
</style>

