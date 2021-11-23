import { shallowMount, createLocalVue } from '@vue/test-utils';
import About from '@/views/About.vue';

const localVue = createLocalVue();

describe('About.vue', ()=>{
   it('renders', ()=>{
       const text = 'This is an about page';
       const wrapper = shallowMount(About, {localVue});
       expect(wrapper.find('h1').text()).toMatch(text);
       expect(wrapper.exists);
   })
});