<template>
  <section class="app-feature" id="service">
    <div class="container">
      <h2 class="heading">What we provide</h2>
      <div class="feature">
        <div class="feature-icon">
          <img src="../assets/feature-1.svg" alt="Card Icon" class="icon">
        </div>
        <div class="feature-description">
          <h3>Card Protection</h3>
          <p>In case of wallet theft/card fraud, get you cards blocked in just a tap on our App or call toll-free number. All Credit/Debit cards that you currently have and you get in future are protected during your membership. All the identify cards can also be replaced.</p>
        </div>
      </div>
      <div class="feature">
        <div class="feature-icon">
          <img src="../assets/feature-2.svg" alt="Card Icon" class="icon">
        </div>
        <div class="feature-description">
          <h3>Travel Assistance & Coverage</h3>
          <p>Incase of the Wallet theft/loosing/card fraud in traveling, Bank can provide travel assistance in this case including the hotel bill payments, booking your tickets and cash arrangement.</p>
        </div>
      </div>
      <div class="feature mb-0">
        <div class="feature-icon">
          <img src="../assets/feature-3.svg" alt="Card Icon" class="icon">
        </div>
        <div class="feature-description">
          <h3>24/7 Chat Support</h3>
          <p>With wallet protection, you can report loss of payments cards and other wallet essentials by calling on customer care number and also chat. This service which is available 24x7 lets you block all your credit & debit cards with one just call and click via portal, eliminating the need for you to visit each bank individually to get cards blocked.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
  .app-feature {
    padding: 7.5rem 2rem;
    padding-bottom: 0;
  }
  p {
    margin: 0;
  }
  .heading {
    font-size: 4.5rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .heading::before {
    content: "";
    width:5rem;
    height: 0;
    border: 2px solid #2c3e50;
    background-color: #2c3e50;
    display: flex;
    margin: auto 0;
  }
  .heading::after {
    content: "";
    width:5rem;
    height: 0;
    border: 2px solid #2c3e50;
    background-color: #2c3e50;
    display: flex;
    margin: auto 0;
  }
  .feature {
    padding: 0.5rem 2rem;
    display: grid;
    grid-template-columns: 1.1fr 2fr;
    align-items: center;
    margin-bottom: 3rem;
  }
  .feature-icon {
    display: flex;
    justify-content: center;
  }
  .icon {
    width: 8rem;
  }
  .feature-description h3 {
    font-size: 2.7rem;
    margin-bottom:1rem;
  }
  .feature-description p {
    font-size: 1.8rem;
    line-height: 3rem;
  }
</style>

