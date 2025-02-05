import {
    createRouter,
    createWebHistory,
} from "vue-router"
import message_page from '../components/message_page/message_page.vue'
import friends_detail from '../components/friends_detail/friends_detail.vue'
import MyHome from "@/components/MyHome/MyHome.vue"
import LoginPage from '../components/LoginPage/LoginPage.vue'
import SginIn from '../components/sign_in/SignIn.vue'

import axios from "../axios/axios"


const is_authtication = async () => {
    let cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('Authorization=Bearer')!= -1) {
            let cookie = cookies[i].split("=")[1].trim();
            axios.defaults.headers.common['Authorization'] = cookie;
        }
    }
    let myuser;
    try {
        let is_auth = await axios.get('/get_myuser/')
        if (is_auth.data instanceof Array) {
            myuser = {
                is_auth: true,
                data: is_auth.data
            }
            return myuser
        } else {
            myuser = {
                is_auth: false,
                data: null
            }
            return myuser
        }
    }
    catch {
         myuser = {
             is_auth: false,
             data: null
         }
         return myuser
    }
   
}

const routes = [{
        path: '/',
        async beforeEnter() {
            let is_auth = await is_authtication()
            if (is_auth.is_auth) {
                
                return true
            }
            else {
                console.log("未登录")
                return {path: "/login"}
            }
            
        },
        redirect: '/message',
        component: MyHome,
        children: [{
                path: "message",
                component: message_page
            },
            {
                path: 'friends',
                component: friends_detail
            }
        ],

    },
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/sign",
        component: SginIn
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router