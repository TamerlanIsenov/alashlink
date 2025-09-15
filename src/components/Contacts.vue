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
        <div class="card">
          <div class="card-title">Телефон</div>
          <a class="big-link" :href="telHref">{{ phoneHuman }}</a>
          <div class="row">
            <button class="btn ghost" @click="copy(phoneHuman)">Скопировать</button>
            <a class="btn" :href="telHref">Позвонить</a>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Email</div>
          <a class="big-link" :href="mailtoHref">{{ email }}</a>
          <div class="row">
            <button class="btn ghost" @click="copy(email)">Скопировать</button>
            <a class="btn" :href="mailtoHref">Написать</a>
          </div>
        </div>
      </div>

      <transition name="toast">
        <div v-if="toast" class="toast">{{ toast }}</div>
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
    telHref() {
      return `tel:${this.phoneDigits}`;
    },
    mailtoHref() {
      return `mailto:${this.email}`;
    },
  },
  methods: {
    copy(txt) {
      navigator.clipboard?.writeText(txt).then(() => {
        clearTimeout(this.toastTimer);
        this.toast = "Скопировано";
        this.toastTimer = setTimeout(() => (this.toast = ""), 1400);
      });
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

.contacts{ background:linear-gradient(180deg,#0e131b 0%, #0b0f14 100%); padding:72px 0; border-top:1px solid var(--line); }
.container{ max-width:1200px; margin:0 auto; padding:0 16px; }

.head{ text-align:center; margin-bottom:32px; }
.head h2{ margin:0; font-size:28px; font-weight:900; color:var(--text); }
.subtitle{ margin:10px 0 0; color:var(--muted); font-size:15px; font-weight:600; max-width:600px; margin-left:auto; margin-right:auto; }

.grid{ display:grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap:18px; justify-content:center; }
@media (max-width:640px){ .grid{ grid-template-columns:1fr; } }

.card{
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;
  background:
    radial-gradient(120% 180% at 0% 0%, rgba(0,212,224,.10), transparent 60%),
    linear-gradient(180deg,#121a24,#0f1620 60%, #0e141d);
  color:var(--text);
  padding:20px;
  box-shadow:0 6px 18px rgba(0,0,0,.25);
  display:flex; flex-direction:column; gap:12px;
  text-align:center;
}
.card-title{ font-weight:900; font-size:15px; color:var(--gold); }
.big-link{ font-size:20px; font-weight:900; color:var(--text); text-decoration:none; word-break:break-word; }
.row{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

/* Кнопки */
.btn{
  border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(180deg,#1a2431,#15202b 60%, #0f1822);
  color:var(--text); padding:10px 14px; font-weight:900; border-radius:12px; cursor:pointer;
  transition:.18s ease; text-decoration:none; display:inline-flex; align-items:center; justify-content:center;
  box-shadow:0 6px 18px rgba(0,0,0,.25);
}
.btn:hover{ transform:translateY(-1px); border-color:rgba(0,212,224,.45); }
.btn.ghost{ background:transparent; }

/* Тостик */
.toast{
  position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%);
  background: rgba(15,22,32,.96); color: var(--text);
  border:1px solid rgba(255,255,255,.14); border-radius:12px;
  padding:10px 14px; font-weight:800; box-shadow:0 8px 24px rgba(0,0,0,.35);
}
.toast-enter-active, .toast-leave-active{ transition: opacity .18s ease, transform .18s ease; }
.toast-enter-from, .toast-leave-to{ opacity:0; transform: translateX(-50%) translateY(6px); }
</style>
