<template>
  <nav class="navbar">
    <div class="container">
      <div class="brand">
        <router-link v-if="!isLoggedIn" class="wallet-icon" :to="{ name: 'Home' }" @click="scrollToTop()">
          <img src="@/assets/wallet-icon.svg" alt="Wallet Icon">
        </router-link>
        <router-link v-if="!isLoggedIn" class="logo" :to="{ name: 'Home' }" @click="scrollToTop()">Wallet-Insurance</router-link>
      </div>
      <div class="brand">
        <router-link v-if="isLoggedIn" class="wallet-icon" :to="{ name: 'Dashboard' }" @click="scrollToTop()">
          <img src="@/assets/wallet-icon.svg" alt="Wallet Icon">
        </router-link>
        <router-link v-if="isLoggedIn" class="logo" :to="{ name: 'Dashboard' }" @click="scrollToTop()">Wallet-Insurance</router-link>
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
      <div v-if="isLoggedIn">
        <a class="logout-btn" @click="logout"><strong>Logout</strong></a>
      </div>
    </div>
    <img class="christmas-logo" src="../assets/bauble-christmas.svg" alt="Christmas bauble">
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppNavbar',
  computed: {
    ...mapState(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['setLoginStatusAction']),
    logout() {
      this.setLoginStatusAction(false);
      this.$router.push({ name: 'Home' });
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
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

  .logo:link, .logo:visited {
    font-size: 4rem;
    font-weight: 700;
    color: #007fff;
    text-decoration: none;
  }

  .logo:hover, logo:active {
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
  .christmas-logo {
    position: absolute;
    z-index: 5;
    height: 100px;
    top: 70px;
    right: 0;
  }
</style>