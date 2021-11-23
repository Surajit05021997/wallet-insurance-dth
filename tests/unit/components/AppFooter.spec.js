import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppFooter from '@/components/AppFooter.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AppFooter.vue', ()=>{
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
       let text = "2021 Wallet Insurance by Team Amalgam"
       const wrapper = shallowMount(AppFooter, {store, localVue});
       expect(wrapper.find('p').text()).toContain(text);
       expect(wrapper.exists);
   }) 
});