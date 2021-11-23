import { shallowMount, createLocalVue } from '@vue/test-utils';
import AddLostWalletRecord from '@/components/AddLostWalletRecord.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AddLostWalletRecord.vue', ()=>{
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
       let modalHeaderText = "Add Lost Wallet Record"
       const wrapper = shallowMount(AddLostWalletRecord, {store, localVue});
       expect(wrapper.find('h5').text()).toMatch(modalHeaderText);
       expect(wrapper.exists);
   }) 
});