import { shallowMount, createLocalVue } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Login
      }
]

const router = new VueRouter({
    routes
})

describe('Login.vue', ()=>{
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
       const wrapper = shallowMount(Login, {store, localVue, router});
       expect(wrapper.exists);
   }) 
});