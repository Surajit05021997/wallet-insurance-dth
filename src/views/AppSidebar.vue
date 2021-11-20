<template>
  <div class="sidebarContent">
    <nav id="sidebarMenu" class="d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            <!-- <span data-feather="home"></span> -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <router-link class="routerLink" to="/dashboard">Dashboard</router-link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
            </svg>
            <router-link class="routerLink" to="policyDetails">Policy Details</router-link>
          </a>
        </li>
        <li class="nav-item" v-if="this.selectedLogin === 'Customer'">
          <a class="nav-link" href="#">
            <!-- <span data-feather="file"></span> -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
            <router-link class="routerLink" to="/registeredCards">Card Registration</router-link>
          </a>
        </li>
        <li class="nav-item" v-if="this.selectedLogin === 'Customer'">
          <a class="nav-link" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>           
            <router-link class="routerLink" to="/kycAuthentication">KYC Authentication</router-link>              
          </a>
        </li>
        <li class="nav-item" v-if="this.selectedLogin === 'Customer'">
          <a class="nav-link" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
            </svg>
            <router-link class="routerLink" to="/lostWalletRecords">Lost Wallet Records</router-link>
          </a>
        </li>
        <li class="nav-item" v-if="this.selectedLogin === 'Customer'">
          <a class="nav-link" href="#">
            <!-- <span data-feather="file"></span> -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
            <router-link class="routerLink" to="/claimsHistory">Claims / Advances</router-link>
          </a>
        </li>
        <li class="nav-item" v-if="this.selectedLogin === 'Employee'">
          <a class="nav-link" href="#">
            <!-- <span data-feather="file"></span> -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
            <router-link class="routerLink" to="/claimsHistory">Pending Claims</router-link>
          </a>
        </li>
      </ul>
    </div>
    </nav>
  </div>
</template>

<script>

import { getLoginType } from '@/service/service.js';
export default {
  name: 'AppSidebar',
  data() {
    return {
      selectedLogin : ''
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const response = await getLoginType();
      this.selectedLogin = response.loginType;
    }
  }
}
</script>

<style scoped>
.routerLink {
  text-decoration: none;
  color:rgb(78, 77, 77);
  font-weight: 700;
}
.sidebarContent {
  position: fixed;
  left:initial;
  top: initial;
  display: flex; 
  font-size: 15px;
  height: 100%;
}

.container {
  max-width: 120rem;
  margin: 5rem auto;
}
.dashboard {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 10px;
  padding: 5rem 3rem;
}
.profile-img {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
}
.profile-name {
  font-size: 3rem;
  font-weight: 700;
}
.profile-number {
  font-size: 1.5rem;
  color: #999;
}
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}
.sidebarContent {
  display: flex; 
  font-size: 15px;
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500 !important;
  color: #333 !important;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */
.nav-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
.icon {
    width: 3rem;
    stroke: #80bfff;
  }
.nav-item a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  text-decoration: none;
}
.nav-item a:hover,
.nav-item a:focus {
  background-color: #e5d9f8;
  border-radius: 20px 20px 20px 20px;
}
/* .profile-number::after {
  content: "";
  display: block;
  width:100%;
  height: 1px;
  border: 2px solid black;
} */
</style>