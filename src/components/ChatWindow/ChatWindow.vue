<template>
    <div class="flex_window_chat">
        <div class="top">
            {{username}}
        </div>
        <div class="window" ref="window">
            <!-- <div class="hidden_outer"> -->

            <!-- 上线后得到的积压信息 -->
            <div  v-for="(item,index) in data" :key="index" class="left_flex_window">
                <div class="padding">
                    <img :src='"http://127.0.0.1:8000/media/"+userimage' alt="">
                </div>
                <div class="window_message" style="background-color: white;">
                   {{ item
                .message }}
                </div>
            </div>

            <!-- 在线时和好友互发信息 -->
            <div v-for="(item,index) in total_message" :key="index">

             <!-- 对方发送的信息 -->
             <div  v-show="item.current_messages" class="left_flex_window">
                <div class="padding">
                    <img :src='"http://127.0.0.1:8000/media/"+userimage' alt="">
                </div>
                <div class="window_message" style="background-color: white;">
                   {{item.current_messages}}
                </div>
            </div>


            <!-- 自己发送的信息 -->
            <div class="right_flex_window" v-show="item.sender">
                <div class="window_message">
                    {{item.sender}}
                </div>
                <div class="padding">
                    <img src="../../assets/头像.jpg" alt="">
                </div>
            </div>

            </div>

        </div>
        <div class="base">
            <div class="base_text">
                <textarea name="" id="" class="text" v-model="message"></textarea>
            </div>
            <div class="base_button">
                <button class="button" @click="send_message">发送</button>
            </div>
        </div>
    </div>    
</template>
<script setup>
import { ElMessageBox } from 'element-plus';
import { onUnmounted, ref ,defineProps, watch, onUpdated, onBeforeMount} from 'vue';
import bus from '../../bus/bus.js'
// import { resolve } from 'core-js/fn/promise';
// import { turn } from 'core-js/core/array';


let username=ref()
let userimage = ref()

let userid=ref()
let data=ref([])
const props = defineProps(['socket', 'current_messages'])

let messages = ref([])

let message = ref()

// let middle = ref([])
// let middle_index = 0
// let middle=[]

// let current_messages_handler = computed(() => {
//     if (middle_index
//         == 0
//     ) {
//         for (let i = 0; i < props.current_messages.length; i++) {
//             if (props.current_messages[i].sender == userid.value) {
//                 middle.push({ message: props.current_messages[i].message })
//             }
//         }
//         middle_index+=1
//     }
//     else {
//         if (props.current_messages[length - 1].sender == userid.value) {
//             middle.push({message:props.current_messages[length-1].message})
//         }
//     }
//     return middle
// })




// 获取的是聊天窗口的滚动条
let window=ref(null)

let total_message = ref([])


let watch_messages=(newvalue) => {
    console.log(total_message.value)
    if (messages.value.length == 0) {
        return
    }
    total_message.value.push({sender:newvalue[newvalue.length-1].message})
}

onUpdated(()=>{
    // 监听总的消息变化，一旦有信息来到，滚动条立即到最后一个信息的位置
    window.value.scrollTop=window.value.scrollHeight-window.value.offsetHeight
})

watch(messages, watch_messages, {
    // immediate: true,
    deep:true
})

watch(userid, (newvalue) => {
    total_message.value = []
    messages.value = []
    index.value==0
    if (index.value == 0) {
        for (let i = 0; i < props.current_messages.length; i++) {
            if (props.current_messages[i].sender == newvalue) {
                total_message.value.push({ current_messages: props.current_messages[i].message })
            }
            // console.log(total_message.value)
        }
        if (newvalue != undefined) {
        index.value=1
        }
    }
    else {
        if (props.current_messages.length == 0) {
            return
        }
        // console.log(newvalue.current_messages)
        if (props.current_messages[props.current_messages.length - 1].sender == newvalue) {
            total_message.value.push({ current_messages: props.current_messages[props.current_messages.length-1].message })
        }
    }
},)



let send_message = () => {
    // console.log(message.value)
    if ((message.value == undefined) || (message.value.toString().trim() == '')) {
        ElMessageBox.alert("发送内容不能为空", "提示")
        return;
    }
    else {
            props.socket.send(JSON.stringify({
            receiver: userid.value,
            message: message.value
            }))
        messages.value.push({ message: message.value })
        message.value=''
       
    }
}


let index=ref(0)

let watch_props=(newvalue) => {
    if (index.value == 0) {
        for (let i = 0; i < newvalue.current_messages.length; i++) {
            if (newvalue.current_messages[i].sender == userid.value) {
                total_message.value.push({ current_messages: newvalue.current_messages[i].message })
            }
            // console.log(total_message.value)
        }
        if (userid.value != undefined) {
        index.value=1
        }
    }
    else {
        if (newvalue.current_messages.length == 0) {
            return
        }
        console.log(newvalue.current_messages)
        if (newvalue.current_messages[newvalue.current_messages.length - 1].sender == userid.value) {
            total_message.value.push({ current_messages: newvalue.current_messages[newvalue.current_messages.length-1].message })
        }
    }
}

let render = ({ item, message })=> {
    // data.value=[]
    // total_message.value=[]
    userimage.value = item.fields.userimage
    username.value = item.fields.username
    userid.value = item.pk
    console.log(userid.value,username.value)
    data.value = message(item.pk)
}

watch(props,watch_props, {
    // immediate: true,
    deep:true
})

onBeforeMount(async () => {
    console.log(props.current_messages)
    bus.on("chat_window", render)
    
})

onUnmounted(() => {
    bus.off('chat_window',render)
})

</script>
<style scoped>
.flex_window_chat{
 min-height: 700px;
 overflow: hidden;
}
.top{
    height: 50px;
    line-height: 30px;
    border-bottom: 1px solid white;
    padding: 10px;
    text-align: left;
    vertical-align: bottom;
}
.window{
    min-width: 515px;
    width: calc(100% + 15px);
    min-height: 450px;
    height: calc(100vh - 250px); 
    overflow: hidden;
    overflow-y: auto;
}
/* .hidden_outer{
    min-width: 530px;
    width: calc(100% + 15px);
} */
.base{
    height:200px;
    border-top: 1px solid white;
    background-color: rgb(62, 119, 225);
}
img{
    width: 60px;
    height: 60px;
    border-radius: 30px;
}
.left_flex_window{
    display: flex;
    height: 100px;
    align-items: center;
    text-align: left;
}
.right_flex_window{
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: right;
    text-align: left;
}
.window_message{
   /* flex: 0.9; */
   padding: 10px;
   border-radius: 10px;
   background-color: greenyellow;
   overflow: hidden;
   white-space: normal;
   word-wrap: break-word;
}
.padding{
    padding-left: 10px;
    padding-right: 10px;
}
.base_text{
    width: 100%;
    height: 70%;
    padding-top: 4px;
    padding-left: 10px;
    /* height: ; */
}
.text{
    width: 100%;
    height: 100%;
    background-color: rgb(62, 119, 225);
    border: none;
    outline: none;
    color: black;
    overflow-y: hidden;
}
.base_button{
    width: 100%;
    height: 30%;
    line-height: 50px;
    text-align: right;
    padding: 5px;
}
.button{
    line-height: 30px;
    /* vertical-align: middle; */
    height: 40px;
    width: 80px;
    border: 4px solid rgba(0, 221, 255, 0.822);
    border-radius:4px;
    background-color: rgba(0, 221, 255, 0.822);

}
.button:hover{
    background-color: rgb(227, 227, 227);
    border-color: rgb(227, 227, 227);
}
</style>