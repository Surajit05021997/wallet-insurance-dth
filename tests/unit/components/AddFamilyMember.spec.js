import { shallowMount, createLocalVue } from '@vue/test-utils';
import AddfamilyMember from '@/components/AddfamilyMember.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AddFamilyMember.vue', ()=>{
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
       let modalHeaderText = "Add a Family Member"
       const wrapper = shallowMount(AddfamilyMember, {store, localVue});
       expect(wrapper.find('h5').text()).toMatch(modalHeaderText);
       expect(wrapper.exists);
   }) 
});