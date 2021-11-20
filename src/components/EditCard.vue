<template>
<div>
  <div class="modal fade" id="editPaymentCard" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editCardLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered max-width-35rem">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title card-title" id="editCardLabel">Edit a Card</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div v-for="(option, index) in selectionOptions" :key="index" class="mb-3 col-lg-4">
                <input class="form-check-input" type="radio" name="editCardType" :id="option.id" :value="option.id" @change="getSelectedOption()" v-model="editFormCardType">
                <label class="form-check-label" :for="option.id">
                &nbsp;{{option.value}}
              </label>
              </div>
            </div>
            <div v-if="editFormCardType!=='cardTypeIdCard'" class="mb-3">
              <label for="selectBank" class="form-label">Select Bank</label>
              <select id="selectBank" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="editFormSelectBank">
                <option disabled value="">Select Bank</option>
                <option v-for="(bank, index) in banksList" :key="index" :value="bank">{{bank}}</option>
              </select>
              <label for="paymentGatewayType" class="form-label">Select Payment Gateway</label>
              <select id="paymentGatewayType" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="editFormPaymentGatewayType">
                <option disabled value="">Payment Gateway</option>
                <option v-for="(paymentGatewayType, index) in paymentGatewayTypes" :key="index" :value="paymentGatewayType">{{paymentGatewayType}}</option>
              </select>
              <div class="row">
                <div class="mb-3">
                  <label for="cardNumber" class="form-label">Card Number</label>
                  <input type="text" class="form-control font-size-1_5" id="cardNumber" placeholder="Enter 16 Digit Card Number" v-model="editFormCardNumber">
                </div>
              </div>
            </div>
            <div v-if="editFormCardType==='cardTypeIdCard'" class="mb-3">
              <label for="selectIdCard" class="form-label">Select ID Card</label>
              <select id="selectIdCard" class="form-select form-select-lg mb-3" aria-label=".form-select-lg" v-model="editFormSelectBank">
                <option disabled value="">ID Card</option>
                <option v-for="(idCard, index) in idCardsList" :key="index" :value="idCard">{{idCard}}</option>
              </select>
              <div class="row">
                <div class="mb-3">
                  <label for="cardNumber" class="form-label">ID Card Number</label>
                  <input type="text" class="form-control font-size-1_5" id="cardNumber" placeholder="Enter ID Card Number" v-model="editFormCardNumber">
                </div>
              </div>
            </div>
            <div v-if="editFormProcessing" class="spinner-border text-primary float-end" role="status">
            <span class="sr-only"></span>
          </div>
          <button :disabled="editFormProcessing" type="button" @click="verifyFormInputsAndEditCard()" class="btn btn-primary float-end">Edit Card</button>
            <p v-if="editFormErrors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li class="text-danger" v-for="(error,index) in editFormErrors" :key="index">{{ error }}</li>
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
import { updateRegisteredCard, getCustomerDetailsService } from '@/service/service.js'
import { mapState, mapActions } from 'vuex';
export default {
  name: "EditCard",
  props: [
    'card-id',
    'card-type',
    'card-number',
    'bank',
    'payment-gateway-type',
  ],
  data(){
    return {
      selectionOptions : [],
      selectedOption : '',
      banksList : [],
      idCardsList : [],
      paymentCards : false,
      idCards : false,
      paymentGatewayTypes : [],
      editFormCardNumber : '',
      editFormSelectBank : '',
      editFormCardType : '',
      editFormPaymentGatewayType : '',
      editFormProcessing: false,
      editFormErrors: [],

      loggedInUserMobileNum : ''
    }
  },
  computed: {
    ...mapState(['loggedInUser']),
  },
  created(){
    this.getCustomerDetailsAction(this.loggedInUser);
    this.initialiseValues();
  },
  methods: {
    ...mapActions(['getCustomerDetailsAction']),
    async initialiseValues(){
      let customerDetails = await getCustomerDetailsService(this.loggedInUser);
      // Add the Customer mobile number to fetch the cards registered with the logged in user
      this.loggedInUserMobileNum = customerDetails[0].mobileNum;
// Setting form Values coming from Props (And Keeping under Watch)
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
      ],
      this.paymentGatewayTypes = [
        'MasterCard',
        'Visa',
        'Maestro'
      ]
    },
    async verifyFormInputsAndEditCard(){
      this.editFormErrors = [];

      if(!this.editFormCardNumber){
        this.editFormErrors.push('Card Number is Mandatory');
      }
      if(!this.editFormCardType){
        this.editFormErrors.push('Select a Card Type');
      }
      if(!this.editFormSelectBank){
        if(this.editFormCardType==="cardTypeIdCard")
        {
          this.editFormErrors.push('Select ID Card from Dropdown');
        }
        else this.editFormErrors.push('Select Bank from Dropdown');
      }

      if(!this.editFormPaymentGatewayType){
        if(this.editFormCardType!=="cardTypeIdCard"){
        this.editFormErrors.push('Select Payment Gateway');
        }
      }

      if(this.editFormCardNumber){
        this.validateCardNumberRegEx(this.editFormCardNumber);
      }

      if(this.editFormErrors.length === 0){
        this.editFormErrors = [];
        await this.editCard();
      }
    },
    validateCardNumberRegEx(cardNumber){
      // For ID card, just the Card Number Should not be Empty
      if(this.editFormCardType==="cardTypeIdCard")
        return true;
      // For Cards Other than ID Card, the card number must be 16 Digits
      const paymentCardRegEx = '^[1-9][0-9]{15}$';
      if(cardNumber.match(paymentCardRegEx))
        return true;
      else 
      this.editFormErrors.push('Add 16 Digit Card Number');
      return false;
    },
    async editCard(){
      let editFormFields = {
        id : this.cardId,
        cardNumber : this.editFormCardNumber,
        bank : this.editFormSelectBank,
        cardType : this.editFormCardType,
        paymentGatewayType : this.editFormPaymentGatewayType || 'IdCard',
        isBlocked : false,
        mobileNum : this.loggedInUserMobileNum
      }

      this.editFormProcessing = true;
      const editedCardStatusText = await updateRegisteredCard(this.cardId, editFormFields);
      if(editedCardStatusText==="OK"){
        this.resetFormFields();
                this.$swal({
                  title: 'Edited',
                  text: "Your card has successfully been Edited",
                  icon: 'success',
                  timer: 2000
              });
            this.$emit('card-edited');
        }
        else{
            this.$swal({
              title: 'Server Issue',
              text: "Could not Edit Card information. Sorry for inconvinience, please reload page",
              icon: 'warning',
              timer: 3000
            });
        }
        this.editFormProcessing = false;
        let editPaymentCardModalCloseButton = document.querySelector("#editPaymentCard [data-bs-dismiss=modal]")
        editPaymentCardModalCloseButton.click();
      },
    getSelectedOption(){
      let cardNumber  = this.editFormCardNumber ;
      let selectedMenu = document.querySelector('input[name="editCardType"]:checked').value;
      this.selectedOption = selectedMenu;
      this.resetFormFields();
      this.editFormCardNumber = cardNumber;
      this.editFormCardType = this.selectedOption;
    },
    resetFormFields(){
        this.editFormCardNumber = '';
        this.editFormSelectBank = '';
        this.editFormCardType = '';
        this.editFormPaymentGatewayType = '';
        this.editFormErrors = [];
    },
  },
  // watch all the Props
  watch: {
    cardNumber(){
      this.editFormCardNumber = this.cardNumber;
    },
    bank(){
      this.editFormSelectBank = this.bank;
    },
    cardType(){
      this.editFormCardType = this.cardType;
    },
    paymentGatewayType(){
      this.editFormPaymentGatewayType = this.paymentGatewayType;
    },
  }
}
</script>

<style scoped>
  .max-width-35rem{
    width: 35rem;
  }

  #editPaymentCard{
    font-size: 1.3rem;
  }

  #editCardLabel, .font-size-1_5{
    font-size: 1.5rem;
  }

  button.btn{
    font-size: 1.3rem;
  }
</style>

