import { shallowMount, createLocalVue } from '@vue/test-utils';
import ChartJs from '@/views/ChartJs.vue';

const localVue = createLocalVue();

describe('ChartJs.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(ChartJs, {localVue});
       expect(wrapper.exists);
   })
});