import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router/router'
import {store} from './vuex/store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
