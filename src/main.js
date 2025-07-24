import './assets/main.css'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/favorites', component: Favorites }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
