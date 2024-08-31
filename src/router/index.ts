import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login/Login.vue';
import Cobros from '@/views/Cobros/Cobros.vue';
import CobrosTable from '@/views/Cobros/CobrosTable.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Cobros
  },
  {
    path: '/cobros-details',
    name: 'CobrosDetails',
    component: CobrosTable
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/* router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(localStorage.getItem("token") != undefined){
      next();
    }else{
      next({ path: '/login' })
    }
  }else{
    next();
  }
}); */

export default router
