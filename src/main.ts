import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import DataVVue3 from '@kjgl77/datav-vue3'

const app = createApp(App)
app.use(router).use(pinia).use(DataVVue3).mount('#app')
