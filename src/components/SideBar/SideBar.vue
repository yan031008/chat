<template>
    <div>
        <div class="son_center" @click.stop="is_show">
            <img :src="'http://127.0.0.1:8000/media/'+userimage" alt="" class="myimg">
        </div>
        <div 
        :class="{
            circle_rect:circle_rect_select1
        }" 
         class="son_center"
         @click="btn_select('message')"
         >
            <img src="../../assets/3.1 好友.png" alt="" style="width: 50px;height: 50px;"/>
        </div>
        <div :class="{
            circle_rect: circle_rect_select2
        }" 
        class="son_center" 
        @click="btn_select('friends')"
        >
            <img src="../../assets/添加.png" alt="" style="width: 50px;height: 50px;"/>
        </div>
        <div class="my_detail"  v-show="is_select" @click.stop="" style="z-index: 999;">
            <div class="my_flex">
                <div style="padding: 10px;">
                   <img :src="'http://127.0.0.1:8000/media/'+userimage" alt="" class="myimg">
                </div>
                <div style="padding: 10px;">
                    <div>账号:{{ tel_number }}</div>
                    <div>名称:{{ username }}</div>
                </div>
            </div>
            <div style="padding-bottom: 15px;">
                <el-button style="width: 250px;" @click="quit_login">退出登录</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref,defineExpose, onMounted} from "vue";
import { useRouter,useRoute } from "vue-router";
import axios from "@/axios/axios";

// import get_authorization from '../../cookie/cookie.js'
let router = useRouter()
let route = useRoute()
let is_select = ref(false)

let circle_rect_select1 = computed(() => {
    if (route.path == '/message')
        return true
    else
        return false;
});
let circle_rect_select2 = computed(() => {
    if (route.path == '/friends') {
        return true
    }
    else
        return false
});

let btn_select=(instance) => {
    if (instance =='message')
    {
        router.push('/')
    }
    else {
        router.push('/friends')
    }
}
let is_show = (outer) => {
    if (outer) {
         if (is_select.value == false) {
        is_select.value = true
    }
    else {
        is_select.value = false
     }
    }
    else is_select.value=false
   
}

let tel_number = ref()
let username = ref()
let userimage=ref()



onMounted(async () => {
    // get_authorization()
    let cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('Authorization=Bearer') != -1) {
            let cookie = cookies[i].split("=")[1].trim();
            axios.defaults.headers.common['Authorization'] = cookie;
        }
    }
    try {
        let data = await axios.get('get_myuser/')
        console.log(data)
        if (data.data instanceof Array) {
        tel_number.value = data.data[0].fields.tel_number
        username.value = data.data[0].fields.username
        userimage.value = data.data[0].fields.userimage
        }
       
    }
    catch(e) {
        console.log(e)
    }
    
    
})


let quit_login = () => {
    let expires_time=new Date()
    document.cookie = `Authorization=;expires=${expires_time.toUTCString()};`
    router.push('/login')
}
defineExpose({is_show,})
</script>
<style scoped>
.circle_rect{
    width: 100px;
    background-color: blue;
}
.son_center{
    height: 80px;
    line-height: 80px;
    cursor: pointer;
}
.myimg{
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.my_detail{
    width: 300px;
    height: 120px;
    position: absolute;
    left: 90px;
    top: 25px;
    border: 1px solid gray;
    background-color: white;
    display: flex;
    /* height: 100%; */
    flex-direction: column;
    justify-content: space-between;

}
.my_flex{
    display: flex;
    text-align: left;
}
</style>