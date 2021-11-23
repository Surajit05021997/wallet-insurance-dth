import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();

describe('Home.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(Home, {localVue});
       expect(wrapper.exists);
   })
});