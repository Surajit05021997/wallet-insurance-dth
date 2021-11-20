<template>
<div>
  <input type="checkbox" id="check"> 
  <label class="chat-btn" for="check">
  <close-icon-svg class="close"></close-icon-svg>
  <chat-icon-svg class="comment"></chat-icon-svg>
  </label>
<div class="wrapper">
    <div class="header">
        <h6>Let's Chat - Online</h6>
    </div>
    <div class="sub-header text-center p-2"> <span>Please fill out the form to start chat!</span> </div>
    <div class="chat-form"> <input type="text" class="form-control" placeholder="Name"> <input type="text" class="form-control" placeholder="Email"> <textarea class="form-control" placeholder="Your Text Message"></textarea> <button class="btn btn-success btn-block font-size">Submit</button> </div>
</div>
</div>
</template>

<script>
import ChatIconSvg from './ChatIconSvg.vue';
import CloseIconSvg from './CloseIconSvg.vue';
export default {
  components: { CloseIconSvg, ChatIconSvg },
  name : 'ChatPopup',
  data(){
    return {
    }
  }
}
</script>

<style scoped>
.chat-btn {
    position: fixed;
    right: 14px;
    bottom: 30px;
    cursor: pointer
}

.chat-btn .close {
    display: none
}

#check:checked~.chat-btn .comment {
    display: none
}

#check:checked~.chat-btn .close {
    display: block
}

.chat-btn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: #fff;
    color: #fff;
    font-size: 22px;
    border: none
}

.wrapper {
    position: fixed;
    right: 20px;
    bottom: 100px;
    width: 300px;
    background-color: #fff;
    border-radius: 5px;
    opacity: 0;
    transition: all 0.4s;
    border: black 1px solid;
}

#check:checked~.wrapper {
    opacity: 1
}

.header {
    padding: 13px;
    background-color: blue;
    border-radius: 5px 5px 0px 0px;
    margin-bottom: 10px;
    color: #fff;
}

.header h6, .sub-header, .font-size {
  font-size: 1.5rem;
}

.chat-form {
    padding: 15px
}

.chat-form input,
textarea,
button {
    margin-bottom: 10px
}

.chat-form textarea {
    resize: none
}

.form-control{
  font-size: 1.5rem;
}

.form-control:focus,
.btn:focus {
    box-shadow: none
}

.btn,
.btn:focus,
.btn:hover {
    background-color: blue;
    border: blue
}

#check {
    display: none !important
}
</style>

