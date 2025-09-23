<template>
  <section id="why" class="why" aria-labelledby="why-title">
    <div class="container">
      <header class="head">
        <h2 id="why-title">Почему выбирают «АлашЛинк»</h2>
        <p class="lead">Импорт под ключ с документами и поставкой точно в срок — без лишних посредников и рисков.</p>
      </header>

      <ul class="grid" role="list">
        <li class="card">
          <div class="icon"><svg viewBox="0 0 24 24"><path d="M3 21V9l6 3V9l6 3V9l6 3v9H3zm2-2h14v-5l-4-2v3h-2v-4l-4-2v6H7v-4L5 9v10z"/></svg></div>
          <div class="body">
            <h3 class="title">Прямые поставки</h3>
            <p class="desc">Закупаем с российских заводов и у офдилеров — без лишних наценок.</p>
          </div>
        </li>

        <li class="card">
          <div class="icon"><svg viewBox="0 0 24 24"><path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V7h3.5L13 3.5zM8 9h8v2H8V9zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/></svg></div>
          <div class="body">
            <h3 class="title">Импорт под ключ</h3>
            <p class="desc">Договор, счета, таможенное оформление, сертификаты — всё на нас.</p>
          </div>
        </li>

        <li class="card">
          <div class="icon"><svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.4 9.7-8 10-4.6-.3-8-5-8-10V6l8-4zM7 9v3c0 3.6 2.5 7.2 5 7.5 2.5-.3 5-3.9 5-7.5V9l-5-2.5L7 9z"/></svg></div>
          <div class="body">
            <h3 class="title">Сертифицированная продукция</h3>
            <p class="desc">Заводские паспорта, сертификаты соответствия и качества по ГОСТ.</p>
          </div>
        </li>

        <li class="card">
          <div class="icon"><svg viewBox="0 0 24 24"><path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4v5l-9 4-9-4v-5z"/></svg></div>
          <div class="body">
            <h3 class="title">Широкий ассортимент</h3>
            <p class="desc">Арматура, лист, трубы, балки, проволока, кабели — 10 000+ позиций.</p>
          </div>
        </li>

        <li class="card">
          <div class="icon"><svg viewBox="0 0 24 24"><path d="M3 6h11v7h2l3 3v2h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V6zm13 2h3l2 3v3h-2l-3-3V8z"/></svg></div>
          <div class="body">
            <h3 class="title">Доставка по Казахстану</h3>
            <p class="desc">Алматы, Астана, Шымкент и др. — согласуем удобное время разгрузки.</p>
          </div>
        </li>

        <li class="card">
          <div class="icon"><svg viewBox="0 0 24 24"><path d="M6 2h9l3 3v17H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V7h3.5L14 3.5zM8 9h8v2H8V9zm0 4h6v2H8v-2z"/></svg></div>
          <div class="body">
            <h3 class="title">Официально и безопасно</h3>
            <p class="desc">Договор, НДС для юрлиц, прозрачные условия и ответственность за сроки.</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default { name: 'Why' }
</script>

<style scoped>
:root{
  --bg:#0b0f14;
  --card:#0f1620;
  --line:#1f2a3a;
  --text:#e9f0f5;
  --muted:#a9bed2;
  --accent:#00d4e0;
}

/* Секция */
.why{
  background:var(--bg);
  border-top:1px solid rgba(255,255,255,.04);
}
.container{
  max-width:1200px;
  margin:0 auto;
  padding:48px 16px 64px;
}

/* Заголовок */
.head{ text-align:center; margin-bottom:32px; }
.head h2{
  margin:0 0 10px;
  font-size:clamp(22px,2.4vw,30px);
  font-weight:900;
  color:var(--text);
}
.head .lead{
  margin:0;
  color:var(--muted);
  font-size:17px;
  line-height:1.5;
  max-width:720px;
  margin-inline:auto;
}

/* Сетка карточек (UL) — сбрасываем дефолтные отступы и центрируем */
.grid{
  display:grid;
  gap:24px;                 /* расстояние между карточками */
  grid-template-columns:1fr;
  list-style:none;          /* убираем буллиты */
  padding:0;                /* убираем внутренние отступы UL */
  margin:0 auto;            /* центрируем сетку */
  max-width:1040px;         /* чтобы не растягивалось на всю ширину */
}
@media (min-width:640px){
  .grid{ grid-template-columns:repeat(2,1fr); }
}
@media (min-width:1024px){
  .grid{ grid-template-columns:repeat(3,1fr); }
}

/* Карточка */
.card{
  background:linear-gradient(180deg, var(--card), #0e141c);
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;
  padding:18px;
  display:grid;
  grid-template-columns:56px 1fr;
  column-gap:16px;
  align-items:start;
  height:100%;
  box-sizing:border-box;
  transition:border-color .2s ease, box-shadow .2s ease, transform .2s ease;
}
.card:hover{
  border-color:rgba(0,212,224,.45);
  box-shadow:0 4px 20px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,212,224,.12);
  transform:translateY(-3px);
}

/* Иконка */
.icon{
  grid-column:1;
  grid-row:1 / span 2;
  width:56px; height:56px;
  border-radius:12px;
  display:grid; place-items:center;
  background:radial-gradient(80% 80% at 50% 30%, rgba(0,212,224,.18), transparent);
  border:1px solid rgba(255,255,255,.08);
  flex-shrink:0;
}
.icon svg{ width:26px; height:26px; fill:#8fd9e6; opacity:.95; }

/* Текст */
.body{ grid-column:2; display:flex; flex-direction:column; gap:6px; }
.title{ margin:0; font-size:17px; font-weight:800; color:var(--text); line-height:1.35; }
.desc{ margin:0; font-size:15px; color:var(--muted); line-height:1.55; }

/* Мобильные правки */
@media (max-width:640px){
  .grid{ gap:18px; max-width:600px; }           /* чуть плотнее, но не слипается */
  .card{ grid-template-columns:44px 1fr; padding:14px; column-gap:12px; }
  .icon{ width:44px; height:44px; border-radius:10px; }
  .icon svg{ width:20px; height:20px; }
  .title{ font-size:16px; }
  .desc{ font-size:14px; }
}
</style>
