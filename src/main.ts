import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import '@/store/characters.store'

import './assets/main.css'

const app = createApp(App)

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60, // 1 minute
        refetchOnReconnect: 'always',
        retry: 0
      },
    }
  }
})

app.use(router)

app.mount('#app')
