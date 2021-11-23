import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppSidebar from '@/views/AppSidebar.vue';
import Login from '@/views/Login.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [
    {
        path: '/login',
        component: Login
      }
]

const router = new VueRouter({
    routes
})

describe('AppSidebar.vue', ()=>{
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
       const wrapper = shallowMount(AppSidebar, {store, localVue, router});
       expect(wrapper.exists);
   })
});