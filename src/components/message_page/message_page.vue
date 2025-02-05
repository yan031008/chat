<template>
    <div class="middle_father">
        <div id="middle">
          <MessageeList v-for="(item,index) in data" :key="index" :data="item"
          @click="chat(item)" :messages="message" :current_messages="current_messages"
          >

          </MessageeList>
        </div>
      </div>
      <div id="right" class="chat_bg">
        <ChatWindow v-show="is_show" :socket="socket" :current_messages="current_messages" v-if="is_reload">

        </ChatWindow>
      </div>
</template>
<script setup>
import MessageeList from '../MessageList/MessageeList'
import ChatWindow from '../ChatWindow/ChatWindow'
import socket_create from '../../websocket/websocket.js'
import {
  onBeforeMount, 
   onMounted, 
  ref,
  onBeforeUnmount
  
} from 'vue'

import axios from '../../axios/axios.js'
import get_authorization from '../../cookie/cookie.js'
import bus from '../../bus/bus.js'

// let index=ref(0)

let chat = (item) => {
  console.log(typeof message)
  is_reload.value=true
  bus.emit('chat_window', { item: item, message: message })
  is_show.value = true
  // is_reload.value=true
}


let is_show=ref(false)

let data=ref([])
onBeforeMount(async() => {
  console.log(123)
  get_authorization()
  try {
    let data1 = await axios.get('get_friends/')
    if (data1.data instanceof Array) {
      console.log(data1.data)
    data.value=data1.data      
    }
    else {
      console.log()
    }
    }
  catch {
    console.log("未知错误")
  }
 
})

let socket=ref()
let messages = ref([])
let current_messages=ref([])
let message = (sender_id) => {
  let data = []
  console.log(messages.value)
  for (let i = 0; i < messages.value.length; i++){
    if (sender_id == messages.value[i].sender_id) {
      data.push(messages.value[i])
    }
  }
  // console.log(data)
  return data
}
let cishu = ref(1)
let message_handle = (e) => {
  // console.log(typeof e.data)
  // // messages.value.push(JSON.parse(e.data).message) 
  if (cishu.value == 1) {
    for (let i = 0; i < JSON.parse(e.data).message.length; i++) {
      messages.value.push(JSON.parse(e.data).message[i])
    }
    cishu.value++
  }
  else {
    console.log(e.data)
    // for (let i = 0; i < JSON.parse(e.data).message.length; i++) {
    current_messages.value.push({ message: (JSON.parse(e.data).message), sender:(JSON.parse(e.data).sender)})
    // }
  }
}



let error_handler = (e) => {
  console.log(e)
};


onMounted(async () => {
  let cookies = document.cookie.split(";")
    let cookie=null;
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('Authorization=Bearer') != -1) {
            cookie = cookies[i].split("=Bearer")[1].trim();
            break;
        }
    }
    socket.value = await (socket_create(cookie,message_handle,error_handler)())
})

onBeforeUnmount(() => {
  console.log("执行销毁")
  socket.value.close()
})



let is_reload=ref(false)
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

.chat_bg{
  background-image: url("@/assets/window_chat.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>