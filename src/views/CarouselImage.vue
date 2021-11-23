<template>
  <div
    id="carouselExampleIndicatorsImage"
    class="carousel slide"
    data-ride="carousel"
  >
    <ol class="carousel-indicators">
      <li
        data-bs-target="#carouselExampleIndicatorsImage"
        data-bs-slide-to="0"
        class="active"
      ></li>
      <li
        data-bs-target="#carouselExampleIndicatorsImage"
        data-bs-slide-to="1"
      ></li>
      <li
        data-bs-target="#carouselExampleIndicatorsImage"
        data-bs-slide-to="2"
      ></li>
      <li
        data-bs-target="#carouselExampleIndicatorsImage"
        data-bs-slide-to="3"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="10000">
        <img
          class="d-block w-100"
          src="../assets/img/TravelInsurance.png"
          alt="Travel Insurance"
        />
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img
          class="d-block w-100"
          src="../assets/img/CyberSecurityInsurance1.jpg"
          alt="Cyber Security Insurance"
        />
      </div>
      <div class="carousel-item" data-bs-interval="5000">
        <img
          class="d-block w-100"
          src="../assets/img/Interested.png"
          alt="Travel Insurance"
        />
      </div>
      <div class="carousel-item" data-bs-interval="7000">
        <img
          class="d-block w-100"
          src="../assets/img/MobileInsurance.png"
          alt="Mobile Insurance"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicatorsImage"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicatorsImage"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CarouselImage",
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>

