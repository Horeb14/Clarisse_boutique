/* ============================================================
   CLARISSE BOUTIQUE – script.js
============================================================ */

/* ---------- DATA PRODUITS ---------- */
const PRODUCTS = [
  // FEMME – Parfums
  { id:1, name:'Sugar Candy', cat:'parfum', genre:'femme', price:9000,
    img:'images/sugar_candy_parfum_femme.png', badge:'Coup de cœur',
    desc:'Une explosion de douceur florale aux notes de sucre et de pétales. Féminine et addictive, elle laisse une trace lumineuse.' },
  { id:2, name:'Ka Ly', cat:'parfum', genre:'femme', price:4500,
    img:'images/ka_ly_parfum_femme.png', badge:'Best-seller',
    desc:'Une féminité délicate aux effluves de fleurs blanches et de bois tendre. Poétique et intime, elle révèle votre grâce naturelle.' },
  { id:3, name:'Valentino', cat:'parfum', genre:'femme', price:6000,
    img:'images/valentino_parfum_mixte.png', badge:'Best-seller',
    desc:'Un sillage floral et poudré d\'une douceur envoûtante. Romantique et raffiné, il habille la peau d\'une aura inoubliable.' },

  // FEMME – Déodorants
  { id:23, name:'Confetti London', cat:'deodorant', genre:'femme', price:2500,
    img:'images/confetti_london_deodorant_femme.png', badge:null,
    desc:'Un déodorant frais et féminin signé Confetti London, aux notes légères et florales. Protection longue durée avec une touche de douceur Londres.' },
  { id:4, name:'Confetti', cat:'deodorant', genre:'femme', price:2500,
    img:'images/confetti_deodorant_femme.png', badge:null,
    desc:'Un déodorant pétillant aux notes fruitées et florales. Légèreté et bonne humeur garanties tout au long de la journée.' },
  { id:5, name:'Nivea Pearl & Beauty', cat:'deodorant', genre:'femme', price:1500,
    img:'images/nivea_deodorant_femme.png', badge:null,
    desc:'Une protection douce aux extraits de perle pour une peau soyeuse. Fraîcheur longue durée et soin en un geste délicat.' },

  // FEMME – Brumes
  { id:6, name:'Candy Crush', cat:'brume', genre:'femme', price:1200,
    img:'images/candy_crush_brume_femme.png', badge:null,
    desc:'Une brume sucrée et enveloppante aux notes de fruits rouges et de vanille. Un nuage de douceur pour sublimer votre peau.' },

  // FEMME – Chouchous
  { id:7, name:'Chouchou 2 couleurs', cat:'chouchou', genre:'femme', price:1500,
    img:'https://i.pinimg.com/736x/ea/8a/90/ea8a900e00218a275e8410eb647d2c1f.jpg', badge:null,
    desc:'Scrunchie tendance en deux couleurs assorties. Doux pour les cheveux et parfait pour toutes les occasions.' },
  { id:8, name:'Chouchou 1 couleur', cat:'chouchou', genre:'femme', price:1000,
    img:'https://i.pinimg.com/736x/66/16/5d/66165d1d4057ddd1507e37ca4174d1cb.jpg', badge:null,
    desc:'Scrunchie classique en une couleur unie. Élégant, doux et polyvalent pour toutes les tenues.' },

  // HOMME – Parfums
  { id:9, name:'Balea Men', cat:'parfum', genre:'homme', price:5500,
    img:'images/hero_homme.png', badge:'Best-seller',
    desc:'Un boisé aromatique d\'une intensité rare, aux accords frais de cèdre et d\'encens. Pour l\'homme qui s\'impose avec élégance.' },

  // HOMME – Déodorants
  { id:10, name:'Balea Men', cat:'deodorant', genre:'homme', price:2000,
    img:'images/balea_men_deodorant_homme.png', badge:null,
    desc:'Un déodorant masculin efficace aux senteurs fraîches et boisées. Idéal pour affronter la journée avec assurance.' },
  { id:11, name:'Riggs', cat:'deodorant', genre:'homme', price:2000,
    img:'images/riggs_deodorant_homme.png', badge:null,
    desc:'Un déodorant longue durée aux notes intenses et viriles. Protection maximale pour les hommes actifs.' },

  // MIXTE – Parfums
  { id:12, name:'Caramel Cascade', cat:'parfum', genre:'mixte', price:3500,
    img:'images/caramel_cascade_parfum_femme.png', badge:'Best-seller',
    desc:'Une gourmandise olfactive aux notes caramel et vanille. Enveloppante et douce, elle séduit par sa chaleur sucrée irrésistible.' },
  { id:13, name:'Mosuf', cat:'parfum', genre:'mixte', price:2500,
    img:'images/mosuf_parfum_mixte.png', badge:null,
    desc:'Une fragrance boisée et ambrée aux notes profondes et mystérieuses. Polyvalente et envoûtante pour chaque moment.' },
  { id:14, name:'Fidèle', cat:'parfum', genre:'mixte', price:500,
    img:'images/fidel_fidel_mixte.png', badge:null,
    desc:'Une fragrance fidèle à son nom, aux senteurs durables et rassurantes. Un classique indémodable pour toutes les saisons.' },

  // MIXTE – Déodorants
  { id:16, name:'Balea', cat:'deodorant', genre:'mixte', price:2000,
    img:'images/balea_deodorant_mixte.png', badge:null,
    desc:'Un soin déodorant efficace aux senteurs fraîches et neutres. Idéal pour une routine quotidienne simple et raffinée.' },
  { id:17, name:'Dove', cat:'deodorant', genre:'mixte', price:2500,
    img:'images/dove_deodorant_mixte.png', badge:null,
    desc:'Une protection douce et hydratante pour une peau soyeuse. Fraîcheur garantie toute la journée avec soin.' },
  { id:18, name:'Nivea Homme', cat:'deodorant', genre:'mixte', price:2000,
    img:'images/nivea_deodorant_homme.png', badge:null,
    desc:'Un déodorant efficace et doux pour une protection longue durée. Fraîcheur intense et confort au quotidien.' },

  // MIXTE – Brumes
  { id:19, name:'Phlur', cat:'brume', genre:'mixte', price:2500,
    img:'images/phlur_brume_mixte.png', badge:null,
    desc:'Une brume légère et poétique aux notes florales et musquées. Une caresse parfumée qui dure toute la journée.' },

  // MIXTE – Huiles de corps
  { id:20, name:'Fidèle & Infidèle', cat:'huile', genre:'mixte', price:500,
    img:'images/fidel_fidel_mixte.png', badge:null,
    desc:'Deux huiles corps complémentaires, fidèles à leur promesse de soin et de douceur pour une peau nourrie en profondeur.' },
  { id:21, name:'Vaseline', cat:'huile', genre:'mixte', price:5000,
    img:'images/vaseline_huile_mixte.png', badge:null,
    desc:'Une huile corps Vaseline premium, riche et nourrissante. Hydratation profonde et éclat naturel pour une peau sublimée.' },
  { id:22, name:'Infidèle', cat:'huile', genre:'mixte', price:500,
    img:'images/infidele_huile_mixte.png', badge:null,
    desc:'Une huile corps légère aux senteurs subtiles et addictives. Idéale pour nourrir et parfumer la peau subtilement.' },
];

/* ---------- BEST SELLERS (accueil) — Confetti London ajouté ---------- */
const BESTSELLERS_IDS = [1, 2, 3, 12, 9, 23];

/* ---------- STATE ---------- */
let cart = [];
let currentProduct = null;

/* ---------- NAVIGATION SPA ---------- */
function showPage(pageId, filterCat, pushState = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.nav-link[data-page="${pageId}"]`).forEach(l => l.classList.add('active'));

  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('burger').classList.remove('open');

  closeSearch();

  window.scrollTo({ top: 0 });

  // Gestion historique navigateur (bouton retour mobile)
  if (pushState) {
    const state = { page: pageId, filter: filterCat || null };
    const url = '#' + pageId + (filterCat ? '/' + filterCat : '');
    history.pushState(state, '', url);
  }

  if (pageId === 'accueil') renderBestsellers();
  if (pageId === 'femme') renderCollection('femme', filterCat || 'all');
  if (pageId === 'homme') renderCollection('homme', filterCat || 'all');
  if (pageId === 'mixte') renderCollection('mixte', filterCat || 'all');
}

// Bouton retour natif du navigateur
window.addEventListener('popstate', e => {
  if (e.state && e.state.page) {
    showPage(e.state.page, e.state.filter, false);
  } else {
    showPage('accueil', null, false);
  }
});

/* ---------- RENDER HELPERS ---------- */
function formatPrice(p) {
  return p.toLocaleString('fr-FR') + ' FCFA';
}

function productCardHTML(prod) {
  const badge = prod.badge ? `<div class="product-badge ${prod.badge === 'Coup de cœur' ? 'coup' : ''}">${prod.badge}</div>` : '';
  return `
    <div class="product-card" data-id="${prod.id}">
      <div class="product-card-img">
        <img src="${prod.img}" alt="${prod.name}" loading="lazy" />
        ${badge}
      </div>
      <div class="product-body">
        <span class="product-cat">${prod.cat.charAt(0).toUpperCase()+prod.cat.slice(1)}</span>
        <h3 class="product-name">${prod.name}</h3>
        <p class="product-desc">${prod.desc}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(prod.price)}</span>
          <div class="product-actions">
            <button class="prod-btn prod-btn-wa" data-id="${prod.id}" title="Commander via WhatsApp"><i class="fab fa-whatsapp"></i></button>
            <button class="prod-btn prod-btn-cart" data-id="${prod.id}" title="Ajouter au panier"><i class="fas fa-shopping-bag"></i></button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderBestsellers() {
  const grid = document.getElementById('bestsellersGrid');
  if (!grid) return;
  const prods = BESTSELLERS_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  grid.innerHTML = prods.map(productCardHTML).join('');
  bindCardEvents(grid);
}

function renderCollection(genre, catFilter) {
  const grid = document.getElementById(genre + 'Grid');
  const countEl = document.getElementById(genre + 'Count');
  if (!grid) return;

  let prods = PRODUCTS.filter(p => p.genre === genre);
  if (catFilter && catFilter !== 'all') prods = prods.filter(p => p.cat === catFilter);

  countEl && (countEl.textContent = prods.length + ' produit' + (prods.length > 1 ? 's' : ''));
  grid.innerHTML = prods.map(productCardHTML).join('');
  bindCardEvents(grid);

  const filters = document.querySelectorAll(`#${genre}Filters .sf-item`);
  filters.forEach(f => {
    f.classList.toggle('active', f.dataset.cat === catFilter || (!catFilter && f.dataset.cat === 'all'));
  });
}

function bindCardEvents(container) {
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.prod-btn')) return;
      openModal(+card.dataset.id);
    });
  });
  container.querySelectorAll('.prod-btn-wa').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prod = PRODUCTS.find(p => p.id === +btn.dataset.id);
      if (prod) orderWhatsApp(prod);
    });
  });
  container.querySelectorAll('.prod-btn-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prod = PRODUCTS.find(p => p.id === +btn.dataset.id);
      if (prod) addToCart(prod);
    });
  });
}

/* ---------- ORDER WHATSAPP (fonction manquante corrigée) ---------- */
function orderWhatsApp(prod) {
  const waMsg = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\nJe souhaite commander : ${prod.name} – ${formatPrice(prod.price)}`);
  window.open(`https://wa.me/22958774871?text=${waMsg}`, '_blank');
}

/* ---------- RECHERCHE ---------- */
function openSearch() {
  document.getElementById('searchOverlay').classList.remove('hidden');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
  document.getElementById('searchEmpty').classList.add('hidden');
  setTimeout(() => document.getElementById('searchInput').focus(), 100);
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function doSearch(query) {
  const q = query.toLowerCase().trim();
  const resultsEl = document.getElementById('searchResults');
  const emptyEl = document.getElementById('searchEmpty');
  if (!q) { resultsEl.innerHTML = ''; emptyEl.classList.add('hidden'); return; }

  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    p.genre.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );

  if (!results.length) {
    resultsEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');
  resultsEl.innerHTML = results.map(p => `
    <div class="search-item" data-id="${p.id}">
      <div class="search-item-img"><img src="${p.img}" alt="${p.name}" /></div>
      <div class="search-item-info">
        <span class="search-item-cat">${p.genre} · ${p.cat}</span>
        <div class="search-item-name">${p.name}</div>
        <div class="search-item-price">${formatPrice(p.price)}</div>
      </div>
      <button class="search-item-wa" data-id="${p.id}" title="Commander"><i class="fab fa-whatsapp"></i></button>
    </div>
  `).join('');

  resultsEl.querySelectorAll('.search-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.closest('.search-item-wa')) return;
      closeSearch();
      openModal(+item.dataset.id);
    });
  });
  resultsEl.querySelectorAll('.search-item-wa').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prod = PRODUCTS.find(p => p.id === +btn.dataset.id);
      if (prod) orderWhatsApp(prod);
    });
  });
}

/* ---------- MODAL ---------- */
function openModal(id) {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;
  currentProduct = prod;

  document.getElementById('modalImg').src = prod.img;
  document.getElementById('modalImg').alt = prod.name;
  document.getElementById('modalName').textContent = prod.name;
  document.getElementById('modalPrice').textContent = formatPrice(prod.price);
  document.getElementById('modalDesc').textContent = prod.desc;

  const genreLabel = prod.genre === 'femme' ? 'Femme' : prod.genre === 'homme' ? 'Homme' : 'Mixte';
  const typeLabel = prod.cat.charAt(0).toUpperCase() + prod.cat.slice(1);
  const badgeHTML = prod.badge ? `<span class="modal-tag badge">${prod.badge}</span>` : '';
  document.getElementById('modalTags').innerHTML =
    `<span class="modal-tag genre">${genreLabel}</span><span class="modal-tag type">${typeLabel}</span>${badgeHTML}`;

  const waMsg = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\nJe souhaite commander : ${prod.name} – ${formatPrice(prod.price)}`);
  document.getElementById('modalWa').href = `https://wa.me/22958774871?text=${waMsg}`;

  document.getElementById('modalOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  currentProduct = null;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.getElementById('modalAddCart').addEventListener('click', () => {
  if (currentProduct) { addToCart(currentProduct); closeModal(); }
});

/* ---------- CART ---------- */
function addToCart(prod) {
  const existing = cart.find(i => i.id === prod.id);
  if (existing) existing.qty++;
  else cart.push({ ...prod, qty: 1 });
  renderCart();
  showToast(`${prod.name} ajouté au panier ✓`);
  updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
  updateCartCount();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { renderCart(); updateCartCount(); }
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = formatPrice(total);

  if (!cart.length) {
    container.innerHTML = `<div class="cart-empty-state"><p>Votre panier est vide.</p><small>Découvrez nos produits et ajoutez vos favoris</small></div>`;
    document.getElementById('checkoutBtn').href = 'https://wa.me/22958774871';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" /></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-del" data-id="${item.id}" title="Retirer"><i class="fas fa-trash-alt"></i></button>
    </div>`).join('');

  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeQty(+btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1));
  });
  container.querySelectorAll('.cart-item-del').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(+btn.dataset.id));
  });

  const items = cart.map(i => `- ${i.name} x${i.qty} (${formatPrice(i.price * i.qty)})`).join('\n');
  const msg = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\nJe souhaite commander les produits suivants :\n\n${items}\n\nTotal : ${formatPrice(total)}`);
  document.getElementById('checkoutBtn').href = `https://wa.me/22958774871?text=${msg}`;
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = total;
  el.classList.toggle('show', total > 0);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.classList.add('hidden'), 400);
  }, 2500);
}

/* ---------- NAVBAR SCROLL ---------- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

/* ---------- BURGER ---------- */
document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('burger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
});

/* ---------- SEARCH EVENTS ---------- */
document.getElementById('searchBtn').addEventListener('click', openSearch);
document.getElementById('searchClose').addEventListener('click', closeSearch);
document.getElementById('searchOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('searchOverlay')) closeSearch();
});
document.getElementById('searchInput').addEventListener('input', e => doSearch(e.target.value));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

/* ---------- ALL NAVIGATION CLICKS ---------- */
document.body.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (!el) return;
  e.preventDefault();
  const page = el.dataset.page;
  const filter = el.dataset.filter || null;
  showPage(page, filter);
});

/* ---------- SIDEBAR FILTERS ---------- */
['femme','homme','mixte'].forEach(genre => {
  const container = document.getElementById(genre + 'Filters');
  if (!container) return;
  container.addEventListener('click', e => {
    const item = e.target.closest('.sf-item');
    if (!item) return;
    container.querySelectorAll('.sf-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    renderCollection(genre, item.dataset.cat);
  });
});

/* ---------- CONTACT FORM ---------- */
const sendWaBtn = document.getElementById('sendWa');
if (sendWaBtn) {
  sendWaBtn.addEventListener('click', () => {
    const nom = document.getElementById('contactNom').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMsg').value.trim();
    if (!nom || !msg) { showToast('Veuillez remplir les champs requis.'); return; }
    const text = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\n\nNom : ${nom}\nEmail : ${email || 'Non renseigné'}\n\nMessage :\n${msg}`);
    window.open(`https://wa.me/22958774871?text=${text}`, '_blank');
  });
}

/* ---------- INIT ---------- */
// Remplace l'état initial sans créer d'entrée en double
history.replaceState({ page: 'accueil', filter: null }, '', '#accueil');
showPage('accueil', null, false);
renderCart();