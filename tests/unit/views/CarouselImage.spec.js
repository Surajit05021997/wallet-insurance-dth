import { shallowMount, createLocalVue } from '@vue/test-utils';
import CarouselImage from '@/views/CarouselImage.vue';

const localVue = createLocalVue();

describe('CarouselImage.vue', ()=>{
   it('renders', ()=>{
       const wrapper = shallowMount(CarouselImage, {localVue});
       expect(wrapper.exists);
   })
});