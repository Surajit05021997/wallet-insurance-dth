<template>
  <div id="app">
    <div>
      <div style="position: sticky; top:0;background: #fff; z-index:5">
        <app-navbar></app-navbar>
      </div>
    <div :class="isLoggedIn? 'dashboard-container' : ''">
      <div v-if="isLoggedIn" >
        <app-sidebar></app-sidebar>
      </div>
      <div>
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
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: var(--bs-body-font-family);
  --bs-body-font-family: var(--bs-font-sans-serif);
  --bs-font-sans-serif: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.dashboard-container {
  display: grid;
  grid-template-columns: 200px auto;
  max-width: 160rem;
  margin: 0 auto;
}
@media screen and (max-width: 768px) {
  .dashboard-container {
    grid-template-columns: 0 auto;
  }
}
</style>
