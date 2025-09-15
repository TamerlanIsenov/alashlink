<template>
  <section class="category">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="crumbs">
        <router-link to="/">Главная</router-link>
        <span>/</span>
        <router-link :to="{ name: 'catalog', params: { group: groupKey } }">Каталог</router-link>
        <span>/</span>
        <span class="current">{{ pageTitle }}</span>
      </nav>

      <!-- Заголовок -->
      <header class="head">
        <h1>{{ pageTitle }}</h1>
        <p class="sub">{{ pageSub }}</p>
      </header>

      <!-- Панель фильтров -->
      <div class="filters">
        <input
          v-model.trim="q"
          type="search"
          placeholder="Поиск по размеру, марке, ГОСТ..."
          @input="debouncedFilter"
        />
        <select v-model="filterUnit" @change="applyFilter">
          <option value="">Единица (все)</option>
          <option value="м">м</option>
          <option value="кг">кг</option>
          <option value="шт">шт</option>
          <option value="т">т</option>
          <option value="рул">рул</option>
        </select>
        <select v-model="filterBrand" @change="applyFilter">
          <option value="">Марка/Материал (все)</option>
          <option v-for="m in allMarks" :key="m" :value="m">{{ m }}</option>
        </select>
        <button class="clear" v-if="hasAnyFilter" @click="clearFilters">Сбросить</button>
      </div>

      <!-- Таблица -->
      <div class="table-wrap" v-if="rows.length">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 40%">Наименование / Размер</th>
              <th style="width: 14%">Марка</th>
              <th style="width: 14%">ГОСТ/ТУ</th>
              <th style="width: 8%">Ед.</th>
              <th style="width: 10%">Мин. партия</th>
              <th style="width: 14%">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="it in paged" :key="it.id">
              <td class="name">
                <strong>{{ it.name }}</strong>
                <small v-if="it.note">{{ it.note }}</small>
              </td>
              <td>{{ it.mark || '—' }}</td>
              <td>{{ it.gost || '—' }}</td>
              <td>{{ it.unit || '—' }}</td>
              <td>{{ it.moq || '—' }}</td>
              <td class="actions">
                <button class="btn" @click="waAskPrice(it)">Узнать цену</button>
                <a class="wa" :href="waHref(it)" target="_blank" rel="noopener">WhatsApp</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Пусто -->
      <div class="empty" v-else>
        <h3>Пока нет данных для этой категории</h3>
        <p>Напишите нам — пришлём спецификацию и актуальную цену по запросу.</p>
        <a class="wa big" :href="waHref()" target="_blank" rel="noopener">Написать в WhatsApp</a>
      </div>

      <!-- Пагинация -->
      <div class="pager" v-if="rows.length > pageSize">
        <button :disabled="page===1" @click="page--">Назад</button>
        <span>Стр. {{ page }} из {{ pages }}</span>
        <button :disabled="page===pages" @click="page++">Дальше</button>
        <span class="count">{{ filtered.length }} позиций</span>
      </div>
    </div>

    <!-- Модал "Узнать цену" -->
    <div class="modal-backdrop" v-if="modal">
      <div class="modal" role="dialog" aria-modal="true">
        <header>
          <h3>Узнать цену</h3>
          <button class="x" @click="modal=null" aria-label="Закрыть">×</button>
        </header>
        <div class="body">
          <p class="what">
            {{ pageTitle }} — <strong>{{ modal?.name }}</strong>
          </p>
          <label>
            Объём/метраж:
            <input v-model.trim="qty" type="text" placeholder="например: 120 м / 3 т / 50 шт" />
          </label>
          <label>
            Город:
            <input v-model.trim="city" type="text" placeholder="Астана" />
          </label>
          <label>
            Комментарий:
            <textarea v-model.trim="comment" rows="3" placeholder="Сроки, требования к документам, доставка и т.д."></textarea>
          </label>
        </div>
        <footer>
          <a :href="waHref(modal)" target="_blank" rel="noopener" class="wa big">Отправить в WhatsApp</a>
          <button class="ghost" @click="modal=null">Отмена</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CategoryPage",
  data() {
    return {
      phone: "77002023104",

      // фильтры/поиск
      q: "",
      filterUnit: "",
      filterBrand: "",
      page: 1,
      pageSize: 48,

      // модал
      modal: null,
      qty: "",
      city: "",
      comment: "",

      // словари размеров (можно заменить на загрузку с бэка)
      catalog: this.buildCatalog(),
    };
  },
  computed: {
    groupKey() {
      return this.$route.params.group;
    },
    slugKey() {
      return this.$route.params.slug;
    },
    pageTitle() {
      const map = {
        black: "Чёрный металлопрокат",
        stainless: "Нержавеющий металлопрокат",
        nonferrous: "Цветной металлопрокат",
        cable: "Кабельно-проводниковая продукция",
      };
      // конкретное имя категории
      const cat = this.currentCatTitle || "";
      return cat ? `${map[this.groupKey] || "Каталог"} — ${cat}` : (map[this.groupKey] || "Каталог");
    },
    pageSub() {
      return "Размеры/сечения в наличии под заказ. Импорт из РФ под ключ — документы, растаможка, логистика.";
    },
    rows() {
      const group = this.catalog[this.groupKey] || {};
      return group[this.slugKey] || [];
    },
    allMarks() {
      const s = new Set();
      this.rows.forEach(r => r.mark && s.add(r.mark));
      return Array.from(s).sort();
    },
    filtered() {
      const q = this.q.toLowerCase();
      return this.rows.filter(it => {
        const text = `${it.name} ${it.mark||""} ${it.gost||""} ${it.note||""}`.toLowerCase();
        const okQ = !q || text.includes(q);
        const okU = !this.filterUnit || it.unit === this.filterUnit;
        const okM = !this.filterBrand || it.mark === this.filterBrand;
        return okQ && okU && okM;
      });
    },
    pages() {
      return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    },
    paged() {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },
    currentCatTitle() {
      // можно подсветить человеку, что он открыл
      const alias = (this.aliases()[this.groupKey] || {});
      return alias[this.slugKey] || "";
    },
    hasAnyFilter() {
      return !!(this.q || this.filterUnit || this.filterBrand);
    }
  },
  watch: {
    "$route.params.group": "resetToFirstPage",
    "$route.params.slug": "resetToFirstPage",
  },
  created() {
    this.resetToFirstPage();
    this.debouncedFilter = this.debounce(() => {
      this.page = 1;
    }, 120);
  },
  methods: {
    resetToFirstPage() {
      this.page = 1;
      this.q = "";
      this.filterUnit = "";
      this.filterBrand = "";
    },
    applyFilter() {
      this.page = 1;
    },
    clearFilters() {
      this.q = "";
      this.filterUnit = "";
      this.filterBrand = "";
      this.page = 1;
    },
    waAskPrice(item) {
      this.modal = item;
      this.qty = "";
      this.city = "";
      this.comment = "";
    },
    waHref(item) {
      const where = typeof window !== "undefined" ? window.location.href : "";
      const catTitle = this.pageTitle;
      const name = item?.name || "(уточнить позицию)";
      const spec = [
        item?.mark ? `Марка: ${item.mark}` : "",
        item?.gost ? `ГОСТ/ТУ: ${item.gost}` : "",
        item?.unit ? `Ед.: ${item.unit}` : "",
        item?.moq ? `Мин.партия: ${item.moq}` : "",
      ].filter(Boolean).join(" | ");

      const extra = [];
      if (this.qty) extra.push(`Объём: ${this.qty}`);
      if (this.city) extra.push(`Город: ${this.city}`);
      if (this.comment) extra.push(`Комментарий: ${this.comment}`);

      const text =
`Здравствуйте! Интересует:
Категория: ${catTitle}
Позиция: ${name}
${spec || ""}

${extra.length ? extra.join("\n") + "\n" : ""}Ссылка: ${where}`;

      const enc = encodeURIComponent(text);
      return `https://wa.me/${this.phone}?text=${enc}`;
    },

    // ====== ДАННЫЕ ======
    buildCatalog() {
      // краткая утилита для генерации айди
      let autoId = 1;
      const R = (name, mark="", gost="", unit="шт", moq="—", note="") => ({
        id: autoId++, name, mark, gost, unit, moq, note
      });

      // ---- Чёрный металл
      const black = {
        armatura: [
          R("Арматура A500С Ø8 мм",  "Ст3/25Г2С", "ГОСТ 34028-2016", "т", "от 5 т"),
          R("Арматура A500С Ø10 мм", "Ст3/25Г2С", "ГОСТ 34028-2016", "т", "от 5 т"),
          R("Арматура A500С Ø12 мм", "Ст3/25Г2С", "ГОСТ 34028-2016", "т", "от 5 т"),
          R("Арматура A500С Ø16 мм", "Ст3/25Г2С", "ГОСТ 34028-2016", "т", "от 5 т"),
          R("Арматура A500С Ø20 мм", "Ст3/25Г2С", "ГОСТ 34028-2016", "т", "от 5 т"),
        ],
        krug: [
          R("Круг Ø10 мм", "Ст3", "ГОСТ 2590-2006", "т", "от 3 т"),
          R("Круг Ø20 мм", "Ст3", "ГОСТ 2590-2006", "т", "от 3 т"),
          R("Круг Ø40 мм", "45",  "ГОСТ 2590-2006", "т", "от 3 т"),
        ],
        dvutavr: [
          R("Балка двутавровая 20Б1", "Ст3", "ГОСТ 26020-83", "т", "от 10 т"),
          R("Балка двутавровая 25Б1", "Ст3", "ГОСТ 26020-83", "т", "от 10 т"),
          R("Балка двутавровая 30Ш1", "09Г2С", "ГОСТ 26020-83", "т", "от 10 т"),
        ],
        shveller: [
          R("Швеллер 10П", "Ст3", "ГОСТ 8240-97", "т", "от 5 т"),
          R("Швеллер 16П", "Ст3", "ГОСТ 8240-97", "т", "от 5 т"),
        ],
        "list-gk": [
          R("Лист г/к 3×1500×6000", "Ст3", "ГОСТ 19903-2015", "т", "от 5 т"),
          R("Лист г/к 5×1500×6000", "Ст3", "ГОСТ 19903-2015", "т", "от 5 т"),
        ],
        "truby-profil": [
          R("Труба профильная 40×20×2", "Ст3", "ГОСТ 8645-68", "т", "от 3 т"),
          R("Труба профильная 60×40×3", "Ст3", "ГОСТ 8645-68", "т", "от 3 т"),
        ],
        // ...добавишь остальные слаги из твоей сетки
      };

      // ---- Нержавейка
      const stainless = {
        "n-list": [
          R("Лист нерж. 1.0×1250×2500", "AISI 304", "EN 10088", "т", "от 1 т"),
          R("Лист нерж. 2.0×1500×3000", "AISI 304/430", "EN 10088", "т", "от 1 т"),
        ],
        "n-truba-krugl": [
          R("Труба нерж. Ø25×1.5", "AISI 201/304", "ГОСТ/EN", "м", "от 500 м"),
          R("Труба нерж. Ø57×2.0",  "AISI 304", "ГОСТ/EN", "м", "от 300 м"),
        ],
        "n-truba-profil": [
          R("Труба нерж. 40×20×1.5", "AISI 201/304", "ГОСТ/EN", "м", "от 500 м"),
        ],
        // ...
      };

      // ---- Цветной (пример: алюминий/медь)
      const nonferrous = {
        "al-list": [
          R("Алюминиевый лист 1.5×1200×3000", "АМг2/АД0", "ГОСТ 21631-2014", "т", "от 1 т"),
          R("Алюминиевый лист 3×1500×3000",   "АМг2/АД0", "ГОСТ 21631-2014", "т", "от 1 т"),
        ],
        "al-truba-krugl": [
          R("Труба Al Ø25×2", "АД31", "ГОСТ 18475-2015", "м", "от 500 м"),
        ],
        "cu-list": [
          R("Медный лист 1×1000×2000", "М1", "ГОСТ 495-92", "т", "от 0.5 т"),
        ],
        // ...
      };

      // ---- Кабели (расширенный)
      const cable = {
        vvg: [
          R("ВВГнг-LS 2×1.5", "", "ТУ/ГОСТ", "м", "от 1000 м"),
          R("ВВГнг-LS 3×2.5", "", "ТУ/ГОСТ", "м", "от 1000 м"),
          R("ВВГнг-LS 5×6",   "", "ТУ/ГОСТ", "м", "от 500 м"),
        ],
        avvg: [
          R("АВВГнг-LS 3×4", "", "ТУ/ГОСТ", "м", "от 1000 м"),
          R("АВВГнг-LS 4×16", "", "ТУ/ГОСТ", "м", "от 500 м"),
        ],
        nym: [
          R("NYM 3×1.5", "", "VDE", "м", "от 1000 м"),
          R("NYM 3×2.5", "", "VDE", "м", "от 1000 м"),
        ],
        kg: [
          R("КГ 3×2.5", "", "ГОСТ", "м", "от 500 м"),
          R("КГ 5×10",  "", "ГОСТ", "м", "от 300 м"),
        ],
        pvs: [
          R("ПВС 2×1.5", "", "ГОСТ", "м", "от 1000 м"),
          R("ПВС 3×2.5", "", "ГОСТ", "м", "от 1000 м"),
        ],
        sip: [
          R("СИП-4 2×16", "", "ТУ", "м", "от 1000 м"),
          R("СИП-2А 3×50+54.6", "", "ТУ", "м", "от 1000 м"),
        ],
        kvvg: [
          R("КВВГ 5×1.5", "", "ГОСТ", "м", "от 1000 м"),
          R("КВВГнг 10×1.5", "", "ГОСТ", "м", "от 1000 м"),
          R("КВВГЭ 7×2.5 (экранир.)", "", "ГОСТ", "м", "от 1000 м"),
        ],
        rkgm: [
          R("РКГМ 1×1.5 (до 180°C)", "", "ТУ", "м", "от 500 м"),
          R("РКГМ-Т 1×4.0 (до 200°C)", "", "ТУ", "м", "от 300 м"),
        ],
        mgtf: [
          R("МГТФ 1×0.5 (фторопласт)", "", "ТУ", "м", "от 1000 м"),
          R("МГТФ 1×1.0 (фторопласт)", "", "ТУ", "м", "от 1000 м"),
        ],
        mkesh: [
          R("МКЭШ 7×0.35 (экранир.)", "", "ТУ", "м", "от 1000 м"),
          R("МКЭШв 2×2×0.5 (экранир.)", "", "ТУ", "м", "от 1000 м"),
        ],
        lan: [
          R("UTP Cat5e solid", "", "TIA/EIA-568", "м", "от 1000 м"),
          R("FTP Cat6a solid", "", "TIA/EIA-568", "м", "от 500 м"),
        ],
        coax: [
          R("RG-6U 75Ω", "", "ТУ", "м", "от 1000 м"),
          R("RG-59 75Ω", "", "ТУ", "м", "от 1000 м"),
        ],
        fiber: [
          R("ОК (внутр.) 8О волокон", "", "ТУ/ITU-T", "м", "от 2000 м", "SM/G.652D"),
          R("ADSS 24О, 6 кН", "", "ТУ/ITU-T", "м", "от 2000 м"),
        ],
        // авиа/спец
        bpvl:  [ R("БПВЛ 1×1.0", "", "ОСТ/ТУ", "м", "от 1000 м", "жаростойкий") ],
        bpvle: [ R("БПВЛЭ 1×1.0 (экранир.)", "", "ОСТ/ТУ", "м", "от 1000 м") ],
        pml:   [ R("ПМЛ 1×0.75", "", "ТУ", "м", "от 1000 м", "лако-стойкий") ],
        ptl:   [ R("ПТЛ 1×1.0", "", "ТУ", "м", "от 1000 м", "термостойкий") ],
        apvl:  [ R("АПВЛ 1×2.5", "", "ТУ", "м", "от 1000 м") ],
      };

      return { black, stainless, nonferrous, cable };
    },
    aliases() {
      // ЧП: карта user-friendly названий по slug
      return {
        black: {
          armatura: "Арматура",
          krug: "Круг",
          dvutavr: "Двутавровая балка",
          shveller: "Швеллер",
          "list-gk": "Лист г/к",
          "truby-profil": "Трубы профильные",
          // ...
        },
        stainless: {
          "n-list": "Лист нержавеющий",
          "n-truba-krugl": "Труба нержавеющая круглая",
          "n-truba-profil": "Труба нержавеющая профильная",
          // ...
        },
        nonferrous: {
          "al-list": "Алюминиевый лист",
          "al-truba-krugl": "Алюминиевая труба круглая",
          "cu-list": "Медный лист",
          // ...
        },
        cable: {
          vvg: "ВВГ / ВВГнг-LS",
          avvg: "АВВГ / АВВГнг-LS",
          nym: "NYM",
          kg: "КГ (гибкий)",
          pvs: "ПВС",
          sip: "СИП",
          kvvg: "КВВГ / КВВГнг",
          rkgm: "РКГМ / РКГМ-Т",
          mgtf: "МГТФ",
          mkesh: "МКЭШ / МКЭШв",
          lan: "UTP/FTP LAN",
          coax: "Коаксиальный",
          fiber: "ОК / ADSS",
          bpvl: "БПВЛ (авиа)",
          bpvle: "БПВЛЭ (экранир.)",
          pml: "ПМЛ",
          ptl: "ПТЛ",
          apvl: "АПВЛ",
        },
      };
    },

    // ===== Утилиты =====
    debounce(fn, ms) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), ms);
      };
    },
  },
};
</script>

<style scoped>
:root{
  --bg:#0b0f14; --panel:#0f1620; --line:#1f2a3a;
  --text:#e9f0f5; --muted:#b9c6d4; --gold:#c1a269; --glow:#00d4e0;
}

.category{ background:linear-gradient(180deg,#0b0f14 0%, #0b0f14 40%, #0e131b 100%); padding:72px 0; }
.container{ max-width:1200px; margin:0 auto; padding:0 16px; }

/* Хлебные крошки */
.crumbs{ display:flex; gap:8px; align-items:center; color:var(--muted); font-size:14px; margin-bottom:8px; }
.crumbs a{ color:var(--muted); text-decoration:none; }
.crumbs a:hover{ color:var(--text); }
.crumbs .current{ color:var(--text); }

/* Заголовки */
.head h1{ margin:4px 0 4px; color:var(--text); font-size:26px; font-weight:900; }
.head .sub{ margin:0 0 16px; color:var(--muted); }

/* Фильтры */
.filters{ display:flex; gap:10px; flex-wrap:wrap; margin:14px 0; }
.filters input[type="search"], .filters select{
  background:#0f1620; border:1px solid rgba(255,255,255,.08); color:var(--text);
  padding:10px 12px; border-radius:10px; outline:none;
}
.filters input[type="search"]{ min-width:260px; flex:1 1 320px; }
.filters .clear{ background:transparent; border:1px solid rgba(255,255,255,.18); color:var(--muted); padding:10px 12px; border-radius:10px; cursor:pointer; }
.filters .clear:hover{ color:var(--text); border-color:rgba(255,255,255,.35); }

/* Таблица */
.table-wrap{ border:1px solid var(--line); border-radius:12px; overflow:hidden; background:linear-gradient(180deg,#121a24,#0f1620 60%, #0e141d); box-shadow:0 6px 18px rgba(0,0,0,.25); }
.table{ width:100%; border-collapse:separate; border-spacing:0; }
thead th{
  position:sticky; top:0; z-index:2; background:#0f1620; color:var(--muted);
  text-align:left; font-weight:700; font-size:13px; padding:12px 12px; border-bottom:1px solid var(--line);
}
tbody td{ padding:12px; color:var(--text); border-bottom:1px solid rgba(255,255,255,.06); vertical-align:middle; }
tbody tr:hover{ background:rgba(255,255,255,.03); }
td.name small{ display:block; color:#9ab3c9; margin-top:4px; }

/* Действия */
.actions{ display:flex; gap:8px; flex-wrap:wrap; }
.btn{
  border:1px solid rgba(255,255,255,.18); background:transparent; color:var(--text);
  padding:8px 10px; border-radius:10px; cursor:pointer; font-weight:700;
}
.btn:hover{ border-color:rgba(0,212,224,.55); }
.wa{
  display:inline-block; padding:8px 10px; border-radius:10px; background:#30d158; color:#0b0f14; text-decoration:none; font-weight:800;
}
.wa.big{ padding:12px 16px; border-radius:12px; font-size:15px; }

/* Пусто */
.empty{ text-align:center; padding:36px 12px; border:1px dashed var(--line); border-radius:12px; margin-top:14px; }
.empty h3{ color:var(--text); margin:0 0 6px; }
.empty p{ color:var(--muted); margin:0 0 12px; }

/* Пагинация */
.pager{ display:flex; align-items:center; gap:12px; justify-content:space-between; margin-top:12px; color:var(--muted); }
.pager button{
  border:1px solid rgba(255,255,255,.18); background:transparent; color:var(--text);
  padding:8px 12px; border-radius:10px; cursor:pointer;
}
.pager button:disabled{ opacity:.4; cursor:not-allowed; }
.pager .count{ margin-left:auto; }

/* Модал */
.modal-backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.5); display:flex; align-items:center; justify-content:center; padding:16px; z-index:2000;
}
.modal{
  width:min(720px, 100%); background:#0f1620; border:1px solid var(--line); border-radius:14px; box-shadow:0 20px 60px rgba(0,0,0,.5);
}
.modal header{
  display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid var(--line);
}
.modal header h3{ color:var(--text); margin:0; font-size:18px; }
.modal header .x{
  background:transparent; border:none; color:#9ab3c9; font-size:22px; width:36px; height:36px; cursor:pointer; border-radius:8px;
}
.modal header .x:hover{ background:rgba(255,255,255,.06); color:#d7e6f7; }
.modal .body{ padding:14px; display:grid; gap:12px; }
.modal label{ display:grid; gap:6px; color:var(--muted); font-size:14px; }
.modal input, .modal textarea{
  background:#0c1219; border:1px solid rgba(255,255,255,.12); color:var(--text); padding:10px 12px; border-radius:10px; outline:none;
}
.modal footer{ padding:12px 14px; border-top:1px solid var(--line); display:flex; gap:10px; align-items:center; }
.modal .ghost{
  background:transparent; border:1px solid rgba(255,255,255,.18); color:var(--muted); padding:10px 12px; border-radius:10px; cursor:pointer;
}
.modal .ghost:hover{ color:var(--text); border-color:rgba(255,255,255,.35); }
</style>
