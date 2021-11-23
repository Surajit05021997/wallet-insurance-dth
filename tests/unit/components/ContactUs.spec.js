import { shallowMount, createLocalVue } from '@vue/test-utils';
import ContactUs from '@/components/ContactUs.vue';

const localVue = createLocalVue();

describe('ContactUs.vue', ()=>{
   it('renders', ()=>{
    let text = "Contact Us"
    const wrapper = shallowMount(ContactUs, {localVue});
    expect(wrapper.find('h2').text()).toContain(text);
       expect(wrapper.exists);
   })
});