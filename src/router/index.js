import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Contact from '../pages/Contact.vue'
import Catalog from '../components/Catalog.vue' // <- правильный путь

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contact', name: 'Contact', component: Contact },

  // Каталог
  { path: '/catalog/:group?', name: 'catalog', component: Catalog },

  // SEO-страницы категорий
  { path: '/category/:group/:slug', name: 'category', component: () => import('../pages/CategoryPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
