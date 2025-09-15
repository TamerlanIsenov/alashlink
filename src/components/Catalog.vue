<template>
  <section id="catalog" class="catalog">
    <div class="container">
      <header class="section-head">
        <div class="head-row">
          <button
            v-if="showBack"
            class="back-btn"
            type="button"
            @click="goBack"
            aria-label="Назад"
          >
            ← Назад
          </button>

          <div class="head-titles">
            <h2>Каталог</h2>
            <p>выберите тип, затем категорию</p>
          </div>
        </div>

        <!-- Верхний уровень: кнопки типов -->
        <div class="type-switch" role="tablist" aria-label="Тип металлопроката">
          <button
            v-for="t in types"
            :key="t.key"
            :class="['type-btn', { active: activeGroup === t.key }]"
            role="tab"
            :aria-selected="(activeGroup === t.key).toString()"
            @click="goGroup(t.key)"
          >
            {{ t.label }}
          </button>
        </div>
      </header>

      <!-- Секция подкатегорий -->
      <div class="panel" role="tabpanel">
        <h3 class="g-title">{{ currentTitle }}</h3>

        <!-- плавная замена без скачков -->
        <transition name="fade" mode="out-in">
          <div class="grid" :key="activeGroup">
            <button
              v-for="c in currentList"
              :key="c.slug"
              class="card"
              @click="openCategory(activeGroup, c)"
              type="button"
            >
              <span class="card-title">{{ c.title }}</span>
              <span class="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Catalog",
  data() {
    return {
      activeGroup: "black",
      types: [
        { key: "black",      label: "Чёрный металл" },
        { key: "stainless",  label: "Нержавейка" },
        { key: "nonferrous", label: "Цветной металл" },
        { key: "cable",      label: "Кабели" },
      ],

      // ЧЁРНЫЙ
      black: [
        { title: "Арматура", slug: "armatura" },
        { title: "Круг", slug: "krug" },
        { title: "Катанка", slug: "katanka" },
        { title: "Проволока", slug: "provoloka" },
        { title: "Квадрат", slug: "kvadrat" },
        { title: "Двутавровая балка", slug: "dvutavr" },
        { title: "Швеллер", slug: "shveller" },
        { title: "Лист г/к", slug: "list-gk" },
        { title: "Лист х/к", slug: "list-hk" },
        { title: "Профлист", slug: "proflist" },
        { title: "ПВЛ (просечно-вытяжной)", slug: "pvl" },
        { title: "Лист перфорированный", slug: "list-perf" },
        { title: "Трубы электросварные", slug: "truby-es" },
        { title: "Трубы профильные", slug: "truby-profil" },
        { title: "Трубы бесшовные", slug: "truby-besshov" },
        { title: "Уголок", slug: "ugolok" },
      ],

      // НЕРЖАВЕЮЩИЙ
      stainless: [
        { title: "Лист нержавеющий", slug: "n-list" },
        { title: "Рулон нержавеющий", slug: "n-rulon" },
        { title: "Труба нержавеющая круглая", slug: "n-truba-krugl" },
        { title: "Труба нержавеющая профильная", slug: "n-truba-profil" },
        { title: "Круг нержавеющий", slug: "n-krug" },
        { title: "Квадрат нержавеющий", slug: "n-kvadrat" },
        { title: "Полоса нержавеющая", slug: "n-polosa" },
        { title: "Уголок нержавеющий", slug: "n-ugolok" },
        { title: "Шестигранник нержавеющий", slug: "n-shestigr" },
      ],

      // ЦВЕТНОЙ
      nonferrous: [
        // Алюминий
        { title: "Алюминиевый лист", slug: "al-list" },
        { title: "Алюминиевый рулон", slug: "al-rulon" },
        { title: "Алюминиевая труба круглая", slug: "al-truba-krugl" },
        { title: "Алюминиевая труба профильная", slug: "al-truba-profil" },
        { title: "Алюминиевый круг", slug: "al-krug" },
        { title: "Алюминиевый квадрат", slug: "al-kvadrat" },
        { title: "Алюминиевая полоса", slug: "al-polosa" },
        { title: "Алюминиевый уголок", slug: "al-ugolok" },
        { title: "Алюминиевый шестигранник", slug: "al-shestigr" },
        // Бронза
        { title: "Бронзовый лист", slug: "br-list" },
        { title: "Бронзовый рулон", slug: "br-rulon" },
        { title: "Бронзовая труба круглая", slug: "br-truba-krugl" },
        { title: "Бронзовая труба профильная", slug: "br-truba-profil" },
        { title: "Бронзовый круг", slug: "br-krug" },
        { title: "Бронзовый квадрат", slug: "br-kvadrat" },
        { title: "Бронзовая полоса", slug: "br-polosa" },
        { title: "Бронзовый уголок", slug: "br-ugolok" },
        { title: "Бронзовый шестигранник", slug: "br-shestigr" },
        // Медь
        { title: "Медный лист", slug: "cu-list" },
        { title: "Медный рулон", slug: "cu-rulon" },
        { title: "Медная труба круглая", slug: "cu-truba-krugl" },
        { title: "Медная труба профильная", slug: "cu-truba-profil" },
        { title: "Медный круг", slug: "cu-krug" },
        { title: "Медный квадрат", slug: "cu-kvadrat" },
        { title: "Медная полоса", slug: "cu-polosa" },
        { title: "Медный уголок", slug: "cu-ugolok" },
        { title: "Медный шестигранник", slug: "cu-shestigr" },
      ],

      // КАБЕЛИ
      cable: [
        { title: "ВВГ / ВВГнг-LS", slug: "vvg" },
        { title: "АВВГ / АВВГнг-LS (алюм.)", slug: "avvg" },
        { title: "NYM", slug: "nym" },
        { title: "КГ (гибкий)", slug: "kg" },
        { title: "ПВС", slug: "pvs" },
        { title: "ВБбШв / АВБбШв (броня)", slug: "vbshv" },
        { title: "КПСнг / FRLS (огнестойкий)", slug: "kps-frls" },
        { title: "N2XH / N2XY", slug: "n2xh" },
        { title: "СИП (самонесущий)", slug: "sip" },
        { title: "КВВГ / КВВГнг", slug: "kvvg" },
        { title: "КВВГЭ / КВБбШв (экранир./броня)", slug: "kvvge" },
        { title: "КСПВ (сигнализация)", slug: "kspv" },
        { title: "КВПВ / КВПЭВ (витая пара)", slug: "kvpv" },
        { title: "РКГМ / РКГМ-Т (кремний, до 180°C)", slug: "rkgm" },
        { title: "МГТФ (фторопласт, до 200°C)", slug: "mgtf" },
        { title: "МКЭШ / МКЭШв (экранир.)", slug: "mkesh" },
        { title: "UTP/FTP LAN Cat5e/Cat6/Cat6a", slug: "lan" },
        { title: "Коаксиальный RG-6/59", slug: "coax" },
        { title: "ОК/ADSS (оптоволокно)", slug: "fiber" },
        { title: "ПуГВ / ПУГНП (многожил.)", slug: "pugv" },
        { title: "АПВ / ПВ-1 / ПВ-3", slug: "apv" },
        { title: "БПВЛ (бортовой, жаростойкий)", slug: "bpvl" },
        { title: "БПВЛЭ (экранированный)", slug: "bpvle" },
        { title: "ПМЛ (провод монтажный, лакостойкий)", slug: "pml" },
        { title: "ПТЛ (провод термостойкий, лакированный)", slug: "ptl" },
        { title: "АПВЛ (алюм., авиа назначение)", slug: "apvl" },
      ],
    };
  },
  computed: {
    currentList() {
      return this[this.activeGroup] || [];
    },
    currentTitle() {
      switch (this.activeGroup) {
        case "black": return "Чёрный металлопрокат";
        case "stainless": return "Нержавеющий металлопрокат";
        case "nonferrous": return "Цветной металлопрокат";
        case "cable": return "Кабельно-проводниковая продукция";
        default: return "";
      }
    },
    showBack() {
      return ["catalog", "category"].includes(this.$route?.name);
    }
  },
  created() {
    // Инициализация из URL /catalog/:group
    const g = this.$route?.params?.group;
    this.setActiveFromRoute(g);
  },
  watch: {
    "$route.params.group"(val) {
      this.setActiveFromRoute(val);
    }
  },
  methods: {
    setActiveFromRoute(group) {
      const allowed = ["black","stainless","nonferrous","cable"];
      this.activeGroup = allowed.includes(group) ? group : "black";
    },
    goGroup(group) {
      if (group === this.activeGroup) return;

      // Если на главной — просто переключаем таб без смены роута
      if (this.$route?.name === "home") {
        this.activeGroup = group;
        // опционально прокрутить к каталогу:
        const el = document.getElementById("catalog");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Если мы на отдельной странице каталога — меняем роут
        this.$router.push({ name: "catalog", params: { group } });
      }
    },
    openCategory(group, item) {
      this.$router.push({ name: "category", params: { group, slug: item.slug } });
    },
    goBack() {
      // если есть история — назад, иначе на главную к каталогу
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push({ name: "home", hash: "#catalog" });
      }
    },
  },
};
</script>

<style scoped>
:root{
  --bg:#0b0f14; --panel:#0f1620; --line:#1f2a3a;
  --text:#e9f0f5; --muted:#b9c6d4; --glow:#00d4e0; --gold:#c1a269;
}

.catalog{ background:linear-gradient(180deg,#0b0f14 0%, #0b0f14 40%, #0e131b 100%); padding:72px 0; border-top:1px solid var(--line); }
.container{ max-width:1200px; margin:0 auto; padding:0 16px; }

.section-head{ text-align:center; margin-bottom:20px; }
.section-head h2{ margin:0; font-size:28px; font-weight:900; color:var(--text); }
.section-head p{ margin:6px 0 0; color:var(--muted); font-weight:700; }

.head-row{ display:flex; align-items:center; justify-content:center; gap:12px; }
.head-titles{ display:grid; place-items:center; }

/* Кнопка Назад */
.back-btn{
  margin-right:auto;
  border:1px solid rgba(255,255,255,.12);
  background:linear-gradient(180deg,#121a24,#0f1620 60%, #0e141d);
  color:var(--text);
  padding:8px 12px;
  font-weight:800;
  border-radius:10px;
  cursor:pointer;
  transition:.18s ease;
  box-shadow:0 6px 18px rgba(0,0,0,.25);
}
.back-btn:hover{ transform:translateY(-1px); border-color:rgba(0,212,224,.4); }

/* Верхний уровень кнопок */
.type-switch{
  margin:18px auto 0; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;
}
.type-btn{
  border:1px solid rgba(255,255,255,.08);
  background:linear-gradient(180deg,#121a24,#0f1620 60%, #0e141d);
  color:var(--text); padding:10px 14px; font-weight:800; border-radius:12px; cursor:pointer;
  transition:.18s ease; box-shadow:0 6px 18px rgba(0,0,0,.25);
}
.type-btn:hover{ transform:translateY(-1px); border-color:rgba(0,212,224,.35); }
.type-btn.active{
  border-color:rgba(0,212,224,.55);
  box-shadow:0 10px 26px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,212,224,.25);
  outline:1px solid rgba(0,212,224,.25);
}

/* Панель подкатегорий */
.panel{ margin-top:26px; min-height: 420px; } /* фикс высоты = без скачков при смене */
.g-title{ color:var(--text); font-size:20px; margin:0 0 12px; font-weight:900; }

/* плавная замена сеток */
.fade-enter-active, .fade-leave-active { transition: opacity .16s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.grid{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; }
.card{
  height:120px; border:1px solid rgba(255,255,255,.08); border-radius:14px;
  background: radial-gradient(100% 140% at 0% 0%, rgba(0,212,224,.12), transparent 55%), linear-gradient(180deg,#121a24,#0f1620 60%, #0e141d);
  color:var(--text); display:flex; align-items:center; justify-content:space-between;
  padding:16px; text-align:left; cursor:pointer; transition:.18s ease; box-shadow:0 6px 18px rgba(0,0,0,.25);
}
.card:hover{ transform:translateY(-2px); border-color:rgba(0,212,224,.45); box-shadow:0 10px 26px rgba(0,0,0,.35); }
.card-title{ font-weight:900; font-size:16px; }
.arrow{ font-weight:900; opacity:.8; }

@media (max-width:1080px){
  .grid{ grid-template-columns:repeat(3,minmax(0,1fr)); }
  .panel{ min-height: 380px; }
}
@media (max-width:760px){
  .grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  .card{ height:110px; }
  .panel{ min-height: 360px; }
}
@media (max-width:520px){
  .grid{ grid-template-columns:1fr; }
  .panel{ min-height: 340px; }
}
</style>
