<template>
    <div class="flex">
        <div class="head_picture">
            <img :src='"http://127.0.0.1:8000/media/"+data.data.fields.userimage' alt="" style="width: 70px;height: 70px;">
        </div>
        <div class="middle">
            <div class="outer1">
                <div class="left ">
                    {{ data.data.fields.username }}
                </div>
            </div>
        </div>
        <div class="time">
            <div class="outer2">
                <div>
                {{ time }}
                </div>
                <div style="flex: 1;text-align: right;padding-top: 35px;" v-show="message" >
                    <div style="width: 10px;height: 10px;background-color: red;border-radius: 5px;display: inline-block;"></div>
                </div>
            </div>
            
        </div>
           
    </div>
</template>
<script setup>
import { ref,defineProps,  } from "vue"; 
// let username = ref('超级泡泡糖')
// let message = ref("欢迎来到新世界!!!")
let time = ref("2025年12月31日")
let data = defineProps(['data',])
// onBeforeMount(() => {
//     console.log(data.data)
// })
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
}
.outer1{
    width: 200px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
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
    display: flex;
    flex-direction: column;

}

</style>