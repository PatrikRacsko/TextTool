import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import routes from './router/routes'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(createPinia()).mount('#app')

