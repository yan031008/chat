<template>
    <div class="middle_father">
        <div id="middle">
            <div style="height: 50px;width: 400px;background-color: gray;line-height: 50px;">
                <el-input v-model="input" style="width: 240px" placeholder="请输入搜索的账号"  class="xiachen"/>
                <el-button @click="get_user">搜索</el-button>
            </div>
            <!-- <FriendsList></FriendsList> -->
             <div style="width: 400px;text-align: center;padding-top: 10px;" @click="get_user" 
             v-show="!is_show && input"
             >
            <div style="text-align: left;width: 390px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;height: 80px;background-color: aqua;border-radius: 10px;padding: 10px;line-height: 60px;font-size: 20px;">搜索账号:{{ input }}</div>
             </div>
             <FriendsList v-for="(item,index) in users" :key="index" :data="item"></FriendsList>
             <el-collapse v-model="activeNames" @change="handleChange" style="width: 400px;">
               <el-collapse-item title="好友申请" name="1">
                  <FriendsAdd v-for="(item,index) in friends_applys" :key="index" :data="item"></FriendsAdd>
                </el-collapse-item>
             </el-collapse>
             
        </div>
      </div>
      <div id="right" class="">
        
      </div>
</template>
<script setup>
import axios from '@/axios/axios';
import { onBeforeMount, ref, } from 'vue';
import get_authorization from '../../cookie/cookie.js'
import FriendsList from '../FriendsList/FriendsList'
import { ElMessageBox } from 'element-plus';
import FriendsAdd from '../FriendsAdd/FriendsAdd'
let input = ref()
let is_show = ref()

let users=ref()
let get_user = () => {
  get_authorization()
  axios.get(`/get_user/?search_tel_number=${input.value}`,).then((result) => {
    console.log(result)
    if (result.data instanceof Array) {
      users.value = result.data
      is_show.value = true
    }
    else {
      ElMessageBox.alert('用户不存在', '提示', {
        confirmButtonText:'确认',
      })
    }
  }).catch((error) => {
    users.value=[]
    console.log(error)
    ElMessageBox.alert('用户不存在', '提示', {
        confirmButtonText:'确认',
      })
  })
}

let friends_applys = ref([])
onBeforeMount(async() => {
  get_authorization()
  try {
    let data = await axios.get('get_friend_apply/')
    if (data.data instanceof Array) {
      friends_applys.value = data.data
    }
  }
  catch {
    console.log("未知错误")
  }
})
</script>
<style scoped>
.middle_father{
  width: 400px;
  height: 100%;
  overflow: hidden;
}
#middle{
  width: 430px;
  height: 100%;
  overflow-y: auto;
}
#right{
    flex: 1;
    height: 100%;
    min-width: 500px;
    background-color: rgb(230, 214, 214);
}
.xiachen{
  z-index: 1;
}
</style>