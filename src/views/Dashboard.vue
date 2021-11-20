<template>
  <div>
    <div class="radio-toolbar" id="dashboard-menu-item-selected">
      <div v-for="(dashboardMenuItem, index) in this.dashboardMenuItems" :key="index" class="m-1">
        <input type="radio" class="btn-check" name="dashboard-menu-item" :value="dashboardMenuItem.value" :id="dashboardMenuItem.id" :checked="dashboardMenuItem.isSelected" @change="getSelectedDashboardMenu()">
        <label class="btn btn-outline-primary" :for="dashboardMenuItem.id">{{dashboardMenuItem.value}}</label>
      </div>
    </div>    
    <!-- <div class="radio-toolbar" id="dashboard-menu-item-selected">
      <div v-for="(dashboardMenuItem, index) in this.dashboardMenuItems" :key="index">
        <input type="radio" :id="dashboardMenuItem.id" name="dashboard-menu-item" :value="dashboardMenuItem.value" :checked="dashboardMenuItem.isSelected" @change="getSelectedDashboardMenu()">
        <label :for="dashboardMenuItem.id">{{dashboardMenuItem.value}}</label>
      </div>
    </div> -->
    <div class="dashboardMenuDetails">
      <div v-if="this.selectedDashboardMenu==='Claims Status'">
        <claims-status></claims-status>
      </div>
      <div v-if="this.selectedDashboardMenu==='Lost Wallet Records'">
        <lost-wallet-records></lost-wallet-records>
      </div>
    </div>
  </div>
</template>

<script>
import LostWalletRecords from '@/components/LostWalletRecords.vue';
import ClaimsStatus from '@/components/ClaimsStatus.vue';
import { Eventbus } from '@/main.js';

export default {
  name: 'Dashboard',
  components : { 
    LostWalletRecords,
    ClaimsStatus
    },
  data(){
    return {
      selectedDashboardMenu : '',
      dashboardMenuItems : null,
      selectedLogin : 'Customer'
    }
  },
  computed: {},
  methods: {
    initialiseValues(){
      this.dashboardMenuItems = [
        {
          id:'radio-claims-status',
          value:'Claims Status',
          isSelected: true,
        },
        {
          id:'radio-lost-wallet-record',
          value:'Lost Wallet Records',
          isSelected: false,
        },
        {
          id:'radio-policy-details',
          value:'Policy Details',
          isSelected: false,
        },
      ];
      this.selectedDashboardMenu = 'Claims Status'
    },
    getSelectedDashboardMenu(){
    let selectedMenu = document.querySelector('input[name="dashboard-menu-item"]:checked').value;
    this.selectedDashboardMenu = selectedMenu;
}
  },
  

  created(){
    this.initialiseValues();    
  }
}
</script>

<style scoped>
 .radio-toolbar {
  display: flex;
}
/*
.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
.radio-toolbar label {
    display: inline-block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
    margin: 8px;
}
.radio-toolbar input[type="radio"]:checked + label {
    background-color:#bfb;
    border-color: #4c4;
}
.radio-toolbar label:hover {
  background-color: #dfd;
} 
input[type="radio"] {
  margin-left: 10px;
} */
m-1{
  margin: 8px;
}
</style>