
import { createRouter, createWebHistory } from 'vue-router'
import GenerarTokenView from '../views/GenerarTokenView.vue'
import GuardarVehiculoView from '../views/GuardarVehiculoView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/generar-token'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/generar-token',
    name: 'generar-token',
    component: GenerarTokenView,
    meta: { requiresAuth: false }
  },
  {
    path: '/guardar-vehiculo',
    name: 'guardar-vehiculo',
    component: GuardarVehiculoView,
    meta: { requiresAuth: true, roles: ['admin', 'user'] }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta?.requiresAuth;
  if (!requiresAuth) return next();

  const token = localStorage.getItem('token');
  const role = (localStorage.getItem('role') || '').toLowerCase();

  if (!token) {
    return next({ name: 'login' });
  }

  const allowedRoles = to.meta?.roles || [];
  if (allowedRoles.length && !allowedRoles.map(r => r.toLowerCase()).includes(role)) {
    return next({ name: 'login' });
  }

  return next();
});
export default router;
