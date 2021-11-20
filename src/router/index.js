import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import BuyPlans from '@/views/BuyPlans.vue'
import Dashboard from '@/views/AppDashboard.vue'
import PaymentOption from '@/views/PaymentOption.vue'
import RegisteredCards from '@/views/RegisteredCards.vue'
import LostWalletRecords from '@/views/LostWalletRecords.vue'
import PolicyDetails from '@/views/PolicyDetails.vue'
import ClaimsHistory from '@/views/ClaimsHistory.vue'
import KycAuthentication from '@/views/KycAuthentication.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'Home',
    component: Home,
  },
  {
    path: '/login',
    name:'Login',
    component: Login,
  },
  {
    path: '/buyPlans/:type',
    name:'BuyPlans',
    component: BuyPlans,
  },
  {
    path: '/dashboard',
    name:'Dashboard',
    component: Dashboard,
  },
  {
    path: '/paymentOption',
    name:'PaymentOption',
    component: PaymentOption,
  },
  {
    path: '/registeredCards',
    name:'RegisteredCards',
    component: RegisteredCards,
  },
  {
    path: '/lostWalletRecords',
    name:'LostWalletRecords',
    component: LostWalletRecords,
  },
  {
    path: '/policyDetails',
    name:'PolicyDetails',
    component: PolicyDetails,
  },
  {
    path: '/claimsHistory',
    name:'ClaimsHistory',
    component: ClaimsHistory,
  },
  {
    path: '/kycAuthentication',
    name:'KycAuthentication',
    component: KycAuthentication,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
