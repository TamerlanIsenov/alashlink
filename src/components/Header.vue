<template>
  <header class="header" :class="{ sticky: true }">
    <div class="container">
      <!-- Лого -->
      <a href="/" class="brand" aria-label="AlashLink — на главную">
        Alash<span>Link</span>
      </a>

      <!-- Десктоп-меню -->
      <nav class="nav">
        <a href="#why"     @click.prevent="jump('#why')">Почему мы</a>
        <a href="#process" @click.prevent="jump('#process')">Как работаем</a>
        <a href="#catalog" @click.prevent="jump('#catalog')">Каталог</a>
        <a href="#contacts" @click.prevent="jump('#contacts')">Контакты</a>
      </nav>

      <!-- Контакты/кнопки -->
      <div class="actions">
        <a href="tel:+77002023104" class="contact">+7 700 202 3104</a>
        <a href="mailto:info@alashlink.kz" class="contact hide-sm">info@alashlink.kz</a>
        <a :href="waHref" target="_blank" rel="noopener" class="wa">WhatsApp</a>

        <!-- Бургер -->
        <button class="burger" @click="open = !open" :aria-expanded="open.toString()" aria-label="Меню">
          <span :class="{open}"></span>
        </button>
      </div>
    </div>

    <!-- Мобильный дровер -->
    <div class="drawer" :class="{ open }" @click.self="open = false">
      <div class="drawer-inner">
        <a href="#why"     @click.prevent="jump('#why')">Почему мы</a>
        <a href="#process" @click.prevent="jump('#process')">Как работаем</a>
        <a href="#catalog" @click.prevent="jump('#catalog')">Каталог</a>
        <a href="#contacts" @click.prevent="jump('#contacts')">Контакты</a>

        <div class="drawer-contacts">
          <a href="tel:+77002023104">+7 700 202 3104</a>
          <a href="mailto:info@alashlink.kz">info@alashlink.kz</a>
          <a :href="waHref" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { open: false };
  },
  computed: {
    waHref() {
      const phone = "77002023104";
      const text = encodeURIComponent("Здравствуйте! Хочу заказать импорт из РФ под ключ.");
      return `https://wa.me/${phone}?text=${text}`;
    }
  },
  methods: {
    jump(sel) {
      this.open = false;
      const el = document.querySelector(sel);
      if (!el) return;

      const header = this.$el;
      const offset = (header?.offsetHeight || 64) + 8;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
:root{
  --gold:#c1a269; --blue1:#00f0ff; --blue2:#00d4e0;
  --bg:#0b0f14; --line:#1f2a3a; --text:#e9f0f5; --muted:#b9c6d4;
}

/* Шапка */
.header{ position:fixed; top:0; left:0; right:0; z-index:1000; background:#0b0f14; border-bottom:1px solid var(--line); }
.container{
  max-width:1200px;  /* фиксируем нормальную ширину */
  margin:0 auto;
  padding:12px 16px;
  display:flex; align-items:center; justify-content:space-between;
  gap:16px;
}

/* Лого */
.brand{ font-size:22px; font-weight:800; text-decoration:none; white-space:nowrap; color:var(--gold); }
.brand span{ color:var(--blue2); }

/* Навигация (центр) */
.nav{ flex:1 1 auto; display:flex; justify-content:center; gap:32px; }
.nav a{ color:var(--muted); text-decoration:none; font-size:14px; padding:8px 6px; border-radius:10px; transition:.2s; }
.nav a:hover{ color:var(--text); background:rgba(255,255,255,.06); }

/* Правый блок */
.actions{ display:flex; align-items:center; gap:12px; }
.contact{ color:var(--muted); text-decoration:none; font-size:14px; }
.contact:hover{ color:var(--text); }

.wa{ padding:8px 12px; border-radius:10px; background:#30d158; color:#0b0f14; font-weight:700; text-decoration:none; }

/* Бургер */
.burger{ display:none; position:relative; width:44px; height:40px; border:none; background:transparent; padding:0; }
.burger span,.burger span::before,.burger span::after{ content:""; position:absolute; left:10px; right:10px; height:2px; background:#cfe7ff; transition:.2s; }
.burger span{ top:19px; }
.burger span::before{ top:-7px; }
.burger span::after{ top:7px; }
.burger span.open{ background:transparent; }
.burger span.open::before{ transform:translateY(7px) rotate(45deg); }
.burger span.open::after{ transform:translateY(-7px) rotate(-45deg); }

/* Мобильный дровер */
.drawer{ position:fixed; inset:0; background:rgba(0,0,0,.35); backdrop-filter:saturate(1.1) blur(2px); display:none; }
.drawer.open{ display:block; }
.drawer-inner{ position:absolute; top:64px; left:0; right:0; background:#0c1219; border-top:1px solid var(--line); padding:12px 16px; display:flex; flex-direction:column; gap:10px; }
.drawer a{ color:var(--text); text-decoration:none; padding:12px 10px; border-radius:10px; background:#0f1722; }
.drawer-contacts{ display:flex; gap:12px; flex-wrap:wrap; margin-top:6px; }
.drawer-contacts a{ background:#0f1722; }

/* Адаптив */
.hide-sm{ }
@media (max-width:1080px){
  .nav{ display:none; }
  .hide-sm{ display:none; }
  .burger{ display:inline-flex; align-items:center; justify-content:center; }
}
@media (max-width:560px){
  .contact{ display:none; }
}

/* Универсальный запас под фикс-хедер при переходах по #якорям */
:global(section[id]){ scroll-margin-top: 80px; }
</style>
