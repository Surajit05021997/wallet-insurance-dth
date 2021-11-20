<template>
  <div id="app">
    <div>
      <div style="position: sticky; top:0;background: #fff; z-index:5">
        <app-navbar></app-navbar>
      </div>
    <div>
      <div v-if="isLoggedIn" class="col-lg-2 col-md-2">
        <app-sidebar></app-sidebar>
      </div>
      <div :class="{ 'col-lg-10 col-md-10': isLoggedIn }">
        <router-view></router-view>
      </div>
    </div>
    <app-footer></app-footer>
    
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppSidebar from './views/AppSidebar.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
    AppSidebar
  },
  computed: {
    ...mapState(['isLoggedIn']),
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-weight: 400;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
