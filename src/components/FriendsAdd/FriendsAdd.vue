<template>
     <div class="flex" v-show="is_show">
        <div class="head_picture">
            <img :src='"http://127.0.0.1:8000/media/"+data.data.fields.userimage' alt="" style="width: 70px;height: 70px;">
        </div>
        <div class="middle">
            <div class="outer1">
                <div class="left ">
                    账号:{{data.data.fields.tel_number}}
                </div>
                <div class="left">
                    昵称:{{data.data.fields.username}}
                </div>
                
            </div>
            
        </div>
        <div class="right_add" style="display: flex;
        align-items: center;
        ">
                    <el-button @click="add_friend"
                    style="width: 40px;font-size: 12px;" 
                    >通过</el-button>
                     <el-button @click="reject_friend" class=""
                     style="width: 40px;font-size: 12px;" 
                     >拒绝</el-button>
                </div>
    </div>
</template>
<script setup>
import {
    defineProps,
    ref,
} from 'vue';
import axios from '@/axios/axios.js'
let data = defineProps(['data'])
let is_show=ref(true)
let add_friend = () => {
    let data1 = {
        is_agree: true,
        sender:data.data.pk
    }
    axios.post('agree_reject/', JSON.stringify(data1), {
        headers: {
            "content-type":'application/json'
        }
    }).then((reponse) => {
        if (reponse.data.message == '成功添加为好友')
        {
            // reject.value = false
            // agree.value=true
            is_show.value=false
    }
    })
        .catch(() => {
        console.log("请求失败")
    })
}

let reject_friend = () => {
     let data1 = {
        is_agree: false,
        sender:data.data.pk
    }
    axios.post('agree_reject/', JSON.stringify(data1), {
        headers: {
            "content-type":'application/json'
        }
    }).then((response) => {
        console.log(response)
        if (response.data.message == "拒绝添加好友") {
              is_show.value=false
        }
    }).catch(() => {
        console.log("未知错误")
    })
}
</script>
<style scoped>
img{
    border-radius:50px ;
}
.head_picture{
    width: 100px;
    height: 100px;
    padding-left:10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.middle{
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.flex{
    width: 400px;
    display: flex;
    font-size: 12px!important;
}
.flex:hover{
    background-color: rgb(204, 204, 204);
}
.left{
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 20px;
}
.outer1{
    width: 200px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content:center;
}
.time{
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
}
.outer2{
    width: 100px;
    height: 70px;
    padding-right: 10px;
    text-align: right;
}
.right_add{
height: 100px;
line-height: 100px;
width: 100px;
}

</style>