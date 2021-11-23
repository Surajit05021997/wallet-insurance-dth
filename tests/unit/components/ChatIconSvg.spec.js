import { shallowMount, createLocalVue } from '@vue/test-utils';
import ChatIconSvg from '@/components/ChatIconSvg.vue';

const localVue = createLocalVue();

describe('ChatIconSvg.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(ChatIconSvg, {localVue});
       expect(wrapper.exists);
   }) 
});