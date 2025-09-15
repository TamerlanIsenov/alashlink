<template>
  <section id="hero" class="hero">
    <div class="container">
      <div class="copy">
        <h1>
          Металлопрокат и кабель из России — <br />
          <span class="kz">по Казахстану</span>
        </h1>

        <p class="sub">
          Берём на себя поиск завода, договор, таможню, сертификаты и логистику.
          Оставьте заявку — перезвоним в течение 15 минут.
        </p>

        <div class="actions">
          <a :href="waHref" target="_blank" rel="noopener" class="wa">Написать в WhatsApp</a>
        </div>

        <ul class="bullets">
          <li>10 000+ позиций под заказ</li>
          <li>Документы и НДС — официально</li>
          <li>Доставка по всему РК в срок</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  computed: {
    waHref() {
      const phone = '77002023104';
      const text = encodeURIComponent('Здравствуйте! Хочу заказать импорт из РФ под ключ.');
      return `https://wa.me/${phone}?text=${text}`;
    }
  }
}
</script>

<style scoped>
:root{
  --gold:#c1a269; --gold2:#e3c899;
  --blue1:#00f0ff; --blue2:#00d4e0;
  --bg:#0b0f14; --text:#e9f0f5; --muted:#b9c6d4;
}

.hero{
  background:
    radial-gradient(60% 80% at 20% 0%, rgba(0,212,224,.12) 0%, rgba(0,0,0,0) 60%),
    radial-gradient(60% 80% at 100% 10%, rgba(193,162,105,.14) 0%, rgba(0,0,0,0) 60%),
    #0b0f14;
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.container{
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 16px 48px;
  min-height: 70vh;
  display: flex;
  align-items: center;
}
.copy{ width:100%; max-width:1200px; margin:0 auto; }

/* Заголовок */
h1{
  margin: 0 0 20px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text);
  font-size: clamp(32px, 4vw, 54px);
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
}
h1 .kz{
  display: block;
  font-weight: 900;
  text-align: center;
  font-size: 1.1em;

  /* Золотой градиент */
  background: linear-gradient(90deg, #ffd700, #c1a269, #f6e27a);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Фолбэк */
  color: #c1a269
;

  /* Лёгкое свечение */
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6), 0 0 16px rgba(193, 162, 105, 0.4);
}

/* Подзаголовок */
.sub{
  margin: 0 auto 28px;
  color: var(--muted);
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.6;
  max-width: 820px;
  text-align: center;
}

/* Кнопки */
.actions{
  display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin-bottom:22px;
}
.wa{
  padding:14px 22px;
  border-radius:12px;
  text-decoration:none;
  font-weight:700;
  font-size: 16px;
  background:#30d158;
  color:#0b0f14;
  border: 1px solid rgba(255,255,255,.08);
}

/* Буллеты */
.bullets{
  display:flex; gap:28px; padding:0; margin:0;
  list-style:none; color:#cfe7ff; opacity:.9;
  flex-wrap:wrap; justify-content:center;
}
.bullets li{ padding-left:20px; position:relative; }
.bullets li::before{
  content:""; position:absolute; left:0; top:.6em; width:8px; height:8px;
  border-radius:50%;
  background: linear-gradient(90deg, var(--blue1), var(--blue2));
}

/* Мобильные правки */
@media (max-width: 768px){
  .container{ padding: 80px 16px 32px; min-height:auto; }
  h1, .sub{ text-align:left; }
  h1 .kz{ text-align:left; }
  .actions{ justify-content:flex-start; }
  .bullets{ justify-content:flex-start; gap:16px; }
}
</style>
