<template>
  <div>
    <div class="sidebarContent">
      <main>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>
      <!-- <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas> -->
      <div class="row">
        <div class="col-sm-8" v-if= "this.selectedLogin === 'Employee'">
          <div class="search-holder">
            <input
              type="search"
              class="search-box"
              placeholder="Search with MobileNo or PolicyID"
              v-model="searchValue"
              @keyup.enter="getCustomerPolicyDetails" />
          </div>
        </div>
        <div class="col-sm-8" v-if="this.selectedLogin === 'Customer'">
          <div class="row">
            <div class="col-sm-4">
              <div class="content-card">
                <p>Safely block your cards from here.</p>
                <button type="button" class="btn btn-warning btn-outline-secondary">Block your cards</button>
              </div>
            </div>
            <div class="col-sm">
              <div class="content-card">
                <h2>Balance</h2>
                <h1>$7,893.66</h1>
                <p>Your account number 0019-0076-2727-4420</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <div class="content-card">
                <p>Compare other products with our's</p>
              </div>
            </div>
            <div class="col-sm">
              <div class="content-card">
                <img src="../assets/analytics.jpg" width="100" height="100" alt="Profile picture" class="profile-img">
                <p>Analytics Related to your profile</p>
              </div>
            </div>
            <div class="col-sm">
              <div class="content-card">
                <!-- <img src="../assets/user-1.jpg" alt="Profile picture" class="profile-img"> -->
                <div class="html">
                  <h2>Stats</h2>
                  <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <!-- <title>Layer 1</title> -->
                      <circle class="circle_animation" r="69.85699" cy="81" cx="81" stroke-width="15" stroke="#ffffff" fill="none"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
            <div class="col-sm">
              <div class="profile-card">
                <h3>My Profile</h3>
                <div>
                  <img src="../assets/profile1.jpg" alt="Profile picture" class="profile-img">
                </div>
                <h2 v-if="this.selectedLogin === 'Customer'">Team Amalgam</h2>
                <h5 v-if="this.selectedLogin === 'Customer'">teamamalgam@capgemini.com</h5>
                <h2 v-if="this.selectedLogin === 'Employee'">Team Amalgam Bank</h2>
                <h5 v-if="this.selectedLogin === 'Employee'">teamamalgambank@bank.com</h5>
                <div class="col">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View Full Profile</button>
                </div>
                <hr style="width:75%;">
                <div>
                  <h2>Previous history</h2>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div v-if="blockCards" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getPolicyDetailsWithID, getPolicyDetailsWithMobNum, postSearchValue, getLoginType, deleteSearchValue } from '@/service/service.js';
import {isValidSession} from '@/common.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      username: '',
      password: '',
      isInvalid: false,
      selectedLogin : '',
      searchValue: ''
    }
  },
  computed: {
    ...mapState(['customerDetails', 'loggedInUser','blockCards']),
  },
  created() {
    if(!isValidSession()){
      this.$router.push({
        name: 'Login'
      })
    }
    this.initialize();
    this.getCustomerDetailsAction(this.loggedInUser);
  },
  methods: {
    ...mapActions(['getCustomerDetailsAction']),
    async initialize() {
      const response = await getLoginType();
      this.selectedLogin = response.loginType;
    },
    async getCustomerPolicyDetails() {
      let customerPolicyDetails = '';
      if(this.searchValue.charAt(0) !== 'P') {
        customerPolicyDetails =  await getPolicyDetailsWithMobNum(this.searchValue);
      } else {
        customerPolicyDetails =  await getPolicyDetailsWithID(this.searchValue);
      }

      if(customerPolicyDetails.length !== 0) {
        await deleteSearchValue(1);
        // if(deletedStatusText === "OK"){
          await postSearchValue({"searchVal": this.searchValue});
        // }
        this.$router.push({
          name: 'PolicyDetails',
          params: {
            username: this.searchValue,
          }
        });
      } else {
        this.$swal({
              title: 'Oops! No Details',
              html: "<b>We did not find your details with the provided number. Please try again with your registered number.</b>.",
              icon: 'info',
              timer: 6000
            })
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 120rem;
  margin: 5rem auto;
}
.btn-warning {
  width: 100%;
  margin-top: 10px;
  font-weight: bold;
}
.dashboard {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.content-card {
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 10px;
  padding: 5rem 3rem;
  margin: 1rem;
  color : white;
  background-image: linear-gradient(90deg, #669dcd, #cf76f5);
  font-family: Century Gothic;
  font-weight: bold;
  font-size: 2rem;
}
.profile-card {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 10px;
  padding: 5rem 3rem;
  margin: 1rem;
  color : black;
  font-family: Century Gothic;
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: bold;
  font-size: 2rem;
  background-image: linear-gradient(90deg, #eee, #eee);
}
.profile-img {
  width: 13rem;
  height: 13rem;
  margin-bottom: 20%;
  border-radius: 50%;
}

.icon {
    width: 3rem;
    stroke: #80bfff;
}

.item {
    position: relative;
    float: left;
}

.item h2 {
    text-align:center;
    position: absolute;
    line-height: 125px;
    width: 100%;
}

svg {
   -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

.circle_animation {
  stroke-dasharray: 440; /* this value is the pixel circumference of the circle */
  stroke-dashoffset: 440;
}

.html .circle_animation {
    -webkit-animation: html 1s ease-out forwards;
    animation: html 1s ease-out forwards;
}

.css .circle_animation {
    -webkit-animation: css 1s ease-out forwards;
    animation: css 1s ease-out forwards;
}

@-webkit-keyframes html {
  to {
    stroke-dashoffset: 80; /* 50% would be 220 (half the initial value specified above) */
  }
}

@keyframes html {
  to {
    stroke-dashoffset: 80;
  }
}

@-webkit-keyframes css {
  to {
    stroke-dashoffset: 160;
  }
}

@keyframes css {
  to {
    stroke-dashoffset: 160;
  }
}

.search-holder {
    display: flex;
    margin-right: auto;
    padding: 2px;
    width: 500px;
    background-color: #fff;
    border: 1px solid #007fff;
    border-radius: 5px;
    box-shadow: inset 0 0 0 0.2rem #007fff;
}

.search-box {
  font-size: 14px;
  flex: 1;
  min-width: 150px;
  padding: 10px;
  outline: none;
  border: 0px;

   &:focus {
    outline: none;
    border-bottom-color: rgba(#000, 1);
  }

   &:hover {
    outline: none;
    border-bottom-color: rgba(#000, 1);
  }
}

</style>