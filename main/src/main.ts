import './assets/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import WujieVue from 'wujie-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(WujieVue)

app.mount('#app')
