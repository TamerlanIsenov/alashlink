<template>
  <section id="contacts" class="contacts">
    <div class="container">
      <header class="head">
        <h2>Контакты</h2>
        <p class="subtitle">
          Мы всегда готовы вам помочь — подскажем, рассчитаем и найдём лучшее решение для вашего бизнеса.
        </p>
      </header>

      <div class="grid">
        <!-- Телефон -->
        <div class="card">
          <div class="icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C11.85 21 3 12.15 3 2a1 1 0 011-1h2.49a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <div class="content">
            <div class="card-title">Телефон</div>
            <a class="big-link" :href="telHref">{{ phoneHuman }}</a>
            <div class="row">
              <button class="btn ghost" @click="copy(phoneHuman)" aria-label="Скопировать телефон">Скопировать</button>
              <a class="btn" :href="telHref" aria-label="Позвонить по телефону">Позвонить</a>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="card">
          <div class="icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16a2 2 0 012 2v1l-10 6L2 7V6a2 2 0 012-2zm18 5.2l-9.4 5.64a2 2 0 01-2.2 0L1 9.2V18a2 2 0 002 2h18a2 2 0 002-2V9.2z"/>
            </svg>
          </div>
          <div class="content">
            <div class="card-title">Email</div>
            <a class="big-link" :href="mailtoHref">{{ email }}</a>
            <div class="row">
              <button class="btn ghost" @click="copy(email)" aria-label="Скопировать email">Скопировать</button>
              <a class="btn" :href="mailtoHref" aria-label="Написать на email">Написать</a>
            </div>
          </div>
        </div>
      </div>

      <transition name="toast">
        <div v-if="toast" class="toast" role="status" aria-live="polite">{{ toast }}</div>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "Contacts",
  data() {
    return {
      phoneHuman: "+7 700 202 3104",
      phoneDigits: "77002023104",
      email: "info@alashlink.kz",
      toast: "",
      toastTimer: null,
    };
  },
  computed: {
    telHref() { return `tel:${this.phoneDigits}`; },
    mailtoHref() { return `mailto:${this.email}`; },
  },
  methods: {
    async copy(txt) {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(txt);
        } else {
          // Фолбэк для старых браузеров
          const ta = document.createElement('textarea');
          ta.value = txt;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        this.showToast("Скопировано");
      } catch {
        this.showToast("Не удалось скопировать");
      }
    },
    showToast(msg) {
      clearTimeout(this.toastTimer);
      this.toast = msg;
      this.toastTimer = setTimeout(() => (this.toast = ""), 1600);
    },
  },
  beforeUnmount() {
    clearTimeout(this.toastTimer);
  },
};
</script>

<style scoped>
:root{
  --bg:#0b0f14; --panel:#0f1620; --line:#1f2a3a;
  --text:#e9f0f5; --muted:#b9c6d4; --glow:#00d4e0; --gold:#c1a269;
}

.contacts{
  background:linear-gradient(180deg,#0e131b 0%, #0b0f14 100%);
  padding:72px 0;
  border-top:1px solid var(--line);
}
.container{ max-width:1200px; margin:0 auto; padding:0 16px; }

/* Заголовок */
.head{ text-align:center; margin-bottom:28px; }
.head h2{ margin:0; font-size:28px; font-weight:900; color:var(--text); }
.subtitle{
  margin:10px auto 0;
  color:var(--muted);
  font-size:15px; font-weight:600;
  max-width:640px; line-height:1.6;
}

/* Сетка карточек */
.grid{
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap:18px;
  justify-content:center;
  max-width:860px;
  margin:0 auto;
}
@media (max-width:760px){
  .grid{ grid-template-columns:1fr; gap:12px; }
}

/* Карточка */
.card{
  display:grid;
  grid-template-columns:64px 1fr;
  align-items:center;
  gap:14px;
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;
  background:
    radial-gradient(120% 180% at 0% 0%, rgba(0,212,224,.10), transparent 60%),
    linear-gradient(180deg,#121a24,#0f1620 60%, #0e141d);
  color:var(--text);
  padding:18px;
  box-shadow:0 6px 18px rgba(0,0,0,.25);
  transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
}
.card:hover{
  border-color:rgba(0,212,224,.45);
  transform: translateY(-2px);
  box-shadow:0 10px 26px rgba(0,0,0,.35);
}
@media (max-width:760px){
  .card{ grid-template-columns:52px 1fr; padding:16px; }
}

/* Иконка */
.icon{
  width:64px; height:64px;
  border-radius:12px;
  display:grid; place-items:center;
  background:radial-gradient(80% 80% at 50% 30%, rgba(0,212,224,.18), transparent);
  border:1px solid rgba(255,255,255,.10);
}
.icon svg{ width:28px; height:28px; fill:#8fd9e6; opacity:.95; }
@media (max-width:760px){
  .icon{ width:52px; height:52px; border-radius:10px; }
  .icon svg{ width:22px; height:22px; }
}

/* Контент карточки */
.content{ display:flex; flex-direction:column; gap:10px; align-items:flex-start; }
.card-title{ font-weight:900; font-size:14px; color:var(--gold); opacity:.95; }
.big-link{
  font-size:20px; font-weight:900; color:var(--text);
  text-decoration:none; word-break:break-word;
}
.row{ display:flex; gap:10px; flex-wrap:wrap; }

/* Кнопки */
.btn{
  border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(180deg,#1a2431,#15202b 60%, #0f1822);
  color:var(--text);
  padding:10px 14px;
  font-weight:900;
  border-radius:12px;
  cursor:pointer;
  transition:.18s ease;
  text-decoration:none;
  display:inline-flex; align-items:center; justify-content:center;
  box-shadow:0 6px 18px rgba(0,0,0,.25);
}
.btn:hover{ transform:translateY(-1px); border-color:rgba(0,212,224,.45); }
.btn.ghost{ background:transparent; }

/* Фокус для доступности */
.btn:focus-visible, .big-link:focus-visible{
  outline:2px solid rgba(0,212,224,.65);
  outline-offset:2px;
  border-color:rgba(0,212,224,.55);
}

/* Тост */
.toast{
  position: fixed;
  left: 50%; bottom: 26px;
  transform: translateX(-50%);
  background: rgba(15,22,32,.96);
  color: var(--text);
  border:1px solid rgba(255,255,255,.14);
  border-radius:12px;
  padding:10px 14px;
  font-weight:800;
  box-shadow:0 8px 24px rgba(0,0,0,.35);
  z-index: 2000;
}
.toast-enter-active, .toast-leave-active{
  transition: opacity .18s ease, transform .18s ease;
}
.toast-enter-from, .toast-leave-to{
  opacity:0; transform: translateX(-50%) translateY(6px);
}
</style>
