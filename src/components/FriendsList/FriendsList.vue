<template>
     <div class="flex">
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
        <div class="right_add">
                    <el-button @click="add_friend">{{ btn_text}}</el-button>
                </div>
        <!-- <div class="time"> -->
            <!-- <div class="outer2">
                {{ time }}
            </div> -->
        <!-- </div> -->
    </div>
</template>
<script setup>
import {  computed, defineProps, ref, watch,} from 'vue';
import axios from '@/axios/axios.js'
import { ElMessageBox } from 'element-plus';
// let username = ref("执酒误泡泡糖")
let data = defineProps(['data'])
let add_friend = () => {
    console.log(data.data)
    if (btn_text.value == '通过') {
        return
    }
    else if (btn_text.value == '等待通过') {
        return 
    }
    let data1 = JSON.stringify({
        "receiver":data.data.pk
    })
    axios.post('/add_friend/', data1, {
        headers: {
            "content-type":"application/json"
        }
    }).then((result) => {
        console.log(result)
        if (result.data.message == '不能自己添加自己') {
            ElMessageBox.alert('自己添加自己,你是2b吗', '提示', {
        confirmButtonText:'确认',
      })
            return
        }
        relate.value = true;
        sender_or_receive.value="sender"
        
    }).catch(() => {
        ElMessageBox.alert('未知错误', '警告', {
        confirmButtonText:'确认',
      })
    })
}
// let is_relate = ref()
let sender_or_receive = ref()
let relate = computed(() => data.data.is_relate)
let sender_receive=computed(()=>data.data.sender_or_receive) 
// watch(relate, (newvalue)=> {
//     is_relate.value=newvalue
// }, {
//     immediate:true
// })
watch(sender_receive, (newvalue) => {
    sender_or_receive.value=newvalue
},{
    immediate:true
})
let btn_text = computed(() => {
    if (!relate.value) {
        if (sender_or_receive.value == "sender")
        {
        return "等待通过"
        }
        else if (sender_or_receive.value == 'receiver') {
        return "通过"
        }
        else return'添加好友'
    }
        return "详情"
})
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
}

</style>