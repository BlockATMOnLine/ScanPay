import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n/i18n'
import router from './router'

const app = createApp(App)
app.use(router).use(i18n)
app.mount('#app')
