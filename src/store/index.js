import Vue from 'vue'
import Vuex from 'vuex'
import { addCustomerService, getCustomerDetailsService, getPreCustomer } from '@/service/service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: '',
    customerDetails: '',
    preCustomer: {},
  },
  mutations: {
    setCustomerdetails(state, payload) {
      state.customerDetails = payload;
    },
    setLoginStatus(state, payload) {
      state.isLoggedIn = payload;
    },
    setLoggedInUser(state, payload) {
      state.loggedInUser = payload;
    },
    setPreCustomer(state, payload) {
      state.preCustomer = payload;
    }
  },
  actions: {
    addCustomerAction( _1, customer) {
      addCustomerService(customer);
    },
    async getCustomerDetailsAction({ commit }, username) {
      const customerDetails = await getCustomerDetailsService(username);
      commit('setCustomerdetails', customerDetails[0]);
    },
    async setLoginStatusAction({ commit }, status) {
      commit('setLoginStatus', status)
    },
    async setLoggedInUserAction({ commit }, username) {
      commit('setLoggedInUser', username);
    },
    async setPreCustomerAction({ commit }) {
      const preCustomer = await getPreCustomer();
      commit ('setPreCustomer', preCustomer);
    },
  },
  modules: {
  }
})
