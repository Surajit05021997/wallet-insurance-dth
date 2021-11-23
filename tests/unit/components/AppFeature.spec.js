import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppFeature from '@/components/AppFeature.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AppFeature.vue', ()=>{
    let actions;
    let store;
    beforeEach(()=>{
        actions = {
            setLoginStatusAction: jest.fn(),
        }
        store = new Vuex.Store({
            actions
        })
    })
   it('renders', ()=>{
       let text = "Card Protection"
       const wrapper = shallowMount(AppFeature, {store, localVue});
       expect(wrapper.find('h3').text()).toContain(text);
       expect(wrapper.exists);
   }) 
});