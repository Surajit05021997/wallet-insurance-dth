<template>
  <div v-if="listOfLostWalletRecordsLocationMarkers">
    <GmapMap
      :center="
        this.listOfLostWalletRecordsLocationMarkers[
          this.listOfLostWalletRecordsLocationMarkers.length - 1
        ].position
      "
      :zoom="5"
      map-type-id="terrain"
      style="width: 100%; height: 60vh"
    >
      <GmapMarker
        v-for="(location, index) in this.listOfLostWalletRecordsLocationMarkers"
        :key="index"
        :position="location.position"
        :clickable="true"
        :title="location.title"
        @click="center = location.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import {
  getLostWalletRecords,
  getCustomerDetailsService,
} from "@/service/service.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "MapOfLostWalletRecord",
  props: ["refreshMapList"],
  data() {
    return {
      googleMapGeocodeService: null,
      listOfLostWalletRecordsLocationMarkers: null,

      loggedInUserMobileNum: "",
    };
  },
  computed: {
    ...mapState(["loggedInUser"]),
  },
  watch: {
    async refreshMapList(newValue) {
      if (newValue === true) {
        await this.refreshListOfLostWalletRecordsLocationMarkers();
      }
    },
  },
  created() {
    this.getCustomerDetailsAction(this.loggedInUser);
    this.initialiseValues();
  },
  methods: {
    ...mapActions(["getCustomerDetailsAction"]),
    async initialiseValues() {
      let customerDetails = await getCustomerDetailsService(this.loggedInUser);
      // Add the Customer mobile number to fetch the cards registered with the logged in user
      this.loggedInUserMobileNum = customerDetails[0].mobileNum;
      this.googleMapGeocodeService = new window.google.maps.Geocoder();
      await this.refreshListOfLostWalletRecordsLocationMarkers();
      if (this.listOfLostWalletRecordsLocationMarkers) {
        this.showMapNotification();
      }
    },
    async refreshListOfLostWalletRecordsLocationMarkers() {
      this.listOfLostWalletRecordsLocationMarkers =
        await this.getListOfLostWalletRecordsLocationMarkers();
    },
    // MapsInit () {
    //   this.googleMapGeocodeService = new window.google.maps.Geocoder();
    //   },
    async getListOfLostWalletRecordsLocationMarkers() {
      let eachLocationLatLong = [];
      let responseData = await getLostWalletRecords(this.loggedInUserMobileNum);

      responseData.forEach((lostWalletRecord) => {
        let dateOptions = { year: "numeric", month: "long", day: "numeric" };
        let titleString = `${lostWalletRecord.howYouLostWallet} From ${
          lostWalletRecord.locationOfLosingWallet
        } on ${new Date(
          lostWalletRecord.dateTimeOfLosingWallet
        ).toLocaleDateString("en-US", dateOptions)}`;
        // pushing the object with key "position" and value as Object of latitude longitude
        eachLocationLatLong.push({
          position: {
            lat: lostWalletRecord.locationOfLosingWalletLatitude,
            lng: lostWalletRecord.locationOfLosingWalletLongitude,
          },
          title: titleString,
        });
      });
      return eachLocationLatLong;
    },
    showMapNotification() {
      this.$swal({
        title: "Information",
        html: `<small><b>Map is centered to Last Wallet record Location</b></small>.
                     <br>
                     <ui>
                     <li>Use <b>+</b> to zoom in</li>
                     <li>Use <b>-</b> to zoom out</li>
                     </ui>
                     <u>Hover over Map Marker to see more information</u>
                     `,
        icon: "info",
        timer: 6000,
      });
    },
  },
};
</script>

<style scoped>
</style>

