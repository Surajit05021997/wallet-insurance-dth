import { shallowMount, createLocalVue } from '@vue/test-utils';
import SocialMedia from '@/components/SocialMedia.vue';

const localVue = createLocalVue();

describe('SocialMedia.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(SocialMedia, {localVue});
       expect(wrapper.exists);
   })
});