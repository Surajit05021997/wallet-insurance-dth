import { shallowMount, createLocalVue } from '@vue/test-utils';
import LostWalletRecords from '@/components/LostWalletRecords.vue';

const localVue = createLocalVue();

describe('LostWalletRecords.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(LostWalletRecords, {localVue});
       expect(wrapper.exists);
   })
});