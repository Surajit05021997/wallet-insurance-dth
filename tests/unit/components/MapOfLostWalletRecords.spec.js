import { shallowMount, createLocalVue } from '@vue/test-utils';
import MapOfLostWalletRecords from '@/components/MapOfLostWalletRecords.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: MapOfLostWalletRecords
      }
]

const router = new VueRouter({
    routes
})

describe('MapOfLostWalletRecords.vue', ()=>{
    let actions;
    let store;
    beforeEach(()=>{
        actions = {
            getCustomerDetailsAction: jest.fn(),
        }
        store = new Vuex.Store({
            actions
        })
    })
   it('renders', ()=>{
       const wrapper = shallowMount(MapOfLostWalletRecords, {store, localVue, router});
       expect(wrapper.exists);
   }) 
});