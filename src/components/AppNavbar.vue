<template>
  <nav class="navbar">
    <div class="container">
      <div v-if="!isLoggedIn" class="brand">
        <router-link class="wallet-icon" :to="{ name: 'Home' }" @click="scrollToTop()">
          <img src="@/assets/wallet-icon.svg" alt="Wallet Icon">
        </router-link>
        <router-link class="logo" :to="{ name: 'Home' }" @click="scrollToTop()">Wallet-Insurance</router-link>
      </div>
      <div v-if="isLoggedIn" class="brand">
        <router-link class="wallet-icon" :to="{ name: 'Dashboard' }" @click="scrollToTop()">
          <img src="@/assets/wallet-icon.svg" alt="Wallet Icon">
        </router-link>
        <router-link class="logo" :to="{ name: 'Dashboard' }" @click="scrollToTop()">Wallet-Insurance</router-link>
      </div>
      <div class="right-nav" v-if="!isLoggedIn">
        <!-- <div class="right-nav"> -->
          <router-link :to="{ name: 'Home'}"><span @click="scrollToTop()">Home</span></router-link>
          <a href="#service" v-if="$route.path === '/'">Service</a>
          <a href="#plans" v-if="$route.path === '/'">Plans</a>
          <a href="#contact-us" v-if="$route.path === '/'">Contact</a>
        <!-- </div> -->
        <router-link class="login-btn" :to="{ name: 'Login'}"><strong>Login</strong></router-link>
      </div>
      <div class="right-nav-items" v-if="isLoggedIn">
        <img class="profile-img" src="../assets/user-1.jpg" alt="Profile Picture" @click="openModal()">
        <a class="logout-btn logoutSpecs" href="#" @click.prevent="logout">Logout</a>
        <div class="profile-modal" :class="active? 'active' : ''">
          <div class="profile-modal-content">
            <img class="profile-img" src="../assets/user-1.jpg" alt="Profile Picture">
            <p class="profile-username"><strong>{{ profileUsername }}</strong></p>
            <p class="profile-email">{{ profileEmail }}</p>
            <button class="btn">View full profile</button>
            <hr>
            <p class="brand">Team Amalgam</p>
          </div>
        </div>
        <div :class="active? 'active' : ''" id="overlay" @click="closeModal()"></div>
      </div>
    </div>
    <img class="christmas-logo" src="../assets/bauble-christmas.svg" alt="Christmas bauble">
  </nav>
</template>

<script>
import { getCustomerService } from '../service/service.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppNavbar',
  data() {
    return {
      active: false,
      profileUsername: '',
      profileEmail: '',
    }
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['setLoginStatusAction']),
    logout() {
      this.setLoginStatusAction(false);

      if(sessionStorage.getItem("loggedInUsername")){
        sessionStorage.removeItem("loggedInUsername");
      }
      

      this.$router.push({ name: 'Home' });
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
    openModal() {
      this.getModalData();
      this.active = true;
    },
    closeModal() {
      this.active = false;
    },
    async getModalData() {
      const username = sessionStorage.getItem('loggedInUsername');
      const customersList = await getCustomerService();
      const loggedInCustomer = customersList.find(element => element.username === username);
      this.profileEmail = loggedInCustomer.emailId;
      this.profileUsername = loggedInCustomer.name;
    }
  }
}
</script>

<style scoped>
  .navbar {
    padding: 0.5rem 2rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  .container {
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: flex;
    gap: 1rem;
  }

  .wallet-icon {
    width: 5rem;
    margin: auto 0;
  }

  .logo:link, .logo:visited, btn {
    font-size: 4rem;
    font-weight: 700;
    color: #007fff;
    text-decoration: none;
  }

  .logo:hover, logo:active, btn:hover {
    cursor: pointer;
  }

  .right-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }
  
  .right-nav a {
    text-decoration: none;
    font-size: 2rem;
  }

  .login-btn:link, .login-btn:visited, .logout-btn:link, .logout-btn:visited, .btn {
    font-size: 2rem;
    font-weight:500;
    color: #fff;
    text-decoration: none;
    padding:0.5rem 2rem;
    background-color: #007fff;
    border-radius: 20rem;
    transition: all 0.3s;
  }

  .login-btn:hover, .login-btn:active, .logout-btn:hover, .logout-btn:active, .btn:hover {
    cursor: pointer;
    background-color: #0062c4;
    color: #fff;
  }

  .logoutSpecs {
    color: #0d6efd;
    text-decoration: none;
    font-size: xx-large;
    font-weight: bold;
    border-radius: 1.7rem;
  }
  
  .christmas-logo {
    position: absolute;
    z-index: 5;
    height: 100px;
    top: 70px;
    right: 0;
  }
  .right-nav-items {
    position: relative;
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  .profile-img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .profile-img:hover {
    cursor: pointer;
  }
  .profile-modal {
    position: absolute;
    top: 100px;
    min-width: 300px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-radius: 10px;
    z-index: 100;
    background-color: #fff;
    transform: translate(-40%, -10%) scale(0);
    transition: 0.3s ease-in-out;
  }
  .profile-modal.active {
    transform: translate(-40%, -10%) scale(1);
  }
  .profile-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  .profile-modal-content img {
    width: 10rem;
    height: 10rem;
  }
  .profile-username {
    font-size: 3rem;
    margin-bottom: 0;
  }
  .profile-email {
    font-size: 1.8rem;
    margin-bottom: 3rem;
  }
  .profile-modal-content hr {
    width: 100%;
    height: 2px;
    opacity: 0.7;
  }
  .profile-modal-content .brand {
    font-size: 1.8rem;
  }
  #overlay {
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0 , 0.5);
    pointer-events: none;
    transition: 0.3s ease-in-out;
  }
  #overlay.active {
    opacity: 1;
    pointer-events: all;
  }
</style>