<template>
  <section id="process" class="process" aria-labelledby="process-title">
    <div class="container">
      <header class="head">
        <h2 id="process-title">Как мы работаем</h2>
        <p class="lead">Чёткая последовательность от заявки до доставки — прозрачно на каждом шаге.</p>
      </header>

      <!-- Desktop / tablet -->
      <div class="timeline-wrap">
        <ol class="timeline horizontal" role="list">
          <span class="rail" aria-hidden="true"></span>
          <li
            v-for="(step, i) in steps"
            :key="'h-'+i"
            class="node"
            :style="{'--delay': (i * 120) + 'ms'}"
            ref="nodes"
          >
            <span class="dot" aria-hidden="true"></span>
            <div class="box">
              <div class="num">0{{ i + 1 }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>

      <!-- Mobile -->
      <div class="timeline-wrap">
        <ol class="timeline vertical" role="list">
          <li
            v-for="(step, i) in steps"
            :key="'v-'+i"
            class="node"
            :style="{'--delay': (i * 120) + 'ms'}"
            ref="nodes"
          >
            <span class="vline" aria-hidden="true"></span>
            <span class="dot" aria-hidden="true"></span>
            <div class="box">
              <div class="num">0{{ i + 1 }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Process',
  data() {
    return {
      steps: [
        {
          title: 'Заявка и консультация',
          desc: 'Уточняем номенклатуру, сроки и локацию. Бесплатно подскажем оптимальные варианты.'
        },
        {
          title: 'КП и договор',
          desc: 'Подтверждаем наличие и цену у поставщика в РФ, высылаем КП/счёт. Подписываем договор.'
        },
        {
          title: 'Импорт и логистика',
          desc: 'Отгрузка, таможня, сертификаты и страхование. Вы получаете апдейты по этапам.'
        },
        {
          title: 'Доставка и получение',
          desc: 'Привозим до склада/объекта по РК, передаём полный пакет документов и согласуем разгрузку.'
        }
      ],
      _io: null
    }
  },
  mounted() {
    const nodes = this.$refs.nodes || []
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    nodes.forEach(n => io.observe(n))
    this._io = io
  },
  beforeUnmount() {
    if (this._io && this.$refs.nodes) {
      this.$refs.nodes.forEach(n => this._io.unobserve(n))
      this._io.disconnect()
    }
  }
}
</script>

<style scoped>
:root{
  --bg:#0b0f14; --card:#0f1620; --line:#1f2a3a;
  --text:#e9f0f5; --muted:#a9bed2;
  --blue1:#00f0ff; --blue2:#00d4e0; --gold:#c1a269;
}

.process{ background:var(--bg); border-top:1px solid rgba(255,255,255,.04); }
.container{ max-width:1200px; margin:0 auto; padding:48px 16px 72px; }

/* Заголовок */
.head{ text-align:center; margin-bottom:32px; }
.head h2{ margin:0 0 10px; font-size:clamp(22px,2.4vw,30px); font-weight:900; color:var(--text); }
.head .lead{ margin:0; color:var(--muted); font-size:17px; line-height:1.5; max-width:720px; margin-inline:auto; }

/* Обёртка — центрируем и задаём комфортную ширину */
.timeline-wrap{
  max-width:1100px;
  margin:0 auto;
  padding-inline:8px;
}

/* ========= HORIZONTAL ========= */
.timeline.horizontal{
  position:relative;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:24px;
  list-style:none;
  margin:0;
  padding:24px 0 0;
  isolation:isolate;
}

/* Рельса: от середины первой до середины последней колонки */
.timeline.horizontal .rail{
  position:absolute;
  top:38px;
  left:calc(12.5%);   /* центр 1-го столбца */
  right:calc(12.5%);  /* центр 4-го столбца */
  height:3px; border-radius:3px;
  background: linear-gradient(90deg, var(--blue1), var(--blue2), var(--blue1));
  background-size: 200% 100%;
  animation: linePing 3.4s linear infinite alternate;
  filter: drop-shadow(0 0 8px rgba(0,240,255,.45));
  z-index:0; pointer-events:none;
}

.timeline.horizontal .node{
  list-style:none;
  position:relative;
  padding-top:30px;
  z-index:1;
  opacity:0;
  transform:translateY(28px);
  transition: opacity .6s ease, transform .6s ease;
  transition-delay: var(--delay, 0ms);
  height:100%;
}
.timeline.horizontal .node.visible{ opacity:1; transform:translateY(0); }

/* Точка */
.timeline.horizontal .dot{
  position:absolute;
  top:30px;
  left:50%;
  transform:translateX(-50%);
  width:16px; height:16px; border-radius:50%;
  background: radial-gradient(circle at 30% 30%, var(--blue1), var(--blue2));
  box-shadow: 0 0 0 5px rgba(0,240,255,.12), 0 0 12px rgba(0,240,255,.45);
  z-index:2;
  animation: breathe 2.4s ease-in-out infinite;
}

/* Карточка */
.timeline.horizontal .box{
  margin-top:32px;
  background: linear-gradient(180deg, var(--card), #0e141c);
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;
  padding:16px;
  text-align:center;
  box-shadow: 0 8px 22px rgba(0,0,0,.35);
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
  height:100%;
  display:flex; flex-direction:column; justify-content:flex-start;
}
.timeline.horizontal .box:hover{
  transform: translateY(-3px);
  border-color: rgba(0,212,224,.35);
  box-shadow: 0 10px 26px rgba(0,0,0,.45);
}

/* ========= VERTICAL ========= */
.timeline.vertical{
  display:none;
  position:relative;
  list-style:none;
  margin:8px 0 0;
  padding:0;
  isolation:isolate;
}
.timeline.vertical .node{
  position:relative;
  padding-left:36px;
  margin:0 0 18px;
  z-index:1;
  opacity:0;
  transform:translateY(28px);
  transition: opacity .6s ease, transform .6s ease;
  transition-delay: var(--delay, 0ms);
}
.timeline.vertical .node.visible{ opacity:1; transform:translateY(0); }

/* Вертикальная рельса (каждый пункт сам себе тянет линию) */
.timeline.vertical .vline{
  position:absolute;
  left:14px; top:0; bottom:0;
  width:3px; border-radius:3px;
  background: linear-gradient(180deg, var(--blue1), var(--blue2), var(--blue1));
  background-size: 100% 200%;
  animation: linePingV 3.4s linear infinite alternate;
  filter: drop-shadow(0 0 8px rgba(0,240,255,.45));
  z-index:0; pointer-events:none;
}

/* Точка — мобилка */
.timeline.vertical .dot{
  position:absolute;
  left:6px; top:10px;
  width:16px; height:16px; border-radius:50%;
  background: radial-gradient(circle at 30% 30%, var(--blue1), var(--blue2));
  box-shadow: 0 0 0 5px rgba(0,240,255,.12), 0 0 12px rgba(0,240,255,.45);
  z-index:2;
  animation: breathe 2.4s ease-in-out infinite;
}

/* Карточка — мобилка */
.timeline.vertical .box{
  background: linear-gradient(180deg, var(--card), #0e141c);
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;
  padding:14px;
  box-shadow: 0 8px 22px rgba(0,0,0,.35);
}

/* ========= TYPO ========= */
.box .num{ font-weight:800; font-size:12px; color:#8cbdd0; letter-spacing:.4px; margin-bottom:6px; }
.box h3{ margin:0 0 6px; font-size:16px; font-weight:800; color:var(--text); }
.box p{ margin:0; font-size:14px; color:var(--muted); line-height:1.55; }

/* ========= АДАПТИВ ========= */
@media (max-width: 1080px){
  .timeline.horizontal{
    grid-template-columns: repeat(4, minmax(180px,1fr));
    gap:20px;
  }
  .timeline.horizontal .rail{ left:calc(12.5%); right:calc(12.5%); }
}
@media (max-width: 900px){
  .timeline.horizontal{ display:none; }
  .timeline.vertical{ display:block; }
}

/* ========= АНИМАЦИИ ========= */
@keyframes linePing {
  0%   { background-position:   0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes linePingV {
  0%   { background-position: 50%   0%; }
  100% { background-position: 50% 200%; }
}
@keyframes breathe {
  0%,100% { transform: translateX(-50%) scale(1);   box-shadow: 0 0 0 5px rgba(0,240,255,.10), 0 0 10px rgba(0,240,255,.35); }
  50%     { transform: translateX(-50%) scale(1.12); box-shadow: 0 0 0 7px rgba(0,240,255,.16), 0 0 16px rgba(0,240,255,.55); }
}

/* Учитываем предпочтения пользователя */
@media (prefers-reduced-motion: reduce){
  .timeline.horizontal .rail,
  .timeline.vertical .vline,
  .timeline .dot{ animation:none !important; }
  .timeline .node{ transition:none !important; transform:none !important; opacity:1 !important; }
}
</style>
