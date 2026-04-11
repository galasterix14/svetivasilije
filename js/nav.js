/**
 * nav.js — Injects header, navigation, footer, sidebar into every page.
 * Also handles client-side routing so only <main> swaps on nav clicks —
 * the Facebook sidebar never reloads.
 *
 * Each page sets two variables before including this script:
 *   const LANG         = 'sv' | 'sr';
 *   const CURRENT_PAGE = 'home' | 'historia' | etc.
 */

(function () {

  /* ══════════════════════════════════════════════════════════════
     SPECIAL HOURS
  ══════════════════════════════════════════════════════════════ */

  window.SPECIAL_HOURS = {

    // ── JANUARI ─────────────────────────────────────────────────
    '2026-01-06': { open: '08:00', close: '18:00' }, // Tue – Liturgi 09:00 + Vesper 17:00
    '2026-01-07': { open: '07:00', close: '14:00' }, // Wed – Božić Liturgi 08:00
    '2026-01-08': { open: '08:00', close: '14:00' }, // Thu – Liturgi 09:00
    '2026-01-09': { open: '08:00', close: '14:00' }, // Fri – Liturgi 09:00
    '2026-01-13': { open: '12:00', close: '18:00' }, // Tue – Vesper + moleben 17:00
    '2026-01-14': { open: '08:00', close: '14:00' }, // Wed – Liturgi Sv. Vasilije / Nova god.
    '2026-01-18': { open: '08:00', close: '18:00' }, // Sun – Liturgi 09:00 + Vesper 17:00
    '2026-01-19': { open: '08:00', close: '18:00' }, // Mon – Bogojavljenje Liturgi 09:00 + Vesper 17:00
    '2026-01-20': { open: '08:00', close: '14:00' }, // Tue – Liturgi 09:00
    '2026-01-26': { open: '12:00', close: '18:00' }, // Mon – Vesper 17:00
    '2026-01-27': { open: '08:00', close: '14:00' }, // Tue – Liturgi Sv. Sava 09:00

    // ── FEBRUARI ────────────────────────────────────────────────
    '2026-02-11': { open: '12:00', close: '18:00' }, // Wed – Vesper 17:00
    '2026-02-12': { open: '08:00', close: '14:00' }, // Thu – Liturgi Sv. Tri Jerarha 09:00
    '2026-02-14': { open: '08:00', close: '18:00' }, // Sat – Zadušnice Liturgi 09:00 + Vesper 17:00
    '2026-02-23': { open: '12:00', close: '18:00' }, // Mon – Kanon Sv. Andreja 17:00
    '2026-02-24': { open: '12:00', close: '18:00' }, // Tue – Kanon Sv. Andreja 17:00
    '2026-02-25': { open: '12:00', close: '18:00' }, // Wed – Kanon Sv. Andreja 17:00
    '2026-02-26': { open: '12:00', close: '18:00' }, // Thu – Kanon Sv. Andreja 17:00
    '2026-02-28': { open: '08:00', close: '18:00' }, // Sat – Liturgi 09:00 + Vesper 17:00

    // ── MARS ────────────────────────────────────────────────────
    '2026-03-11': { open: '08:00', close: '14:00' }, // Wed – Preosvećena Liturgi 09:00
    '2026-03-25': { open: '08:00', close: '14:00' }, // Wed – Preosvećena Liturgi 09:00

    // ── APRIL ───────────────────────────────────────────────────
    '2026-04-07': { open: '08:00', close: '14:00' }, // Tue – Blagovesti Liturgi 09:00
    '2026-04-09': { open: '08:00', close: '18:00' }, // Thu – Veliki četvrtak Liturgi 09:00 + Vesper 17:00
    '2026-04-10': { open: '12:00', close: '18:00' }, // Fri – Veliki petak Vesper 17:00
    '2026-04-11': { open: '08:00', close: '14:00' }, // Sat – Velika Subota Liturgi 09:00
    '2026-04-12': { open: '06:00', close: '14:00' }, // Sun – Vaskrsnje jutrenije 07:00 + Liturgi 08:00
    '2026-04-13': { open: '08:00', close: '14:00' }, // Mon – Vaskrsni ponedeljak 09:00
    '2026-04-14': { open: '08:00', close: '14:00' }, // Tue – Vaskrsni utorak 09:00

    // ── MAJ ─────────────────────────────────────────────────────
    '2026-05-05': { open: '12:00', close: '18:00' }, // Tue – Vesper 17:00
    '2026-05-06': { open: '08:00', close: '14:00' }, // Wed – Đurđevdan Liturgi 09:00
    '2026-05-11': { open: '12:00', close: '18:00' }, // Mon – Vesper 17:00
    '2026-05-12': { open: '08:00', close: '14:00' }, // Tue – Sv. Vasilije Ostroški 09:00
    '2026-05-17': { open: '09:00', close: '14:00' }, // Sun – Liturgi 10:00 (later start)
    '2026-05-20': { open: '12:00', close: '18:00' }, // Wed – Vesper 17:00
    '2026-05-21': { open: '08:00', close: '14:00' }, // Thu – Spasovdan Liturgi 09:00
    '2026-05-30': { open: '08:00', close: '14:00' }, // Sat – Zadušnice Liturgi 09:00

    // ── JUNI ────────────────────────────────────────────────────
    '2026-06-01': { open: '08:00', close: '14:00' }, // Mon – Duhovni ponedeljak 09:00
    '2026-06-02': { open: '08:00', close: '14:00' }, // Tue – Duhovni utorak 09:00
    '2026-06-03': { open: '08:00', close: '14:00' }, // Wed – Sv. car Konstantin 09:00

    // ── JULI ────────────────────────────────────────────────────
    '2026-07-07': { open: '08:00', close: '14:00' }, // Tue – Ivanjdan 09:00

    // ── AUGUSTI ─────────────────────────────────────────────────
    '2026-08-18': { open: '12:00', close: '18:00' }, // Tue – Vesper 17:00
    '2026-08-19': { open: '08:00', close: '14:00' }, // Wed – Preobraženje 09:00
    '2026-08-27': { open: '12:00', close: '18:00' }, // Thu – Vesper 17:00
    '2026-08-28': { open: '08:00', close: '14:00' }, // Fri – Uspenje Presvete Bogorodice 09:00

    // ── SEPTEMBER ───────────────────────────────────────────────
    '2026-09-10': { open: '12:00', close: '18:00' }, // Thu – Vesper 17:00
    '2026-09-11': { open: '08:00', close: '14:00' }, // Fri – Usekovanje glave Sv. Jovana 09:00
    '2026-09-20': { open: '08:00', close: '18:00' }, // Sun – Liturgi 09:00 + Vesper 17:00
    '2026-09-21': { open: '08:00', close: '14:00' }, // Mon – Rođenje Presvete Bogorodice 09:00

    // ── OKTOBER ─────────────────────────────────────────────────
    '2026-10-10': { open: '08:00', close: '18:00' }, // Sat – Zadušnice Liturgi 09:00 + Vesper 17:00
    '2026-10-26': { open: '12:00', close: '18:00' }, // Mon – Vesper 17:00
    '2026-10-27': { open: '08:00', close: '14:00' }, // Tue – Sv. Petka / Slava KSS 09:00
    '2026-10-30': { open: '12:00', close: '18:00' }, // Fri – Vesper 17:00
    '2026-10-31': { open: '08:00', close: '14:00' }, // Sat – Sv. Luka / Sv. Petar Cetinjski 09:00

    // ── NOVEMBER ────────────────────────────────────────────────
    '2026-11-07': { open: '08:00', close: '18:00' }, // Sat – Zadušnice Liturgi 09:00 + Vesper 17:00
    '2026-11-20': { open: '12:00', close: '18:00' }, // Fri – Vesper 17:00
    '2026-11-21': { open: '08:00', close: '18:00' }, // Sat – Sv. Arh. Mihailo Liturgi 09:00 + Vesper 17:00

    // ── DECEMBER ────────────────────────────────────────────────
    '2026-12-03': { open: '12:00', close: '18:00' }, // Thu – Vesper 17:00
    '2026-12-04': { open: '08:00', close: '14:00' }, // Fri – Vavedenje Presvete Bogorodice 09:00
    '2026-12-18': { open: '12:00', close: '18:00' }, // Fri – Vesper 17:00
    '2026-12-19': { open: '08:00', close: '14:00' }, // Sat – Sv. Nikola 09:00

  };

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVZn3c-DzmMd_ejUQoNVrw1P0gvoIcmY3DDJUYBCOnTQfTm4OO7Yq6035NSnuLqmpQZCgJvZ8XaBC/pub?gid=104970246&single=true&output=csv';

  async function loadSheetOverrides() {
    try {
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      const rows = text.trim().split('\n').slice(1);
      rows.forEach(row => {
        const cols = row.match(/(".*?"|[^,]+)(?=,|$)/g);
        if (!cols || cols.length < 3) return;
        const date  = cols[0].replace(/"/g, '').trim();
        const open  = cols[1].replace(/"/g, '').trim();
        const close = cols[2].replace(/"/g, '').trim();
        if (date && open && close) {
          SPECIAL_HOURS[date] = { open, close };
        }
      });
    } catch (e) {
      console.log('Sheet unavailable, using hardcoded hours.');
    }
  }

  const SCHEDULE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVZn3c-DzmMd_ejUQoNVrw1P0gvoIcmY3DDJUYBCOnTQfTm4OO7Yq6035NSnuLqmpQZCgJvZ8XaBC/pub?gid=139665269&single=true&output=csv';

  async function loadScheduleData() {
    const CACHE_KEY      = 'schedule_data_cache';
    const CACHE_TIME_KEY = 'schedule_data_time';
    const CACHE_TTL      = 1000 * 60 * 30; // 30 minutes

    try {
      const cached    = sessionStorage.getItem(CACHE_KEY);
      const cacheTime = sessionStorage.getItem(CACHE_TIME_KEY);
      const isValid   = cached && cacheTime && (Date.now() - parseInt(cacheTime)) < CACHE_TTL;

      let text;
      if (isValid) {
        text = cached;
      } else {
        const response = await fetch(SCHEDULE_URL);
        text = await response.text();
        sessionStorage.setItem(CACHE_KEY, text);
        sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      }

      const rows = text.trim().split('\n').slice(1);
      window.SCHEDULE_DATA = rows.map(row => {
        const cols = row.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
        return {
          date:       (cols[0] || '').replace(/"/g, '').trim(),
          service_sr: (cols[1] || '').replace(/"/g, '').trim(),
          service_sv: (cols[2] || '').replace(/"/g, '').trim(),
          time:       (cols[3] || '').replace(/"/g, '').trim(),
        };
      }).filter(e => e.date && (e.service_sr || e.service_sv));

    } catch (e) {
      window.SCHEDULE_DATA = [];
      console.log('Schedule unavailable.');
    }
  }

  /* ══════════════════════════════════════════════════════════════
     NAV DEFINITIONS
  ══════════════════════════════════════════════════════════════ */

  const NAV = {
    sv: [
      { id: 'home',         label: 'Startsida',            href: 'index.html' },
      { id: 'historia',     label: 'Historia',              href: 'historia.html' },
      { id: 'fakta',        label: 'Fakta',                 href: 'fakta.html' },
      //{ id: 'kyrkan',       label: 'Kyrkan & Församlingen', href: 'kyrkan.html' },
      //{ id: 'biskop',       label: 'Biskop',                href: 'biskop.html' },
      { id: 'prost',        label: 'Präst',                 href: 'prost.html' },
      { id: 'gudstjanster', label: 'Gudstjänster',          href: 'gudstjanster.html' },
      //{ id: 'styrelse',     label: 'Styrelse / KSS / Kör',  href: 'styrelse.html' },
      { id: 'galleri',      label: 'Bilder & Arkiv',        href: 'galleri.html' },
      //{ id: 'lankar',       label: 'Länkar',                href: 'lankar.html' },
      //{ id: 'givare',       label: 'Givare',                href: 'givare.html' },
      //{ id: 'uppforande',   label: 'Uppförande i kyrkan',   href: 'uppforande.html' },
      //{ id: 'boner',        label: 'Böner',                 href: 'boner.html' },
      //{ id: 'namn',         label: 'Ortodoxa namn',         href: 'namn.html' },
      { id: 'bibliotek',    label: 'Bibliotek',             href: 'bibliotek.html' },
    ],
    sr: [
      { id: 'home',         label: 'Почетна',               href: 'index.html' },
      { id: 'istorijat',    label: 'Историјат',             href: 'istorijat.html' },
      { id: 'crkva',        label: 'Црква и парохија',      href: 'crkva.html' },
      { id: 'episkop',      label: 'Епископ',               href: 'episkop.html' },
      { id: 'svestenik',    label: 'Свештеник',             href: 'svestenik.html' },
      { id: 'raspored',     label: 'Распоред Служби',       href: 'raspored.html' },
      { id: 'odbor',        label: 'Одбор / КСС / Хор',    href: 'odbor.html' },
      { id: 'slike',        label: 'Слике и Архива',        href: 'slike.html' },
      { id: 'linkovi',      label: 'Линкови',               href: 'linkovi.html' },
      { id: 'prilozhnici',  label: 'Приложници',            href: 'prilozhnici.html' },
      { id: 'ponasanje',    label: 'Понашање у цркви',      href: 'ponasanje.html' },
      { id: 'molitve',      label: 'Молитве',               href: 'molitve.html' },
      { id: 'imena',        label: 'Имена',                 href: 'imena.html' },
      { id: 'bibliotek',    label: 'Библиотека',            href: 'bibliotek.html' },
    ]
  };

  /* ══════════════════════════════════════════════════════════════
     STATE — current lang and page, mutable by the router
  ══════════════════════════════════════════════════════════════ */

  let currentLang = (typeof LANG !== 'undefined') ? LANG : 'sv';
  let currentPage = (typeof CURRENT_PAGE !== 'undefined') ? CURRENT_PAGE : 'home';

  /* ══════════════════════════════════════════════════════════════
     PATH HELPERS
  ══════════════════════════════════════════════════════════════ */

  // Depth 0 = root index.html, depth 1 = sv/ or sr/ pages
  const depth = (typeof PAGE_DEPTH !== 'undefined') ? PAGE_DEPTH : 1;
  const root  = depth === 0 ? './' : '../';

  /* ══════════════════════════════════════════════════════════════
     OPEN STATUS
  ══════════════════════════════════════════════════════════════ */

  function getOpenStatus() {
    const now     = new Date();
    const day     = now.getDay();
    const time    = now.getHours() + now.getMinutes() / 60;
    const today   = now.toISOString().split('T')[0];

    let openHour, closeHour, hoursLabel;

    if (SPECIAL_HOURS[today]) {
      const s    = SPECIAL_HOURS[today];
      openHour   = parseInt(s.open);
      closeHour  = parseInt(s.close);
      hoursLabel = `${s.open}–${s.close}`;
    } else if (day === 0) {
      openHour = 8; closeHour = 14; hoursLabel = '08:00–14:00';
    } else if (day === 6) {
      openHour = 12; closeHour = 18; hoursLabel = '12:00–18:00';
    } else {
      openHour = 12; closeHour = 17; hoursLabel = '12:00–17:00';
    }

    if (openHour === null) {
      return `<div class="header-hours"><span style="color:#e57373;">● Stängt</span></div>`;
    }

    const isOpen = time >= openHour && time < closeHour;
    const dot    = isOpen
      ? `<span style="color:#4caf50;">● Öppet</span>`
      : `<span style="color:#e57373;">● Stängt</span>`;

    return `<div class="header-hours">${dot} &nbsp;Idag: ${hoursLabel}</div>`;
  }

  /* ══════════════════════════════════════════════════════════════
     BUILD HEADER
  ══════════════════════════════════════════════════════════════ */

  const TITLE = {
    sv: {
      line1: 'Serbisk Ortodoxa Kyrkoförsamlingen',
      line2: 'Helige Basilius den Store',
      line3: 'Helsingborg – Sverige'
    },
    sr: {
      line1: 'Св. Василије Велики у Хелсингборгу',
      line2: 'Шведска'
    }
  };

  function buildHeader() {
    const t = TITLE[currentLang] || TITLE.sv;
    const titleHtml = currentLang === 'sv'
      ? `<div class="header-title">
           <h1>${t.line1}<br>${t.line2}</h1>
           <div class="subtitle">${t.line3}</div>
           ${getOpenStatus()}
         </div>`
      : `<div class="header-title">
           <h1>${t.line1}</h1>
           <div class="subtitle">${t.line2}</div>
           ${getOpenStatus()}
         </div>`;

    return `
      <img class="header-crest"
           src="${root}images/crest.jpg"
           alt="Serbisk Ortodox Kyrka – vapensköld">
      ${titleHtml}
      <img class="header-church-photo"
           src="${root}images/crkva.jpg"
           alt="Kyrkobyggnad i Helsingborg">
      <button id="nav-toggle" aria-label="Öppna meny" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  /* ══════════════════════════════════════════════════════════════
     BUILD NAV
  ══════════════════════════════════════════════════════════════ */

  function buildNav() {
    const items = NAV[currentLang] || NAV.sv;

    const liHtml = items.map(item => {
      const active = (item.id === currentPage) ? ' active' : '';
      return `<li>
        <a href="${item.href}" class="nav-link${active}" data-page="${item.id}">
          <span class="nav-cross"></span>
          <span>${item.label}</span>
        </a>
      </li>`;
    }).join('\n');

    const srUrl = root + 'sr/index.html';
    const svUrl = root + 'sv/index.html';

    const flags = `
      <div class="lang-flags">
        <a href="${srUrl}" title="Српски">
          <img src="${root}images/flag_sr.png" alt="Српски"
               onerror="this.outerHTML='<span style=&quot;font-size:1.3rem;cursor:pointer&quot; title=&quot;Српски&quot;>🇷🇸</span>'">
        </a>
        <a href="${svUrl}" title="Svenska">
          <img src="${root}images/flag_sv.png" alt="Svenska"
               onerror="this.outerHTML='<span style=&quot;font-size:1.3rem;cursor:pointer&quot; title=&quot;Svenska&quot;>🇸🇪</span>'">
        </a>
      </div>`;

    return `<ul>${liHtml}</ul>${flags}`;
  }

  /* ══════════════════════════════════════════════════════════════
     BUILD RIGHT SIDEBAR
  ══════════════════════════════════════════════════════════════ */

  function buildRightSidebar() {
    return `
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fp%2FSerbisk-Ortodoxa-Kyrkan-Helsingborg-%25D0%25A1%25D1%2580%25D0%25BF%25D1%2581%25D0%25BA%25D0%25B0-%25D0%259F%25D1%2580%25D0%25B0%25D0%25B2%25D0%25BE%25D1%2581%25D0%25BB%25D0%25B0%25D0%25B2%25D0%25BD%25D0%25B0-%25D0%25A6%25D1%2580%25D0%25BA%25D0%25B2%25D0%25B0-%25D0%25A5%25D0%25B5%25D0%25BB%25D1%2581%25D0%25B8%25D0%25BD%25D0%25B3%25D0%25B1%25D0%25BE%25D1%2580%25D0%25B3-100064707277784%2F&tabs=timeline&width=330&height=665&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false"
        width="330"
        height="665"
        style="border:none;overflow:hidden"
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
      </iframe>
    `;
  }

  /* ══════════════════════════════════════════════════════════════
     BUILD FOOTER
  ══════════════════════════════════════════════════════════════ */

  function buildFooter() {
    return `
      Serbisk Ortodoxa Kyrkan &nbsp;|&nbsp;
      Nedre Eneborgs vägen 7, 252 68 Helsingborg, Sverige<br>
      Tel/fax: <a href="tel:+4642181736">+46 42 181 736</a>
      &nbsp;|&nbsp;
      E-mail: <a href="mailto:info@svetivasilije.se">info@svetivasilije.se</a>
      &nbsp;|&nbsp;
      <a href="https://www.svetivasilije.se">www.svetivasilije.se</a>
    `;
  }

  /* ══════════════════════════════════════════════════════════════
     AFTER-CONTENT HOOKS
     Re-run any JS that needs to work on freshly swapped content
  ══════════════════════════════════════════════════════════════ */

  function initContentScripts() {
    document.querySelectorAll('.gallery-event-header').forEach(function (btn) {
      if (btn.closest('#gallery-container')) return; // ← add this line
      btn.addEventListener('click', function () {
        btn.closest('.gallery-event').classList.toggle('open');
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     UPDATE ACTIVE NAV LINK
  ══════════════════════════════════════════════════════════════ */

  function updateActiveLink() {
    document.querySelectorAll('#site-nav .nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.page === currentPage);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     CLIENT-SIDE ROUTER
  ══════════════════════════════════════════════════════════════ */

  async function navigateTo(href, pushState = true) {
    // href is relative to the current lang folder, e.g. "historia.html"
    try {
      const response = await fetch(href);
      if (!response.ok) throw new Error('Page not found');

      const html   = await response.text();
      const parser = new DOMParser();
      const doc    = parser.parseFromString(html, 'text/html');

      // Extract new main content
      const newMain = doc.getElementById('main-content');
      if (!newMain) throw new Error('No main-content in fetched page');

      // Extract LANG and CURRENT_PAGE from the fetched page's inline script
      const scripts = doc.querySelectorAll('script:not([src])');
      scripts.forEach(s => {
        const langMatch = s.textContent.match(/const\s+LANG\s*=\s*['"](\w+)['"]/);
        const pageMatch = s.textContent.match(/const\s+CURRENT_PAGE\s*=\s*['"](\w+)['"]/);
        if (langMatch) currentLang = langMatch[1];
        if (pageMatch) currentPage = pageMatch[1];
      });

      // Swap content
      const mainEl = document.getElementById('main-content');
      mainEl.innerHTML = newMain.innerHTML;

      // Update page title
      const newTitle = doc.querySelector('title');
      if (newTitle) document.title = newTitle.textContent;

      // Update URL in browser bar
      if (pushState) {
        history.pushState({ href, lang: currentLang, page: currentPage }, '', href);
      }

      // Update active nav highlight
      updateActiveLink();

      // Re-run content scripts
      initContentScripts();

      // Re-run any inline scripts in the new content
      mainEl.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });

      // Scroll content area back to top
      mainEl.scrollTop = 0;

    } catch (err) {
      // Fallback: just navigate normally if fetch fails
      window.location.href = href;
      return;
    }

    // Call page-specific data functions if data is already loaded
    if (typeof window.loadThisWeek === 'function' && window.SCHEDULE_DATA) {
  window.loadThisWeek();
    }
    if (typeof window.loadThisWeekSr === 'function' && window.SCHEDULE_DATA) {
      window.loadThisWeekSr();
    }
    if (typeof window.loadFullScheduleSv === 'function') {
      window.loadFullScheduleSv();
    }
    if (typeof window.loadFullScheduleSr === 'function') {
      window.loadFullScheduleSr();
    }
  }

  /* ══════════════════════════════════════════════════════════════
     WIRE UP NAV CLICKS
  ══════════════════════════════════════════════════════════════ */

  function attachNavListeners() {
    document.querySelectorAll('#site-nav .nav-link').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = a.getAttribute('href');

        // Let language-switch links (containing /sv/ or /sr/) reload fully
        // so the correct LANG is set for the whole shell
        if (href.includes('/sv/') || href.includes('/sr/') || href.startsWith('../')) {
          return; // normal browser navigation
        }

        e.preventDefault();
        navigateTo(href);

        // Close mobile nav if open
        const navEl    = document.getElementById('site-nav');
        const toggleEl = document.getElementById('nav-toggle');
        if (navEl)    navEl.classList.remove('nav-open');
        if (toggleEl) { toggleEl.classList.remove('open'); toggleEl.setAttribute('aria-expanded', 'false'); }
      });
    });
    // Also intercept content links with class "internal-link"
    document.getElementById('main-content').addEventListener('click', function (e) {
      const a = e.target.closest('a.internal-link');
      if (!a) return;
      e.preventDefault();
      navigateTo(a.getAttribute('href'));
    });
  }

  /* ══════════════════════════════════════════════════════════════
     HANDLE BROWSER BACK / FORWARD
  ══════════════════════════════════════════════════════════════ */

  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.href) {
      if (e.state.lang) currentLang = e.state.lang;
      if (e.state.page) currentPage = e.state.page;
      navigateTo(e.state.href, false);
    }
  });

  /* ══════════════════════════════════════════════════════════════
     HAMBURGER TOGGLE
  ══════════════════════════════════════════════════════════════ */

  function attachHamburger() {
    const toggleBtn = document.getElementById('nav-toggle');
    const navEl     = document.getElementById('site-nav');
    if (toggleBtn && navEl) {
      toggleBtn.addEventListener('click', function () {
        const isOpen = navEl.classList.toggle('nav-open');
        toggleBtn.classList.toggle('open', isOpen);
        toggleBtn.setAttribute('aria-expanded', isOpen);
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', async function () {
    // Load Google Sheet overrides first
    await Promise.all([loadSheetOverrides(), loadScheduleData()]);
    if (typeof window.loadThisWeek === 'function') window.loadThisWeek();
    if (typeof window.loadThisWeekSr === 'function') window.loadThisWeekSr();
    if (typeof window.loadFullScheduleSv === 'function') window.loadFullScheduleSv();
    if (typeof window.loadFullScheduleSr === 'function') window.loadFullScheduleSr();

    // Inject shell elements
    const headerEl = document.getElementById('site-header');
    const navEl    = document.getElementById('site-nav');
    const footerEl = document.getElementById('site-footer');
    const rightEl  = document.getElementById('right-sidebar');

    if (headerEl) headerEl.innerHTML = buildHeader();
    if (navEl)    navEl.innerHTML    = buildNav();
    if (footerEl) footerEl.innerHTML = buildFooter();
    if (rightEl)  rightEl.innerHTML  = buildRightSidebar();

    // Inject lightbox once
    if (!document.getElementById('lightbox')) {
      const lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.innerHTML = '<img id="lightbox-img" src="" alt="">';
      document.body.appendChild(lb);
      lb.addEventListener('click', function() {
        lb.classList.remove('open');
        document.getElementById('lightbox-img').src = '';
      });
    }

    // Wire up interactions
    attachNavListeners();
    attachHamburger();
    initContentScripts();

    // Push initial state so back button works from first page
    history.replaceState(
      { href: window.location.pathname, lang: currentLang, page: currentPage },
      '',
      window.location.pathname
    );
  });

})();
