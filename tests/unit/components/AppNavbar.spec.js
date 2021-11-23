import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppNavbar from '@/components/AppNavbar.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: AppNavbar
      }
]

const router = new VueRouter({
    routes
})

describe('AppNavbar.vue', ()=>{
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
       const wrapper = shallowMount(AppNavbar, {store, localVue, router});
       expect(wrapper.exists);
   }) 
});