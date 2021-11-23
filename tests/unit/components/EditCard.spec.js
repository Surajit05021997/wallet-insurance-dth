import { shallowMount, createLocalVue } from '@vue/test-utils';
import EditCard from '@/components/EditCard.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditCard.vue', ()=>{
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
       let modalHeaderText = "Edit a Card"
       const wrapper = shallowMount(EditCard, {store, localVue});
       expect(wrapper.find('h5').text()).toMatch(modalHeaderText);
       expect(wrapper.exists);
   }) 
});