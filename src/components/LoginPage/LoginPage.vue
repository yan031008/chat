<template>

  <div class="div">
    <el-form class="form"
    :model="login_data"
    :rules="rules"
    >
     <el-form-item 
      label="账号:"
      style="width: 200px;"
      prop="tel_number"
      >
         <el-input style="height: 30px;"
         v-model="login_data.tel_number"
         type="text"></el-input>
     </el-form-item>
     <el-form-item 
     style="width: 200px;" 
     label="密码:"
     prop="password"
    
     >
          <el-input type="password" style="height: 30px;"
          v-model="login_data.password"
          ></el-input>
     </el-form-item>
     <el-from-item style="width: 200px;display: flex;">
          <el-button @click="debound">登录</el-button>
          <el-button @click="sign">注册</el-button>
     </el-from-item>
   </el-form>
  </div>
    
   
</template>
<script setup>
// import { sign } from 'core-js/core/number';
import axios from '@/axios/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Qs from 'qs'
import {ElMessageBox} from 'element-plus'
// import type { Action } from 'element-plus'

let login_data = ref({
  tel_number: '',
  password:''
})
let router =useRouter()
let validator_tel_number = (rule,value,callback) => {
  let positive = /\D/
  let is_pass = positive.test(value)
  if (is_pass)
  {
  callback(new Error('账号只能含有数字'))
  } {
    callback()
  }
 
}
let rules = ref({
  tel_number: [
    {
      validator: validator_tel_number,
      trigger: 'blur',
      message:'账号是一串数字'
    },
    {
      required: true,
      message: '账号未填写',
      trigger:'blur'
    }
  ],
  password: [
            {required:true,
            message: '密码未填写',
            trigger:'blur'
             },
             {
              type: 'string',
              message: '密码应该是一串字符串',
              trigger:'blur'
             }
    ]
})
let sign=() => {
  router.push('/sign')
}
//定时器
let time=ref(1)

// 防抖函数
let debound=()=>{
  clearTimeout(time.value)
  time.value=setTimeout(() => {
    console.log(1)
    login()
  }, 1000); 
}


let login =() => {
  const form_data = {}
  // console.log(login_data.value)
  form_data.tel_number = login_data.value.tel_number
  form_data.password = login_data.value.password
  console.log(form_data)
  axios.post('token/', Qs.stringify(form_data), {
    Headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => {
    let current_time = new Date().getTime();
    let expires_time = new Date(current_time + 1000 * 60 * 60 * 24)
    console.log(response)
    document.cookie = `Authorization=Bearer ${response.data.access};expires=${expires_time.toUTCString()};`
    router.push('/')
  }).catch((e) => {
    console.log(e)
    ElMessageBox.alert('密码或账号错误,请重新输入', '提示', {
      confirmButtonText: '确认',
      callback: () => {
        
      }
    })
  })
}
</script>
<style scoped>
.form{
  width: 300px;
  height: 200px;
  /* border-radius: 20px; */
  background-color:#0EC1E2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.div{
/* width: ; */
height: 100vh;
min-height: 200px;
min-width: 300px;
background-image:url('../../assets/背景图片.jpg');
background-repeat: no-repeat;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
}
</style>