import { shallowMount, createLocalVue } from '@vue/test-utils';
import CloseIconSvg from '@/components/CloseIconSvg.vue';

const localVue = createLocalVue();

describe('CloseIconSvg.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(CloseIconSvg, {localVue});
       expect(wrapper.exists);
   }) 
});