// src/main.ts

import { createApp, onMounted } from 'vue'
import App from './App.vue'
import router from './router'
import  './style.scss'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config' // Assuming you're using PrimeVue for UI components
// import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
// import 'primevue/resources/primevue.min.css'; // Core CSS
// import 'primeicons/primeicons.css'; // Icons
const app = createApp(App)
const pinia = createPinia()
onMounted(() => {
})
app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.mount('#app')
