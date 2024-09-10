import { createRouter, createWebHistory } from '@ionic/vue-router';
import Login from '@/views/Login/Login.vue';
import Cobros from '@/views/Cobros/Cobros.vue';
import AutorizarCobro from '@/views/Cobros/AutorizarCobro.vue';
import Ventas from '@/views/ventas/Ventas.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Cobros
      },
      {
        path: '/autorizar-cobro',
        name: 'AutorizarCobro',
        component: AutorizarCobro
      },
      {
        path: '/ventas',
        name: 'Ventas',
        component: Ventas
      }
  ]
}
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(localStorage.getItem("token") != undefined){
      next();
    }else{
      next({ path: '/login' })
    }
  }else{
    next();
  }
});

export default router
