import { createApp } from 'vue'
import App from './App.vue'
import myUi from './components'
import './assets/styles/index.scss'


createApp(App).use(myUi).mount('#app')
