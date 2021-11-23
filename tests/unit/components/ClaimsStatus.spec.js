import { shallowMount, createLocalVue } from '@vue/test-utils';
import ClaimsStatus from '@/components/ClaimsStatus.vue';

const localVue = createLocalVue();

describe('ClaimsStatus.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(ClaimsStatus, {localVue});
       expect(wrapper.exists);
   })
});