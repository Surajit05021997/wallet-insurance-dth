<template>
  <div class="container">
    <div class="summery-display">
      <p class="plan-type">Wallet Protection : {{ preCustomer.type }} plan</p>
      <p class="plan-price">
        <span>Plan Price </span>
        <span v-if="preCustomer.type === 'platinum'"
          ><strong>₹ 2400 /year</strong></span
        >
        <span v-if="preCustomer.type === 'gold'"
          ><strong>₹ 1800 /year</strong></span
        >
      </p>
      <p>Inclusive of all taxes</p>
      <p class="sub-heading">Additional Insurance Taken</p>
      <p v-if="!preCustomer.isTravelInsTaken && !preCustomer.isMobileInsTaken && !preCustomer.isCyberInsTaken" class="plan-price additional">
        <span>None</span>
        <span><strong>₹ 0</strong></span>
      </p>
      <p v-if="preCustomer.isTravelInsTaken" class="plan-price additional">
        <span>Travel Insurance</span>
        <span><strong>₹ 2000</strong></span>
      </p>
      <p v-if="preCustomer.isMobileInsTaken" class="plan-price additional">
        <span>Mobile insurance</span>
        <span><strong>₹ 1500</strong></span>  
      </p>
      <p v-if="preCustomer.isCyberInsTaken" class="plan-price additional">
        <span>Cyber Security Insurance</span>
        <span><strong>₹ 1800</strong></span>
      </p>
      <hr>
      <p class="plan-price additional">
        <span>Total</span>
        <span><strong>₹ {{preCustomer.priceWithoutDiscount}}</strong></span>
      </p>
      <p class="plan-price additional">
        <span>Discounted Amount</span>
        <span><strong>- ₹ {{preCustomer.priceWithoutDiscount - preCustomer.totalPrice}}</strong></span>
      </p>
      <hr />
      <div class="plan-price">
        <p><strong>Amount to be paid</strong></p>
        <span><strong>₹ {{preCustomer.totalPrice}}</strong></span>
      </div>
    </div>
    <div>
      <div class="option">
        <div class="option-title" @click="toggle(1)">
          <p>Credit or Debit Card</p>
        </div>
        <div :class="visible_1 ? 'viisible' : 'not-visible'">
          <form @submit.prevent="validate">
            <div class="field">
              <label>Card Number</label>
              <input
                type="text"
                v-model="cardNumber"
                @input="validateCardNumber"
              />
              <p class="invalid" v-if="isEmptyCardNumber">Enter card number</p>
              <p class="invalid" v-if="!isCardNumberValid">
                Enter valid card number
              </p>
            </div>
            <div class="field">
              <label>Name On Card</label>
              <input type="text" v-model="name" @input="validateName" />
              <p class="invalid" v-if="!isNameValid">Enter name</p>
            </div>
            <div class="field">
              <label>Expiry</label>
              <input
                type="text"
                placeholder="mm/yy"
                v-model="expiry"
                @input="validateExpiry"
              />
              <p class="invalid" v-if="isEmptyExpiry">Enter expiry date</p>
              <p class="invalid" v-if="!isExpiryValid">
                Enter valid expiry date
              </p>
            </div>
            <div class="field">
              <label>CVV</label>
              <input type="text" v-model="cvv" @input="validateCvv" />
              <p class="invalid" v-if="isEmptyCvv">Enter CVV</p>
              <p class="invalid" v-if="!isCvvValid">Enter valid CVV</p>
            </div>
            <button class="btn">Make Payment</button>
          </form>
        </div>
      </div>
    </div>
    <div>
      <div class="option">
        <div class="option-title" @click="toggle(2)">
          <p>UPI</p>
        </div>
        <div class="upi" :class="visible_2 ? 'viisible' : 'not-visible'">
          <img src="../assets/bhim.svg" alt="bhim logo" @click="upiPayment" />
          <img src="../assets/gpay.svg" alt="gpay logo" @click="upiPayment" />
          <img
            src="../assets/phonepe.svg"
            alt="phonepe logo"
            @click="upiPayment"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="option">
        <div class="option-title" @click="toggle(3)">
          <p>Net Banking</p>
        </div>
        <div
          class="net-banking"
          :class="visible_3 ? 'viisible' : 'not-visible'"
        >
          <p>Select Bank for Payment</p>
          <form @submit.prevent="validatePayment">
            <select v-model="bankSelected">
              <option disabled></option>
              <option>AXIS Bank NetBanking</option>
              <option>Bank of India</option>
              <option>Central Bank Of India</option>
              <option>HDFC Bank</option>
            </select>
            <p class="invalid" v-if="!isbankSelectedValid">Select bank</p>
            <button type="submit" class="btn">Make Payment</button>
          </form>
        </div>
      </div>
    </div>
    <div class="overlay" :class="{ 'modal-visible': isModalVisible }">
      <div class="popup">
        <h2>Your payment was successful.</h2>
        <a class="close" href="#" @click="closeModal">&times;</a>
        <div class="content">
          <p>Please check your mail for login credentials.</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="payment-successful"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
import { addCustomerService, addPolicy } from "@/service/service.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      cardNumber: "",
      name: "",
      expiry: "",
      cvv: "",
      bankSelected: "",
      toEmail: "",
      username: '',
      password: '',
      visible_1: false,
      visible_2: false,
      visible_3: false,
      isCardNumberValid: true,
      isEmptyCardNumber: false,
      isNameValid: true,
      isExpiryValid: true,
      isEmptyExpiry: false,
      isCvvValid: true,
      isEmptyCvv: false,
      isbankSelectedValid: true,
      isModalVisible: false,
      startDate: '',
      endDate: '',
    };
  },
  created() {
    this.setPreCustomerAction();
    this.getDate();
  },
  computed: {
    ...mapState(['preCustomer']),
  },
  methods: {
    ...mapActions(['addCustomerAction', 'setPreCustomerAction']),
    toggle(option) {
      if (option === 1) {
        this.visible_1 = !this.visible_1;
        this.visible_2 = false;
        this.visible_3 = false;
      } else if (option === 2) {
        this.visible_2 = !this.visible_2;
        this.visible_1 = false;
        this.visible_3 = false;
      } else {
        this.visible_3 = !this.visible_3;
        this.visible_1 = false;
        this.visible_2 = false;
      }
    },
    validate() {
      this.validateCardNumber();
      this.validateName();
      this.validateExpiry();
      this.validateCvv();
      if (
        this.isCardNumberValid &&
        this.isNameValid &&
        this.isExpiryValid &&
        this.isCvvValid
      ) {
        this.isModalVisible = true;
        this.username = this.generateUsername();
        this.password = this.generatePassword();
        const emailData = {
          userName: this.$route.params.name,
          toEmail: this.$route.params.email,
          plan: this.$route.params.type,
          username: this.username,
          password: this.password,
        }
        addCustomerService({
          name: this.$route.params.name,
          mobileNum: this.$route.params.number,
          emailId: this.$route.params.email,
          type: this.$route.params.type,
          username: this.username,
          password: this.password,
        });
        this.sendEmail(emailData);
        addPolicy({
          startDate: this.startDate,
          endDate: this.endDate,
          insuranceAmount: "150000",
          mobileNum: this.preCustomer.number,
        });
      }
    },
    validatePayment() {
      this.validateBank();
      if (this.isbankSelectedValid === true) {
        this.isModalVisible = true;
        this.username = this.generateUsername();
        this.password = this.generatePassword();
        const emailData = {
          userName: this.$route.params.name,
          toEmail: this.$route.params.email,
          plan: this.$route.params.type,
          username: this.username,
          password: this.password,
        }
        addCustomerService({
          name: this.$route.params.name,
          mobileNum: this.$route.params.number,
          emailId: this.$route.params.email,
          type: this.$route.params.type,
          username: this.username,
          password: this.password,
        });
        this.sendEmail(emailData);
        addPolicy({
          startDate: this.startDate,
          endDate: this.endDate,
          insuranceAmount: "150000",
          mobileNum: this.preCustomer.number,
        });
      }
    },
    validateCardNumber() {
      if (this.cardNumber) {
        this.isEmptyCardNumber = false;
        const regex = /^[0-9]{16}$/;
        if (regex.test(this.cardNumber)) {
          this.isCardNumberValid = true;
        } else {
          this.isCardNumberValid = false;
        }
      } else {
        this.isEmptyCardNumber = true;
        this.isCardNumberValid = true;
      }
    },
    validateName() {
      if (this.name) {
        this.isNameValid = true;
      } else {
        this.isNameValid = false;
      }
    },
    validateExpiry() {
      if (this.expiry) {
        this.isEmptyExpiry = false;
        const regex_1 = /^0[1-9]\/[0-9]{2}$/;
        const regex_2 = /^1[0-2]\/[0-9]{2}$/;
        if (regex_1.test(this.expiry) || regex_2.test(this.expiry)) {
          this.isExpiryValid = true;
        } else {
          this.isExpiryValid = false;
        }
      } else {
        this.isEmptyExpiry = true;
        this.isExpiryValid = true;
      }
    },
    validateCvv() {
      if (this.cvv) {
        this.isEmptyCvv = false;
        const regex = /^[0-9]{3}$/;
        if (regex.test(this.cvv)) {
          this.isCvvValid = true;
        } else {
          this.isCvvValid = false;
        }
      } else {
        this.isEmptyCvv = true;
        this.isCvvValid = true;
      }
    },
    validateBank() {
      if (this.bankSelected) {
        this.isbankSelectedValid = true;
      } else {
        this.isbankSelectedValid = false;
      }
    },
    upiPayment() {
      this.isModalVisible = true;
      this.username = this.generateUsername();
      this.password = this.generatePassword();
      const emailData = {
        userName: this.$route.params.name,
        toEmail: this.$route.params.email,
        plan: this.$route.params.type,
        username: this.username,
        password: this.password,
      }
      addCustomerService({
        name: this.$route.params.name,
        mobileNum: this.$route.params.number,
        emailId: this.$route.params.email,
        type: this.$route.params.type,
        username: this.username,
        password: this.password,
      });
      this.sendEmail(emailData);
      addPolicy({
        startDate: this.startDate,
        endDate: this.endDate,
        insuranceAmount: "150000",
        mobileNum: this.preCustomer.number,
      });
    },
    closeModal() {
      this.isModalVisible = false;
      this.$router.push("/login");
    },
    generatePassword() {
      const chars =
        "0123456789!@#$%^&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const passwordLength = 8;
      let password = "";
      for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      return password;
    },
    generateUsername() {
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const usernameLength = 8;
      let username = "";
      for (let i = 0; i < usernameLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        username += chars.substring(randomNumber, randomNumber + 1);
      }
      return username;
    },
    sendEmail(mailData) {
      emailjs.send('service_5cvw2qt','template_062645a',mailData , 'user_fqh1IkfZvXU3VhM5ZYuXJ').then(
        function () {
          console.log("SUCCESS!");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    },
    getDate() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const endYear = today.getFullYear() + 1;
      this.startDate = mm + '/' + dd + '/' + yyyy;
      this.endDate = mm + '/' + dd + '/' + endYear;
    }
  },
  watch: {
    bankSelected() {
      this.validateBank();
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 120rem;
  margin: 5rem auto;
  padding: 0 2rem;
}
.option {
  border: 1px solid #aaa;
  border-radius: 10px;
  font-size: 2rem;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
}
.option-title:hover {
  cursor: pointer;
}
.not-visible {
  display: none;
}
.btn {
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 2rem;
  background-color: #007fff;
  border-radius: 20rem;
  transition: all 0.3s;
}

.btn:hover {
  cursor: pointer;
  background-color: #0062c4;
  color: #fff;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.field label {
  font-size: 1.5rem;
}
.field input {
  font-size: 1.6rem;
  border: none;
  border-left: 4px solid #007fff;
  border-radius: 2px;
  background-color: #eee;
  padding-left: 5px;
}
.upi img {
  width: 10rem;
  height: 5rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  transition: all 0.3s;
}
.upi img:hover {
  cursor: pointer;
  background-color: #ddd;
}
.net-banking {
  font-size: 1.5rem;
}
.net-banking .btn {
  display: block;
  margin: 3rem 0 1rem 0;
}
.invalid {
  color: red;
  font-size: 1.5rem;
  margin: 0;
}

.summery-display {
  box-shadow: 0 0 10px 0 #ddd;
  padding: 2rem;
  border-radius: 5px;
  margin-bottom: 2rem;
}
.summery-display .plan-type {
  text-transform: capitalize;
  font-size: 2.5rem;
  font-weight: 700;
}
.summery-display .plan-price {
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}

/* popup */
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.3ms;
  visibility: hidden;
  opacity: 0;
  z-index: 10;
}
.modal-visible {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 12px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #007fff;
}
.popup .content {
  max-height: 30%;
  margin: 2rem 0;
  overflow: auto;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.popup .content p {
  margin-bottom: 0;
  font-size: 1.5rem;
}
.payment-successful {
  width: 5rem;
  stroke: #007fff;
}
.additional span {
  font-size: 1.5rem;
}
.sub-heading {
  font-size: 2rem;
  font-weight: 700;
}
</style>