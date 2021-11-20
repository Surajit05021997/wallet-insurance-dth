<template>
  <section class="app-feature" id="service">
    <div class="container">
      <h2 class="heading">What we provide</h2>
      <div class="feature">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div class="feature-description">
          <h3>Card Protection</h3>
          <p>In case of wallet theft/card fraud, get you cards blocked in just a tap on our App or call toll-free number. All Credit/Debit cards that you currently have and you get in future are protected during your membership. All the identify cards can also be replaced.</p>
        </div>
      </div>
      <div class="feature">
        <div class="feature-description">
          <h3>Travel Assistance & Coverage</h3>
          <p>Incase of the Wallet theft/loosing/card fraud in traveling, Bank can provide travel assistance in this case including the hotel bill payments, booking your tickets and cash arrangement.</p>
        </div>
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="feature">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
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
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .feature-icon {
    display: flex;
    justify-content: center;
  }
  .icon {
    width: 10rem;
    stroke: #007fff;
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

