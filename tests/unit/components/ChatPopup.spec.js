import { shallowMount, createLocalVue } from '@vue/test-utils';
import ChatPopup from '@/components/ChatPopup.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ChatPopup.vue', ()=>{
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
        let text = "Let's Chat - Online"
       const wrapper = shallowMount(ChatPopup, {store, localVue});
       expect(wrapper.find('h6').text()).toMatch(text);
       expect(wrapper.exists);
   }) 
});