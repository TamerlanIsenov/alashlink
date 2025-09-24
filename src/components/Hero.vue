<template>
  <section id="hero" class="hero">
    <div class="container">
      <div class="copy">
        <!-- Бейджи -->
        <div class="badges">
          <span class="badge">Собственная металлобаза</span>
          <span class="dot"></span>
          <span class="badge alt">Импорт под ключ</span>
        </div>

        <h1>
          Металлопрокат и кабель —<br />
          <span class="kz">поставки со склада и напрямую из России</span>
        </h1>

        <p class="sub">
          Мы — высококвалифицированные поставщики металлопроката и кабельно-проводниковой продукции.
          У нас своя металлобаза в Казахстане + прямой импорт из России: 
          заводы, договоры, таможня, сертификаты и логистика — всё берём на себя.
        </p>

        <div class="actions">
          <a :href="waHref" target="_blank" rel="noopener" class="wa">Написать в WhatsApp</a>
        </div>

        <ul class="bullets">
          <li>Собственная металлобаза в Казахстане</li>
          <li>Импорт из РФ под ключ: от завода до склада</li>
          <li>Документы и НДС — официально</li>
          <li>Доставка по всей стране в срок</li>
          <li>10 000+ позиций под заказ и со склада</li>
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
      return `https://wa.me/${phone}`;
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

/* Бейджи */
.badges{
  display:flex; align-items:center; justify-content:center;
  gap:10px; margin-bottom:14px;
}
.badge{
  padding:6px 12px; border-radius:999px; font-weight:700; font-size:13px;
  background: rgba(193,162,105,.16);
  border:1px solid rgba(193,162,105,.35);
  color: var(--gold2);
  backdrop-filter: blur(4px);
}
.badge.alt{
  background: rgba(0,212,224,.12);
  border-color: rgba(0,212,224,.35);
  color:#bff7ff;
}
.dot{
  width:6px; height:6px; border-radius:50%;
  background: linear-gradient(90deg, var(--blue1), var(--blue2));
  opacity:.9;
}

/* Заголовок */
h1{
  margin: 8px 0 18px;
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
  background: linear-gradient(90deg, #ffd700, #c1a269, #f6e27a);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #c1a269;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6), 0 0 16px rgba(193, 162, 105, 0.4);
}

/* Подзаголовок */
.sub{
  margin: 0 auto 28px;
  color: var(--muted);
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.6;
  max-width: 900px;
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
  transition:.2s;
}
.wa:hover{ background:#28b94c; }

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
  .container{ padding: 72px 16px 32px; min-height:auto; }
  h1, .sub{ text-align:center; }
  h1 .kz{ text-align:center; }
  .actions{ justify-content:center; }
  .wa{ width:100%; text-align:center; }
  .bullets{
    flex-direction:column;
    gap:14px;
    align-items:flex-start;
    margin-top:20px;
  }
  .bullets li{ font-size:15px; }
}
</style>
