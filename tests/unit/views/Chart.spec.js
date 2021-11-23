import { shallowMount, createLocalVue } from '@vue/test-utils';
import Chart from '@/views/Chart.vue';

const localVue = createLocalVue();

describe('Chart.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(Chart, {localVue});
       expect(wrapper.exists);
   })
});