<template>
    <div class="login">
       登录
       <van-form @submit="onSubmit">
           <van-field
               v-model="username"
               name="用户名"
               label="用户名"
               placeholder="用户名"
               :rules="[{ required: true, message: '请填写用户名' }]"
           />
           <van-field
               v-model="password"
               type="password"
               name="密码"
               label="密码"
               placeholder="密码"
               :rules="[{ required: true, message: '请填写密码' }]"
           />
           <div style="margin: 4.2667vw;">
               <van-button round block type="info" native-type="submit">提交</van-button>
           </div>
       </van-form>
    </div>
   </template>
    
   <script>
   import { encryptDes } from '@/utils/des.js'
   import md5 from 'js-md5'
   import { mapActions } from 'vuex'
   
   export default {
    name: 'Login',
    data () {
       return {
           username:'',
           password:''
       }
    },
    methods:{
        ...mapActions(['getMenuList']),
       onSubmit(){
        const _this = this
       }
    }
   }
   </script>
    
   <style scoped lang = "scss">
    .login{
       font-size:12px;
    }
   </style>