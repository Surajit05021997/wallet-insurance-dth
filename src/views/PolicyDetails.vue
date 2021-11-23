<template>
  <div>
    <div class="mb-5 mt-5">
      <h1>Policy Details</h1>
    </div>
    <hr />
    <div v-if="policyDetails">
      <div v-if="this.selectedLogin === 'Employee'">
        <table class="table table-hover font-size-1_6rem">
          <thead>
            <tr>
              <th
                v-for="(policyDetailsField, index) in policyDetailsFields"
                :key="index"
              >
                {{ policyDetailsField }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(policyDetail, index) in policyDetails" :key="index">
              <td>{{ policyDetail.id }}</td>
              <td>{{ policyDetail.startDate }}</td>
              <td>{{ policyDetail.endDate }}</td>
              <td>{{ policyDetail.insuranceAmount }}</td>
              <td>
                <button
                  class="btn btn-danger"
                  v-show="showRenewPolicyButton(policyDetail.endDate)"
                  :disabled="!showRenewPolicyButton(policyDetail.endDate)"
                >
                  Renew Policy
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.selectedLogin === 'Customer'">
        <div v-if="latestPolicy" class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="card">
                <h3 class="card-header">Policy Id : {{ latestPolicy.id }}</h3>
                <!-- Start Date //Start -->
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <h2>Start Date</h2>
                    </div>
                    <div class="col-lg-6">
                      <h2>{{ latestPolicy.startDate }}</h2>
                    </div>
                  </div>
                </div>
                <!-- Start Date //End -->
                <!-- End Date //Start -->
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <h2>End Date</h2>
                    </div>
                    <div class="col-lg-6">
                      <h2>{{ latestPolicy.endDate }}</h2>
                    </div>
                  </div>
                </div>
                <!-- End Date //End -->
                <!-- Insurance Amount //Start -->
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <h2>Insuarnce Amount</h2>
                    </div>
                    <div class="col-lg-6">
                      <h2>{{ latestPolicy.insuranceAmount }}</h2>
                    </div>
                  </div>
                </div>
                <!-- Insurance Amount //End -->
                <!-- Remaining Days //Start -->
                <div
                  v-if="!showRenewPolicyButton(latestPolicy.endDate)"
                  class="card-body"
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <h2>Remaining days</h2>
                    </div>
                    <div class="col-lg-6">
                      <h2>{{ getRemainingDays(latestPolicy.endDate) }}</h2>
                    </div>
                  </div>
                </div>
                <!-- Remaining Days //End -->
                <!-- policy Already Ended Days //Start -->
                <div
                  v-if="showRenewPolicyButton(latestPolicy.endDate)"
                  class="card-body"
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <h2>Ended already</h2>
                    </div>
                    <div class="col-lg-6">
                      <h2>
                        {{ -getRemainingDays(latestPolicy.endDate) }} days back
                      </h2>
                    </div>
                  </div>
                </div>
                <!-- Policy Already Ended //End -->
                <!-- Renew Policy Button //Start-->
                <div class="card-body centered-content">
                  <button
                    class="btn btn-danger font-size-1_6rem width-200px"
                    :disabled="!showRenewPolicyButton(latestPolicy.endDate)"
                  >
                    Renew Policy
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="!showRenewPolicyButton(latestPolicy.endDate)"
              class="col-lg-6"
            >
              <div class="centered-content">
                <h2 class="text-success"><b>You are Protected</b></h2>
              </div>
              <div class="centered-content">
                <img
                  width="250px"
                  height="auto"
                  src="../assets/protection-shield.jpg"
                  alt="Wallet Protected Image"
                />
              </div>
            </div>
            <div
              v-if="showRenewPolicyButton(latestPolicy.endDate)"
              class="col-lg-6"
            >
              <div class="centered-content">
                <h2 class="text-danger"><b>You are not insured</b></h2>
              </div>
              <div class="centered-content">
                <img
                  width="250px"
                  height="auto"
                  src="../assets/vulnerability.png"
                  alt="Wallet unprotected Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!policyDetails" class="container">
      <h2 class="text-muted">Unable to load policy details.</h2>
      <br />
      <h4>Server Issue</h4>
      <h4>
        We are sorry for the inconvinience, please try again after some time
      </h4>
    </div>
  </div>
</template>

<script>
import {
  getSearchValue,
  getPolicyDetailsWithMobNum,
  getPolicyDetailsWithID,
  getLoginType,
  getCustomerDetailsService,
} from "@/service/service.js";
import { mapState, mapActions } from "vuex";
import { isValidSession } from "@/common.js";

export default {
  name: "PolicyDetails",
  data() {
    return {
      policyDetailsFields: [],
      policyDetails: null,
      latestPolicy: null,
      searchVal: "",
      selectedLogin: "",
    };
  },
  computed: {
    ...mapState(["loggedInUser"]),
  },
  methods: {
    ...mapActions(["getCustomerDetailsAction"]),
    async initialiseValues() {
      const response = await getLoginType();
      this.selectedLogin = response.loginType;
      if (this.selectedLogin === "Customer") {
        let customerDetails = await getCustomerDetailsService(
          this.loggedInUser
        );
        this.policyDetails = await getPolicyDetailsWithMobNum(
          customerDetails[0].mobileNum
        );
        this.latestPolicy = this.policyDetails[0];
      } else this.showPolicyDataEmployeePortal();

      this.policyDetailsFields = [
        "Policy ID",
        "Start Date",
        "End Date",
        "Insurance Amount",
      ];
    },
    async showPolicyDataEmployeePortal() {
      const response = await getSearchValue();
      this.searchVal = response[0].searchVal;
      if (this.searchVal.charAt(0) !== "P") {
        this.policyDetails = await getPolicyDetailsWithMobNum(this.searchVal);
      } else {
        this.policyDetails = await getPolicyDetailsWithID(this.searchVal);
      }
    },

    showRenewPolicyButton(checkEndDate) {
      return this.getRemainingDays(checkEndDate) < 0;
    },

    getPolicyId() {
      Math.random();
      Math.floor(Math.random());
      return Math.floor(Math.random() * 10) + 1;
    },
    getStarDate() {
      let timestamp = 1607110465663;
      let date = new Date(timestamp);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
    getEndDate() {
      let timestamp = 1607110465663;
      let date = new Date(timestamp);
      this.endDate =
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() + 1);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() + 1) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
    getInsuranceAmount() {
      let insuranceAmt = 100000;
      let claimAmount = 10000;
      return insuranceAmt - claimAmount;
    },
    getRemainingDays(date) {
      let todaysDate = new Date();
      let endDate = new Date(date);
      let remainingDays = Math.round(
        (endDate - todaysDate) / (1000 * 60 * 60 * 24)
      );
      return remainingDays;
    },
    getTitleStringForCard(remainingDays) {
      if (remainingDays === 0) {
        return "Ending today, Renew Now";
      } else if (remainingDays < 0) {
        return `Policy ended ${-remainingDays} days back, Renew Now`;
      } else return `${remainingDays} days remaining`;
    },
    getShortDate(date) {
      let dateOptions = { year: "numeric", month: "long", day: "numeric" };
      let shortDate = new Date(date).toLocaleDateString("en-US", dateOptions);
      return shortDate;
    },
  },
  created() {
    if (!isValidSession()) {
      this.$router.push({
        name: "Login",
      });
    }
    this.getCustomerDetailsAction(this.loggedInUser);
    this.initialiseValues();
  },
};
</script>

<style scoped>
.centered-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.font-size-1_6rem {
  font-size: 1.6rem;
}
.mt-6 {
  margin-top: 6rem;
}
.width-200px {
  width: 200px;
}
</style>