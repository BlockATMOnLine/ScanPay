import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: '/',
    name: 'Main',
    component: () => import('@/views/main')
},{
    path: '/generateOrder',
    name: 'GenerateOrder',
    component: () => import('@/views/debug/generateOrder')
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
