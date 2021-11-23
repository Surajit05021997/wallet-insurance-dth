import { shallowMount, createLocalVue } from '@vue/test-utils';
import BuyPlans from '@/views/BuyPlans.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: BuyPlans
      }
]

const router = new VueRouter({
    routes
})

describe('BuyPlans.vue', ()=>{
   it('renders', ()=>{
       const text = 'Enter your details';
       const wrapper = shallowMount(BuyPlans, {localVue, router});
       expect(wrapper.find('p').text()).toMatch(text);
       expect(wrapper.exists);
   })
});