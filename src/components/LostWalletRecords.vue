<template>
  <div>
      <table class="table table-hover">
          <thead>
  <tr>
    <th v-for="(lostWalletField, index) in lostWalletFields" :key="index">{{lostWalletField}}</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(lostWalletRecord, index) in lostWalletRecords" :key="index">
    <td>{{lostWalletRecord.modeOfLosingWallet}}</td>
    <td>{{lostWalletRecord.date}}</td>
    <td>{{lostWalletRecord.location}}</td>
    <td>{{lostWalletRecord.time}}</td>
    <td>{{lostWalletRecord.additionalDetails}}</td>
    <td>
        <span v-for="(card, index) in lostWalletRecord.cards" :key="index">
            <p>{{card}}</p>
            </span>
    </td>
  </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
name: 'LostWalletRecords',
data(){
    return {
        lostWalletFields : [],
        lostWalletRecords : []        
    }
},
methods: {
    initialiseValues(){
      this.lostWalletFields = [
        'How You Lost Wallet',
        'Date',
        'Location',
        'Time',
        'Additional Details',
        'Cards'
      ];
      this.lostWalletRecords = [
            {
                modeOfLosingWallet: 'Theft',
                date: '21st Oct 2019',
                location: 'Hyderabad',
                time: '9:00 AM',
                additionalDetails: 'Wallet contained Driving Lisense, FIR registered',
                cards: [
                    'ICICI Bank',
                    'Axis Bank',
                    'Citi Bank'
                ]
            },
            {
                modeOfLosingWallet: 'Dropped from River Bridge',
                date: '21st Oct 2020',
                location: 'Banglore',
                time: '11:00 AM',
                additionalDetails: 'Wallet contained Hotel Booking Tickets',
                cards: [
                    'ICICI Bank',
                    'Axis Bank',
                ]
            },
        ]
    },
},
created(){
    this.initialiseValues();
}
}
</script>

<style scoped>
  
</style>

