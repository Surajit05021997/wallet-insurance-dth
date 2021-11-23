<template>
  <div>
    <div class="radio-toolbar" id="dashboard-menu-item-selected">
      <div v-for="(dashboardMenuItem, index) in this.dashboardMenuItems" :key="index" class="m-1">
        <input type="radio" class="btn-check" name="dashboard-menu-item" :value="dashboardMenuItem.value" :id="dashboardMenuItem.id" :checked="dashboardMenuItem.isSelected" @change="getSelectedDashboardMenu()">
        <label class="btn btn-outline-primary" :for="dashboardMenuItem.id">{{dashboardMenuItem.value}}</label>
      </div>
    </div>    
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
m-1{
  margin: 8px;
}
</style>