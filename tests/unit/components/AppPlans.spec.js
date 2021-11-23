import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppPlans from '@/components/AppPlans.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: AppPlans
      }
]

const router = new VueRouter({
    routes
})

describe('AppPlans.vue', ()=>{
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
        let text = "Our Plans"
       const wrapper = shallowMount(AppPlans, {store, localVue, router});
       expect(wrapper.find('h2').text()).toMatch(text);
       expect(wrapper.exists);
   }) 
});