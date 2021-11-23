import { shallowMount, createLocalVue } from '@vue/test-utils';
import PolicyDetails from '@/components/PolicyDetails.vue';

const localVue = createLocalVue();

describe('PolicyDetails.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(PolicyDetails, {localVue});
       expect(wrapper.exists);
   })
});