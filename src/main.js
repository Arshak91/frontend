// import { Vue } from 'vue'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue'

const app = createApp(App)

app.config.productionTip = false
app.use(router)
app.use(store)

app.mount('#app')
