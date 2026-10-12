// Portfolio content. To add a project, append an object here.
// Each row is a list of media items shown side by side; `ar` is width / height.
// Images live in assets/web/<src>.webp (full) and <src>-sm.webp (thumbnail).
const MEDIA = 'assets/web/';
const VIDEO_AR = 1.869;

const PROJECTS = [
  {
    title: 'Meat Grinder',
    type: 'Industrial product · Hard-surface',
    text: 'A commercial meat grinder modeled part by part: feed tray, auger housing, cutting plate, locking ring and motor body, finished in brushed stainless steel for a studio product shot and a short assembly animation.',
    tags: ['Hard-surface', 'Mechanical parts', 'Product render'],
    rows: [
      [
        { src: 'grinder/grinder', ar: 0.563, cap: 'Studio render' },
        { src: 'grinder/grinder1', ar: 0.563, cap: 'Studio render — front' },
      ],
      [
        { src: 'grinder/grinder1', video: true, ar: 1, loop: true, cap: 'Assembly animation' },
        { src: 'grinder/grinder', video: true, cap: 'Scene walkthrough in Blender' },
      ],
    ],
  },
  {
    title: 'Glass Perfume Bottles',
    type: 'Product visualization · Study',
    text: 'A study of an interlocking-ring perfume bottle in three tinted glass variants. The focus is on thick glass: refraction, liquid volume and embossed lettering.',
    tags: ['Product visualization', 'Glass materials', 'Study'],
    rows: [
      [{ src: 'perfume1/perfume1_1', ar: 1.778, cap: 'Three colour variants' }],
      [
        { src: 'perfume1/perfume1', ar: 0.563, cap: 'Single bottle render' },
        { src: 'perfume1/perfume1', video: true, cap: 'Scene walkthrough in Blender' },
      ],
    ],
  },
  {
    title: 'Rose Flacon',
    type: 'Product visualization',
    text: 'A perfume bottle with a petal-shaped glass stopper and a rose-gold band wrapping the body. Rendered as a vertical product shot on a soft pink backdrop.',
    tags: ['Product visualization', 'Glass and metal', 'Rendering'],
    rows: [
      [
        { src: 'perfume2/perfume2', ar: 0.563, cap: 'Product render' },
        { src: 'perfume2/perfume2_1', ar: 0.563, cap: 'Product render — alternate angle' },
      ],
      [{ src: 'perfume2/perfume2', video: true, cap: 'Scene walkthrough in Blender' }],
    ],
  },
  {
    title: 'Stone Shower Room',
    type: 'Interior visualization',
    text: 'A stone-walled bathroom with a ceiling rain shower, a timber vanity and a vessel sink. Warm and cool light sources play against the rough stone and falling water.',
    tags: ['Interior', 'Materials', 'Lighting'],
    rows: [
      [{ src: 'bathroom/bathroom', ar: 1.067, cap: 'Final render' }],
      [{ src: 'bathroom/bathroom', video: true, cap: 'Scene walkthrough in Blender' }],
    ],
  },
  {
    title: 'Tree Bookcase',
    type: 'Furniture design',
    text: 'A wall-mounted bookcase shaped as a tree: the trunk is built from layered panels and the branches carry the shelves, with backlighting behind the silhouette.',
    tags: ['Furniture', 'Product design', 'Rendering'],
    rows: [[{ src: 'treebookcase', ar: 1, cap: 'Final render' }]],
  },
  {
    title: 'Modular Kitchen Set',
    type: 'Game-ready asset · Low-poly',
    text: 'A low-poly kitchen unit with wall cabinets, extractor hood, sink, gas hob and drawers, shown textured, in solid view, and in wireframe.',
    tags: ['Low-poly', 'Game asset', 'UV and texturing'],
    rows: [
      [
        { src: 'kitchensystem/4', ar: 1.36, cap: 'Textured model' },
        { src: 'kitchensystem/6', ar: 1.283, cap: 'Textured model — reverse angle' },
      ],
      [
        { src: 'kitchensystem/7', ar: 1.351, cap: 'Solid view' },
        { src: 'kitchensystem/8', ar: 1.365, cap: 'X-ray view' },
        { src: 'kitchensystem/9', ar: 1.357, cap: 'Wireframe' },
      ],
      [
        { src: 'kitchensystem/5', ar: 1.35, cap: 'Front elevation — textured' },
        { src: 'kitchensystem/2', ar: 1.255, cap: 'Back elevation' },
        { src: 'kitchensystem/3', ar: 0.73, cap: 'Side elevation' },
      ],
    ],
  },
];

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
};

function renderProjects() {
  const root = document.getElementById('projects');
  PROJECTS.forEach((p, pi) => {
    const items = p.rows.flat();
    const art = el('article', 'project wrap');

    const info = el('div', 'project__info');
    const inner = el('div', 'project__sticky');
    inner.append(
      el('p', 'label', `${String(pi + 1).padStart(2, '0')} — ${p.type}`),
      el('h3', 'project__title', p.title),
      el('p', 'project__text', p.text),
    );
    const tags = el('ul', 'tags');
    p.tags.forEach((t) => tags.append(el('li', '', t)));
    inner.append(tags);
    info.append(inner);

    const media = el('div', 'project__media');
    p.rows.forEach((row) => {
      const r = el('div', 'row');
      row.forEach((m) => {
        const tile = el('button', 'tile' + (m.video ? ' tile--video' : ''));
        tile.type = 'button';
        tile.style.setProperty('--ar', m.ar || VIDEO_AR);
        tile.setAttribute('aria-label', `${p.title}: ${m.cap}`);
        const img = el('img');
        img.src = MEDIA + m.src + (m.video ? '-poster.webp' : '-sm.webp');
        img.alt = `${p.title} — ${m.cap}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        tile.append(img);
        if (m.video) tile.append(el('span', 'tile__play', '▶ Play video'));
        tile.append(el('span', 'tile__cap', m.cap));
        tile.addEventListener('click', () => openLightbox(p, items, items.indexOf(m)));
        r.append(tile);
      });
      media.append(r);
    });

    art.append(info, media);
    root.append(art);
  });
}

// Lightbox
const lb = document.getElementById('lightbox');
const stage = lb.querySelector('.lightbox__stage');
const caption = lb.querySelector('.lightbox__caption');
const lbPrev = lb.querySelector('.lightbox__prev');
const lbNext = lb.querySelector('.lightbox__next');
let current = { project: null, items: [], index: 0 };
let lastFocus = null;

function showItem() {
  const { project, items, index } = current;
  const m = items[index];
  stage.replaceChildren();
  if (m.video) {
    const v = el('video');
    v.src = MEDIA + m.src + '.mp4';
    v.poster = MEDIA + m.src + '-poster.webp';
    v.controls = true;
    v.autoplay = true;
    v.muted = true;
    v.loop = !!m.loop;
    v.playsInline = true;
    stage.append(v);
  } else {
    const img = el('img');
    img.src = MEDIA + m.src + '.webp';
    img.alt = `${project.title} — ${m.cap}`;
    stage.append(img);
  }
  caption.textContent = `${project.title} — ${m.cap}  ·  ${index + 1} / ${items.length}`;
  const single = items.length < 2;
  lbPrev.hidden = single;
  lbNext.hidden = single;
}

function openLightbox(project, items, index) {
  lastFocus = document.activeElement;
  current = { project, items, index };
  lb.hidden = false;
  document.body.classList.add('no-scroll');
  showItem();
  lb.querySelector('.lightbox__close').focus();
}

function closeLightbox() {
  lb.hidden = true;
  stage.replaceChildren();
  document.body.classList.remove('no-scroll');
  if (lastFocus) lastFocus.focus();
}

function step(d) {
  const n = current.items.length;
  current.index = (current.index + d + n) % n;
  showItem();
}

lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => step(-1));
lbNext.addEventListener('click', () => step(1));
lb.addEventListener('click', (e) => {
  if (e.target === lb || e.target === stage) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 50 && current.items.length > 1) step(dx < 0 ? 1 : -1);
});

// Nav background once the hero is scrolled past
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('nav--solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

document.getElementById('year').textContent = new Date().getFullYear();
renderProjects();
