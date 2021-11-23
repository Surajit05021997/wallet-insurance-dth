import { shallowMount, createLocalVue } from '@vue/test-utils';
import AddCard from '@/components/AddCard.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AddCard.vue', ()=>{
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
       let modalHeaderText = "Add a Card"
       const wrapper = shallowMount(AddCard, {store, localVue});
       expect(wrapper.find('h5').text()).toMatch(modalHeaderText);
       expect(wrapper.exists);
   }) 
});