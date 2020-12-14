import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dash-board',
            components: Dashboard
        }
    ]
})