import { shallowMount, createLocalVue } from '@vue/test-utils';
import HeroHeader from '@/components/HeroHeader.vue';

const localVue = createLocalVue();

describe('HeroHeader.vue', ()=>{
   it('renders', ()=>{
       let text = "Secure your wallet."
       const wrapper = shallowMount(HeroHeader, {localVue});
       expect(wrapper.find('h1').text()).toMatch(text);
       expect(wrapper.exists);
   }) 
});