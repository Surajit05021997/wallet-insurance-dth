<template>
  <div>
    <table class="table table-hover">
      <thead>
  <tr>
    <th v-for="(claimsStatusField, index) in claimsStatusFields" :key="index">{{claimsStatusField}}</th>
  </tr>
  </thead>
    <tbody>
  <tr v-for="(claim, index) in claims" :key="index">
    <td>{{claim.claimId}}</td>
    <td>{{claim.lostWalletDate}}</td>
    <td>{{claim.location}}</td>
    <td :class="getStatusClass(claim.status)">{{claim.status}}</td>
  </tr>
  </tbody>
</table>
      <!-- <table>
  <tr>
    <th v-for="(claimsStatusField, index) in claimsStatusFields" :key="index">{{claimsStatusField}}</th>
  </tr>
  <tr v-for="(claim, index) in claims" :key="index">
    <td>{{claim.claimId}}</td>
    <td>{{claim.lostWalletDate}}</td>
    <td>{{claim.location}}</td>
    <td>{{claim.status}}</td>
  </tr>
</table> -->
  </div>
</template>

<script>
export default {
name: 'ClaimsStatus',
data(){
    return {
        claimsStatusFields : [],
        claimsStatuses : []        
    }
},
methods: {
    initialiseValues(){
      this.claimsStatusFields = [
        'Claim ID',
        'Lost Wallet Date',
        'Location',
        'Status',
      ];
      this.claims = [
            {
                claimId: 'abcde',
                lostWalletDate: '2019-08-03',
                location: 'Mumbai',
                status: 'success',
            },
            {
                claimId: 'efghi',
                lostWalletDate: '2021-11-03',
                location: 'Delhi',
                status: 'processing',
            },
            {
                claimId: 'efghi',
                lostWalletDate: '2021-11-03',
                location: 'Delhi',
                status: 'processing',
            },
        ]
    },
    getStatusClass(status){
      if(status==='success')
        return 'text-success'
      return 'text-warning'
    }
},
created(){
    this.initialiseValues();
}
}
</script>

<style scoped>
  
</style>

