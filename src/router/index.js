import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Contact from '../pages/Contact.vue'
import Catalog from '../components/Catalog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'AlashLink — поставки металлопроката и кабеля под ключ в Казахстане',
      description:
        'Поставки черного, цветного и нержавеющего металлопроката, а также кабельно-проводниковой продукции под ключ. Бесплатная доставка по Казахстану. Работа напрямую с заводами, гибкие условия, отсрочка платежа и бонусная система для постоянных клиентов.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Контакты | AlashLink',
      description:
        'Свяжитесь с AlashLink: консультации, расчет стоимости и условия поставки металлопроката и кабеля по Казахстану.'
    }
  },
  {
    path: '/catalog/:group?',
    name: 'catalog',
    component: Catalog,
    meta: {
      title: 'Каталог продукции | AlashLink',
      description:
        'Каталог AlashLink: черный металлопрокат, нержавейка, цветной прокат и кабельно-проводниковая продукция с бесплатной доставкой по Казахстану.'
    }
  },

  // SEO-страницы категорий
  {
    path: '/category/black/:slug',
    name: 'category-black',
    component: () => import('../pages/CategoryPage.vue'),
    meta: {
      title: 'Черный металлопрокат — поставки под ключ | AlashLink',
      description:
        'AlashLink: поставки черного металлопроката по всему Казахстану. Арматура, швеллер, уголок, балки и трубы. Бесплатная доставка, отсрочка платежа и бонусы для постоянных клиентов.'
    }
  },
  {
    path: '/category/stainless/:slug',
    name: 'category-stainless',
    component: () => import('../pages/CategoryPage.vue'),
    meta: {
      title: 'Нержавеющий металлопрокат — доставка по Казахстану | AlashLink',
      description:
        'AlashLink: поставки нержавеющего проката под ключ. Листы, трубы, круги и профили из нержавейки. Бесплатная доставка по Казахстану, гибкие условия и бонусная система.'
    }
  },
  {
    path: '/category/nonferrous/:slug',
    name: 'category-nonferrous',
    component: () => import('../pages/CategoryPage.vue'),
    meta: {
      title: 'Цветной металлопрокат — алюминий, медь, латунь | AlashLink',
      description:
        'AlashLink: поставки цветного металлопроката. Алюминий, медь, латунь и бронза с бесплатной доставкой по Казахстану. Работа напрямую с заводами, гибкие условия и отсрочка платежа.'
    }
  },
  {
    path: '/category/cable/:slug',
    name: 'category-cable',
    component: () => import('../pages/CategoryPage.vue'),
    meta: {
      title: 'Кабельно-проводниковая продукция — кабель и провод | AlashLink',
      description:
        'AlashLink: поставки кабельно-проводниковой продукции по Казахстану. Кабель и провод для строительства и промышленности. Бесплатная доставка, отсрочка и бонусы для постоянных клиентов.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 🔥 Обновляем title и description при переходе
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.description) {
    let tag = document.querySelector('meta[name="description"]')
    if (tag) {
      tag.setAttribute('content', to.meta.description)
    } else {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      tag.setAttribute('content', to.meta.description)
      document.head.appendChild(tag)
    }
  }
})

export default router
