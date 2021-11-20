<template>
  <div class="buy-plans">
    <div class="container">
      <p class="des">Enter your details</p>
      <div class="box">
        <form @submit.prevent="validate">
          <div class="field-box">
            <div class="field">
              <label>Name</label>
              <input type="text" v-model="name" @input="validateName" />
              <p class="invalid" v-if="!isValidName">Enter your name</p>
            </div>
            <div class="field">
              <label>Mobile Number</label>
              <input type="text" v-model="number" @input="validateNumber" />
              <p class="invalid" v-if="isEmptyNumber">
                Enter your mobile number
              </p>
              <p class="invalid" v-if="!isValidNumber">
                Enter correct mobile number
              </p>
            </div>
            <div class="field">
              <label>Email</label>
              <input type="email" v-model="email" @input="validateEmail" />
              <p class="invalid" v-if="!isValidEmail">Enter your email</p>
            </div>
            <div class="terms-conditions">
              <input type="checkbox" v-model="termsChecked" />
              <div class="field">
                <label
                  >I agree to the
                  <a
                    href="@\assets\SamplePDF.pdf"
                    download="Terms and Conditions"
                    >Terms & Conditions</a
                  ></label
                >
                <p :class="{ invalid: !validTerms, hidden: validTerms }">
                  Please check the terms and conditions.
                </p>
              </div>
            </div>
          </div>
          <div class="lock">
            <svg xmlns="http://www.w3.org/2000/svg" class="lock-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p>Your data is encrypted. 100% safe and secure.</p>
          </div>
          <button class="btn"><strong>Continue to payment</strong></button>
        </form>
        <div>
          <div class="summery-display">
            <p class="plan-type">
              Wallet Protection : {{ $route.params.type }} plan
            </p>
            <p class="plan-price">
              <span>Plan Price </span>
              <span v-if="$route.params.type === 'platinum'"
                ><strong>₹ 2400 /year</strong></span
              >
              <span v-if="$route.params.type === 'gold'"
                ><strong>₹ 1800 /year</strong></span
              >
            </p>
            <p>Inclusive of all taxes</p>
            <p class="sub-heading"><strong>Addition Insurance taken</strong></p>
            <p
              v-if="
                !this.isTravelInsTaken &&
                !this.isMobileInsTaken &&
                !this.isCyberInsTaken
              "
              class="plan-price additional"
            >
              <span>None</span>
              <span><strong>₹ 0</strong></span>
            </p>
            <p v-if="this.isTravelInsTaken" class="plan-price additional">
              <span>Travel Insurance</span>
              <span><strong>₹ 2000</strong></span>
            </p>
            <p v-if="this.isMobileInsTaken" class="plan-price additional">
              <span>Mobile insurance</span>
              <span><strong>₹ 1500</strong></span>
            </p>
            <p v-if="this.isCyberInsTaken" class="plan-price additional">
              <span>Cyber Security Insurance</span>
              <span><strong>₹ 1800</strong></span>
            </p>
            <hr />
            <p class="plan-price additional">
              <span>Total</span>
              <span
                ><strong>₹ {{ this.priceWithoutDiscount }}</strong></span
              >
            </p>
            <p class="plan-price additional">
              <span>Discounted Amount</span>
              <span
                ><strong
                  >- ₹
                  {{ this.priceWithoutDiscount - this.totalPrice() }}</strong
                ></span
              >
            </p>
            <a href="#">Apply discount coupon</a>
            <hr />
            <div class="plan-price">
              <p><strong>Amount to be paid</strong></p>
              <span
                ><strong>₹ {{ totalPrice() }}</strong></span
              >
            </div>
          </div>
          <div class="addons">
            <p class="heading">Addition insurance</p>
            <p class="discount-text">
              Get additional 10% discount on total with each additional insurance.
            </p>
            <form>
              <div class="addon-options">
                <div>
                  <input type="checkbox" v-model="isTravelInsTaken" />
                  <label>Travel Insurance</label>
                </div>
                <p><strong>₹ 2000 only/year</strong></p>
              </div>
              <div class="addon-options">
                <div>
                  <input type="checkbox" v-model="isMobileInsTaken" />
                  <label>Mobile insurance</label>
                </div>
                <p><strong>₹ 1500 only/year</strong></p>
              </div>
              <div class="addon-options">
                <div>
                  <input type="checkbox" v-model="isCyberInsTaken" />
                  <label>Cyber security insurance</label>
                </div>
                <p><strong>₹ 1800 only/year</strong></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { addPreCustomer } from "@/service/service.js";
export default {
  name: "BuyPlans",
  data() {
    return {
      name: "",
      number: "",
      email: "",
      termsChecked: false,
      validTerms: true,
      isValidName: true,
      isEmptyNumber: false,
      isValidNumber: true,
      isValidEmail: true,
      isTravelInsTaken: false,
      isMobileInsTaken: false,
      isCyberInsTaken: false,
      travelInsPrice: 2000,
      mobileInsPrice: 1500,
      cyberInsPrice: 1800,
      planPrice: 0,
      priceWithoutDiscount: 0,
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    ...mapActions(["setPreCustomerAction"]),
    async validate() {
      this.validateName();
      this.validateNumber();
      this.validateEmail();
      this.validateTerms();
      if (
        this.isValidName &&
        this.isValidNumber &&
        this.isValidEmail &&
        this.termsChecked
      ) {
        await addPreCustomer({
          name: this.name,
          number: this.number,
          email: this.email,
          type: this.$route.params.type,
          isTravelInsTaken: this.isTravelInsTaken,
          isMobileInsTaken: this.isMobileInsTaken,
          isCyberInsTaken: this.isCyberInsTaken,
          totalPrice: this.totalPrice(),
          priceWithoutDiscount: this.priceWithoutDiscount,
        });
        this.setPreCustomerAction();
        this.$router.push({
          name: "PaymentOption",
          params: {
            name: this.name,
            number: this.number,
            email: this.email,
            type: this.$route.params.type,
          },
        });
      }
    },
    validateName() {
      if (this.name.length) {
        this.isValidName = true;
      } else {
        this.isValidName = false;
      }
    },
    validateNumber() {
      if (this.number.length) {
        this.isEmptyNumber = false;
        const regex = /^[0-9]{10}$/;
        if (regex.test(this.number)) {
          this.isValidNumber = true;
        } else {
          this.isValidNumber = false;
        }
      } else {
        this.isEmptyNumber = true;
        this.isValidNumber = true;
      }
    },
    validateEmail() {
      if (this.email.length) {
        this.isValidEmail = true;
      } else {
        this.isValidEmail = false;
      }
    },
    validateTerms() {
      if (this.termsChecked) {
        this.validTerms = true;
      } else {
        this.validTerms = false;
      }
    },
    totalPrice() {
      if (
        this.isTravelInsTaken === false &&
        this.isMobileInsTaken === false &&
        this.isCyberInsTaken === false
      ) {
        this.priceWithoutDiscount = this.getPlanPrice();
        return this.getPlanPrice();
      } else if (
        this.isTravelInsTaken === true &&
        this.isMobileInsTaken === false &&
        this.isCyberInsTaken === false
      ) {
        const combinedPrice = this.getPlanPrice() + this.travelInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (10 * combinedPrice) / 100;
      } else if (
        this.isTravelInsTaken === false &&
        this.isMobileInsTaken === true &&
        this.isCyberInsTaken === false
      ) {
        const combinedPrice = this.getPlanPrice() + this.mobileInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (10 * combinedPrice) / 100;
      } else if (
        this.isTravelInsTaken === false &&
        this.isMobileInsTaken === false &&
        this.isCyberInsTaken === true
      ) {
        const combinedPrice = this.getPlanPrice() + this.cyberInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (10 * combinedPrice) / 100;
      } else if (
        this.isTravelInsTaken === true &&
        this.isMobileInsTaken === true &&
        this.isCyberInsTaken === false
      ) {
        const combinedPrice =
          this.getPlanPrice() + this.travelInsPrice + this.mobileInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (20 * combinedPrice) / 100;
      } else if (
        this.isTravelInsTaken === false &&
        this.isMobileInsTaken === true &&
        this.isCyberInsTaken === true
      ) {
        const combinedPrice =
          this.getPlanPrice() + this.mobileInsPrice + this.cyberInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (20 * combinedPrice) / 100;
      } else if (
        this.isTravelInsTaken === true &&
        this.isMobileInsTaken === false &&
        this.isCyberInsTaken === true
      ) {
        const combinedPrice =
          this.getPlanPrice() + this.cyberInsPrice + this.travelInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (20 * combinedPrice) / 100;
      } else {
        const combinedPrice =
          this.getPlanPrice() +
          this.cyberInsPrice +
          this.travelInsPrice +
          this.mobileInsPrice;
        this.priceWithoutDiscount = combinedPrice;
        return combinedPrice - (30 * combinedPrice) / 100;
      }
    },
    getPlanPrice() {
      if (this.$route.params.type === "platinum") {
        this.planPrice = 2400;
        return this.planPrice;
      } else if (this.$route.params.type === "gold") {
        this.planPrice = 1800;
        return this.planPrice;
      }
    },
  },
  watch: {
    termsChecked() {
      this.validateTerms();
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
.buy-plans {
  padding: 2rem;
  padding-top: 1rem;
}
.container {
  max-width: 120rem;
  margin: 0 auto;
}
.des {
  font-size: 2.5rem;
  margin-bottom: 0;
}
.box {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 3rem;
  align-items: start;
}
.field-box label {
  font-size: 2rem;
  padding-top: 0.5rem;
}
.field-box {
  padding: 2rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 5px;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: 100%;
  row-gap: 2rem;
}
.field {
  display: flex;
  flex-direction: column;
}
input {
  font-size: 1.6rem;
  border: none;
  border-left: 4px solid #007fff;
  border-radius: 2px;
  background-color: #eee;
  padding-left: 5px;
}
.btn {
  display: block;
  background-color: #007fff;
  padding: 1rem 2rem;
  margin: 2rem auto;
  text-decoration: none;
  border-style: none;
  border-radius: 20rem;
  font-size: 2rem;
  color: #fff;
  transition: all 0.3s;
}
.btn:hover {
  cursor: pointer;
  background-color: #0062c4;
  color: #fff;
}
.summery-display {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  padding: 2rem;
  border-radius: 5px;
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
.summery-display a {
  font-size: 1.5rem;
  text-decoration: none;
}
.invalid {
  color: red;
  font-size: 1.5rem;
}
.terms-conditions {
  display: flex;
  align-items: center;
}
.terms-conditions label {
  font-size: 1.5rem;
  padding-top: 0;
  padding-left: 1.5rem;
}
.terms-conditions a {
  text-decoration: none;
}
.terms-conditions p {
  margin-bottom: 0;
  margin-left: 1.5rem;
}
.hidden {
  display: none;
}
.addons {
  margin: 2rem 0;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  padding: 2rem;
  border-radius: 5px;
}
.addons .heading {
  font-size: 2.5rem;
  font-weight: 700;
}
.discount-text {
  margin: 0;
}
.addons form input {
  margin: 1rem 0;
}
.addons form label {
  font-size: 1.5rem;
  padding-left: 1rem;
}
.addons form p {
  font-size: 1.5rem;
}
.addon-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.additional span {
  font-size: 1.5rem;
}
.sub-heading {
  font-size: 2rem;
}
.lock {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.lock-icon {
  width: 3rem;
  height: 3rem;
  stroke: limegreen
}
@media screen and (max-width: 992px) {
  .box {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
  .summery-display {
    order: 1;
  }
  .box form {
    order: 2;
  }
}
</style>