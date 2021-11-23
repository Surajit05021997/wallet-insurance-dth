import { shallowMount, createLocalVue } from '@vue/test-utils';
import PaymentCard from '@/components/PaymentCard.vue';

const localVue = createLocalVue();

describe('PaymentCard.vue', ()=>{
   it('renders', ()=>{
       const bank = 'Axis Bank';
       const cardNumber = '9876543210987654'
       const wrapper = shallowMount(PaymentCard, {localVue,
        propsData: {bank, cardNumber}
    });
       expect(wrapper.find('h2').text()).toMatch(bank);
       expect(wrapper.exists);
   }) 
});