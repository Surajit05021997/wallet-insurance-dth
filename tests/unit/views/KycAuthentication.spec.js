import { shallowMount, createLocalVue } from '@vue/test-utils';
import KycAuthentication from '@/views/KycAuthentication.vue';
import Login from '@/views/Login.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [
    {
        path: '/login',
        component: Login
      }
]

const router = new VueRouter({
    routes
})

describe('KycAuthentication.vue', ()=>{
    let actions;
    let store;
    beforeEach(()=>{
        actions = {
            getCustomerDetailsAction: jest.fn(),
        }
        store = new Vuex.Store({
            actions
        })
    })
   it('renders', ()=>{
       const text = 'Family Members and KYC';
       const wrapper = shallowMount(KycAuthentication, {store, localVue, router});
       expect(wrapper.find('h1').text()).toMatch(text);
       expect(wrapper.exists);
   })
});