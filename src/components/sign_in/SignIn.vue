<template>
  <div style="width: 100vw;height: 100vh;min-width: 510px;min-height: 460px;" class="sign_bj">

  
  <div style="display: flex;justify-content: center;align-items: center;height: 100vh;min-height: 460px;min-width: 510px">
 <div style="background-color: white;width: 500px;height: 450px;width: 500px;" class="inner_img">
<el-form  label-width="auto" 
 style="max-width: 600px;padding-right: 200px;padding-left: 20px;padding-top: 10px;"
 :model="form"
 ref="el_form"
 >
    <el-form-item label="头像:" prop="fileList">
      <el-upload
      ref="upload"
      action="http://localhost:8000/"
      :auto-upload="false"
      :limit="1"
      :on-exceed="exceed_handler"
     
      v-model:file-list="fileList"
    class="avatar-uploader"
   
  >
    <img v-if="imgurl" :src="imgurl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="账号:" prop="tel_number">
      <el-input  v-model="form.tel_number"/>
    </el-form-item>
     <el-form-item label="名称:" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
     <el-form-item label="密码:" prop="password">
      <el-input  v-model="form.password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sign_in">注册</el-button>
      <el-button @click="sign">取消</el-button>
    </el-form-item>
  </el-form>   
  </div>
  </div>
 </div>
 
</template>
<script setup>
import { ref } from 'vue';
import { genFileId } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from '../../axios/axios.js'
import { useRouter } from 'vue-router'
import {ElMessageBox} from 'element-plus'
// import { sign } from 'core-js/core/number';

let imgurl = ref(null)
let upload = ref(null)
let fileList = ref([])
let router=useRouter()
let form = ref({
  // userimage,
  username: '',
  tel_number: '',
  password:'',
})
let el_form=ref(null)
let exceed_handler = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}
let sign_in = () => {
  const formdata = new FormData()
  try {
     if (fileList.value[0].raw) {
  formdata.append('userimage',fileList.value[0].raw)
  }
  }
  catch {
    console.log()
  }
 
  formdata.append('username', form.value.username)
  formdata.append('tel_number', form.value.tel_number)
  formdata.append('password', form.value.password)
  axios({
    method:'POST',
    url:'/sign_in/',
    Headers: {
      'content-type':'multipart/form-data'
    },
    data:formdata
  }).then((response) => {
    // console.log(response)
    if (response.data == '注册成功!') {
      ElMessageBox.alert('注册成功', '提示', {
        confirmButtonText:'确认',
      })
      router.push('/login')

    }
    else {
      ElMessageBox.alert('参数错误', '提示', {
        confirmButtonText:'确认',
      })
     }
  }).catch(() => {
    ElMessageBox.alert('注册失败', '提示', {
        confirmButtonText:'确认',
      })
  })

}
let sign = () => {
  router.push('/login')
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.sign_bj{
  background-image: url('../../assets/背景图片.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.inner_img{
  background-image: url('../../assets/小背景.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>