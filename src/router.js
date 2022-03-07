import { createRouter, createWebHistory } from 'vue-router'
import PickData from './components/PickData'
import Details from './components/Details'

export default createRouter({
    routes: [
        { path: '/', component: PickData, name: 'data' },
        { path: '/details/:id', component: Details, name: 'details' }
    ],
    history: createWebHistory()
})