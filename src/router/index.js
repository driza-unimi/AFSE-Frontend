import { createRouter, createWebHistory } from 'vue-router';
import Album from '@views/Album.vue';
import NotFound from '@views/NotFound.vue';
import {useUserStore} from "@/stores/userStore.js";
import AdminHome from "@views/AdminHome.vue";
import Auth from "@views/Auth.vue";
import Profile from "@views/Profile.vue";
import Shop from "@views/Shop.vue";
import Trade from "@views/Trade.vue";

const routes = [
  { path: '/auth', component: Auth },
  { path: '/album', component: Album },
  { path: '/trade', component: Trade },
  { path: '/shop', component: Shop },
  { path: '/profile', component: Profile },
  { path: '/admin', component: AdminHome, meta: { requiresAdmin: true } },
  { path: '/:catchAll(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const user = userStore.user;

  if (to.path !== '/auth' && !user?.username) {
    return next('/auth');
  }

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/auth');
  }

  if (to.path !== '/admin' && user?.role === 'admin') {
    return next('/admin');
  }

  next();
});

export default router;
