<template>
  <div>
      <table class="table table-hover">
        <thead>
  <tr>
    <th v-for="(policyDetailsField, index) in policyDetailsFields" :key="index">{{policyDetailsField}}</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(policyDetail, index) in policyDetails" :key="index">
    <td>{{policyDetail.policyId}}</td>
    <td>{{policyDetail.startDate}}</td>
    <td>{{policyDetail.endDate}}</td>
    <td>{{policyDetail.insuranceAmount}}</td>
    <td><button class="btn btn-danger" v-show="showRenewPolicyButton(policyDetail.endDate)" :disabled="!showRenewPolicyButton(policyDetail.endDate)">Renew Policy</button></td>
    

  </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
name: 'PolicyDetails',
data(){
    return {
        policyDetailsFields : [],
        policyDetails : []        
    }
},
methods: {
    initialiseValues(){
      this.policyDetailsFields = [
        'Policy ID',
        'Start Date',
        'End Date',
        'Insurance Amount',
        'Renew Policy',
      ];
      this.policyDetails = [
            {
                policyId: '12445',
                startDate: '2018-08-03',
                endDate: '2022-08-03',
                insuranceAmount: '10000',
            },
            {
                policyId: '12345',
                startDate: '2018-08-03',
                endDate: '2021-10-13',
                insuranceAmount: '30000',
            },
        ]
    },
    showRenewPolicyButton(dateVariable){
      let today = new Date();
      let date = new Date(dateVariable);
      if(date.getTime() < today.getTime())
        return true;
      return false;
    }
},
created(){
    this.initialiseValues();
}
}
</script>

<style scoped>
  
</style>

