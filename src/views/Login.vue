<template>
  <div class="container">
    <div class="login-card">
      <div class="login-img">
        <p class="img-des">Nice to see you again</p>
        <p class="img-heading">WELCOME BACK</p>
      </div>
      <div class="login-field">
        <p class="field-des">Login Account</p>
        <form class="login-form" @submit.prevent="authenticate">
          <div style="display-flex">
            <div class="radio-toolbar" id="loginType">
              <div v-for="(option, index) in loginType" :key="index" class="m-1">
                <input type="radio" class="form-check-input btn-text-1_5rem" name="loginType" :value="option.value" :id="option.value" v-model="selectedLoginType" @change="getSelectedLoginType()">
                <label class="mx-0_5rem form-check-label btn-text-1_5rem" :for="option.id">{{option.value}}</label>
              </div>
            </div>
          </div>
           
          <p class="invalid" v-if="isInvalid">Your username or password is incorrecct.</p>
          <input type="text" placeholder="Username" v-model="username">
          <input type="password" placeholder="Password" v-model="password">
          <div class="remember-user">
            <input type="checkbox">
            <label>Remember username</label>
          </div>
          <button class="btn">LOGIN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getCustomerService, getEmployeeService, postLoginType } from '@/service/service.js';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isInvalid: false,
      loginType: []
    }
  },created(){
    this.initialiseValues();
  },
  methods: {
    initialiseValues() {
     this.loginType = [
        {
          loginId: '11',
          value: 'Employee'
        },
        {
          loginId: '12',
          value: 'Customer'
        },
     ];
     this.selectedLoginType = 'Customer';
    },
    ...mapActions(['setLoginStatusAction', 'setLoggedInUserAction']),
    async authenticate() {
      let customerList;
      // await deleteLoginType(1);
      await postLoginType({"loginType": this.selectedLoginType});
      if (this.selectedLoginType === 'Employee') {
        customerList = await getEmployeeService();
      } else {
        customerList = await getCustomerService();
      }
      const requiredCustomer = customerList.find(element => element.username === this.username);
      if(requiredCustomer && requiredCustomer.password === this.password) {
        this.setLoginStatusAction(true);
        this.setLoggedInUserAction(this.username);

        sessionStorage.setItem("loggedInUsername", this.username);
        
        this.$router.push({
          name: 'Dashboard',
          params: {
            username: this.username,
          }
        });
      } else {
        this.isInvalid = true;
      }
      this.username = '';
      this.password = '';
    },

    getSelectedLoginType() {
      let selectedLogin = document.querySelector('input[name="loginType"]:checked').value;
      this.selectedLoginType = selectedLogin;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 120rem;
  margin: 5rem auto;
  padding: 0 2rem;
}
.radio-toolbar, .d-flex {
  display: flex;
}
.m-1{
  margin: 8px;
}
.mx-0_5rem{
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.mx-1rem{
  margin-left: 1rem;
  margin-right: 1rem;
}

.btn-text-1_5rem{
  font-size: 1.5rem
}
.login-card {
  max-width:80rem;
  margin: 5rem auto;
  height: 50rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.login-img {
  background: url('../assets/login-img.jpg');
  background-size: 400px 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.login-img a {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
}
.img-des {
  font-size: 2rem;
  color: #fff;
}
.img-heading {
  font-size: 4rem;
  color: #fff;
}
.login-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}
.field-des {
  font-size: 3rem;
  color: #007fff;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}
.login-form input {
  font-size: 1.5rem;
  border: none;
  border-left: 4px solid #007fff;
  border-radius: 2px;
  background-color: #eee;
  padding-left: 5px;
}
.remember-user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
}
.btn {
    background-color: #007fff;
    padding: 0 2rem;
    margin: 2rem;
    margin-left: 0;
    text-decoration: none;
    border-style: none;
    border-radius: 20rem;
    font-size: 2rem;
    color: #fff;
  }
  .btn:hover {
    cursor: pointer;
    background-color: #fff;
    color: #000;
    box-shadow: inset 0 0 0 0.2rem #007fff;
  }
  .invalid {
    color: red;
    font-size: 1.5rem;
  }
@media screen and (max-width: 768px) {
  .login-card {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .login-img {
    width: 100%;
  }
}
.login-type {
  display:flex;
}
</style>