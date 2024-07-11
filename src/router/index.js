import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Detail from '../components/Detail.vue';
import Location from '../components/Location.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: Detail, props: true },
  { path: '/location', component: Location },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
