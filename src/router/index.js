import Vue from 'vue'
import Router from 'vue-router'
import Web from '../components/web/Web.vue';
// import Web from '@/components/web/Web.vue'
import Login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Web
    },
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
    	path: '/signup',
    	name: 'Login',
    	component: Login
    }
  ]
})
