import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/router'
import { VueQueryPlugin, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'

const app = createApp(App)

const queryClient = new QueryClient()

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
}

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
