<template>
  <section id="plans" class="app-plans">
    <div class="container">
      <h2 class="heading">Our Plans</h2>
      <div class="plans">
        <div class="plan">
          <p class="plan-type">Wallet Protection : Platinum</p>
          <p class="plan-price">₹ 2400* <span>only/Year</span></p>
          <p class="s-fs mb-0">Including all taxes</p>
          <p class="m-fs">(an affordable 200/month)</p>
          <router-link
            :to="{ name: 'BuyPlans', params: { type: 'platinum' } }"
            class="btn"
            ><strong>Buy Now</strong></router-link
          >
          <p class="m-fs"><strong>Benefits</strong></p>
          <ul>
            <li>&rarr; All Credit/Debits card blocking</li>
            <li>&rarr; All Identity cards replacement</li>
            <li>&rarr; Travel Assistance : Hotel Bill payment*</li>
            <li v-if="!visiblePlatinum">&ensp;&emsp;<strong>. . .</strong></li>
            <li :class="visiblePlatinum? '' : 'hide-benifit'">&rarr; Travel Assistance : Ticket booking*</li>
            <li :class="visiblePlatinum? '' : 'hide-benifit'">&rarr; Travel Assistance : Cash arrangements*</li>
            <li :class="visiblePlatinum? '' : 'hide-benifit'">&rarr; Travel Assistance : Cards Fraud protection</li>
            <li :class="visiblePlatinum? '' : 'hide-benifit'">&rarr; <strong>Get additional 20% discounts if you book the carbon neutral hotel or eco friendly hotels</strong></li>
          </ul>
          <p class="s-fs plan-conditions" :class="visiblePlatinum? '' : 'hide-benifit'">
            *Need to repay the Advance amount.<br>
            **This offerings can only  made legal BFSI Entities.
          </p>
          <button v-if="!visiblePlatinum" @click="togglePlatinumBenifits()">
            <svg xmlns="http://www.w3.org/2000/svg" class="down-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button v-if="visiblePlatinum" @click="togglePlatinumBenifits()">
            <svg xmlns="http://www.w3.org/2000/svg" class="up-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
        <div class="plan">
          <p class="plan-type">Wallet Protection : Gold</p>
          <p class="plan-price">₹ 1800 <span>only/Year</span></p>
          <p class="s-fs mb-0">Including all taxes</p>
          <p class="m-fs">(an affordable 150/month)</p>
          <router-link
            :to="{ name: 'BuyPlans', params: { type: 'gold' } }"
            class="btn"
            ><strong>Buy Now</strong></router-link
          >
          <p class="m-fs"><strong>Benefits</strong></p>
          <ul>
            <li>&rarr; All Credit/Debits card blocking</li>
            <li>&rarr; All Identity cards replacement</li>
            <li>&rarr; Travel Assistance : Hotel Bill payment*</li>
            <li v-if="!visibleGold">&ensp;&emsp;<strong>. . .</strong></li>
            <li :class="visibleGold? '' : 'hide-benifit'">&rarr; Travel Assistance : Ticket booking*</li>
            <li :class="visibleGold? '' : 'hide-benifit'">&rarr; Travel Assistance : Cards Fraud protection</li>
            <li :class="visibleGold? '' : 'hide-benifit'">&rarr; <strong>Get additional 10% discounts if you book the carbon neutral hotel or eco friendly hotels</strong></li>
          </ul>
          <p class="s-fs plan-conditions" :class="visibleGold? '' : 'hide-benifit'">
            *Need to repay the Advance amount.<br>
            **This offerings can only  made legal BFSI Entities.
          </p>
          <button v-if="!visibleGold" @click="toggleGoldBenifits()">
            <svg xmlns="http://www.w3.org/2000/svg" class="down-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button v-if="visibleGold" @click="toggleGoldBenifits()">
            <svg xmlns="http://www.w3.org/2000/svg" class="up-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
          <img class="wallet-icon" src="../assets/wallet-icon-2.svg" alt="Wallet">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppPlans',
  data() {
    return {
      visiblePlatinum: false,
      visibleGold: false,
    }
  },
  methods: {
    togglePlatinumBenifits() {
      this.visiblePlatinum = !this.visiblePlatinum;
    },
    toggleGoldBenifits() {
      this.visibleGold = !this.visibleGold;
    }
  }
};
</script>

<style scoped>
.app-plans {
  padding: 7.5rem 2rem ;
  padding-bottom: 0;
}
.container {
  max-width: 120rem;
  margin: 0 auto;
}
.plans {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  padding: 2rem 0;
}
.plan {
  position: relative;
  background-color: #fff;
  width: 75%;
  height: fit-content;
  margin: 0 auto;
  padding: 5rem 3rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 10px;
  transition: all 0.3s;
}
.plan:hover {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}
.plan button {
  display: block;
  margin: 0 auto;
  background-color: #007fff;
  color:#fff;
  border: 2px solid #007fff;
  border-radius: 50%;
  transition: all 0.3s;
}
.plan button:hover {
  background-color: #0062c4;
  border: 2px solid #0062c4;
}
.best-plan {
  background-color: #007fff;
  color: #fff;
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
.plan-type {
  font-size: 3rem;
  font-weight: 500;
  margin: 0;
}
.plan-price {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0;
}
span {
  font-size: 2.5rem;
  font-weight: 500;
  color: #999;
}
.best-plan span {
  color: #ccc;
}
ul {
  font-size: 2rem;
}
ul li {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  list-style: none;
}
.btn:link,
.btn:visited {
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 0.5rem 2rem;
  margin: 1rem auto;
  background-color: #007fff;
  border-radius: 20rem;
  transition: all 0.3s;
}

.btn:hover,
.btn:active {
  cursor: pointer;
  background-color: #0062c4;
}
.best-plan .btn:link, .best-plan .btn:visited {
  background-color: rgb(255, 208, 0);
  box-shadow: none;
  color: #007fff;
}
.best-plan .btn:hover, .best-plan .btn:active {
  box-shadow: none;
  color: #000;
}
.s-fs {
  font-size: 1.2rem;
}
.m-fs {
  font-size: 1.6rem;
}
.plan-conditions {
  color: red;
}
.hide-benifit {
  display: none;
}
.down-icon, .up-icon {
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
}
.wallet-icon {
  width: 10rem;
  height: 10rem;
  position: absolute;
  right: -60px;
  top: -40px;
  z-index: -1;
}
@media screen and (max-width: 992px) {
  .plans {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 0 15%;
    gap: 5rem;
  } 
}
</style>