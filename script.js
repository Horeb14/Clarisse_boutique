/* ============================================================
   CLARISSE BOUTIQUE – script.js
============================================================ */

/* ---------- SUPABASE ---------- */
const SUPABASE_URL = "https://zwanhqbugrjmmeebmhtt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YW5ocWJ1Z3JqbW1lZWJtaHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTg2NDMsImV4cCI6MjA5NTE5NDY0M30.x1ug6h55FogY_gqkJYx8zmLqYPr-_ldV33SiwgOZAbM";

/* ---------- DATA PRODUITS ---------- */
let PRODUCTS = [];

/* ---------- BEST SELLERS (accueil) — Confetti London ajouté ---------- */
const BESTSELLERS_IDS = [1, 2, 3, 9, 12, 15];

/* ---------- STATE ---------- */
let cart = JSON.parse(localStorage.getItem('clarisse_cart') || '[]');
let currentProduct = null;

function saveCart() {
  localStorage.setItem('clarisse_cart', JSON.stringify(cart));
}

/* ---------- NAVIGATION SPA ---------- */
function showPage(pageId, filterCat, pushState = true) {
  window.scrollTo({ top: 0 });
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.nav-link[data-page="${pageId}"]`).forEach(l => l.classList.add('active'));

  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('burger').classList.remove('open');

  closeSearch();

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
  if (e.state && e.state.page === 'famille') {
    renderFamillePage(e.state.famille);
  } else if (e.state && e.state.page) {
    showPage(e.state.page, e.state.filter, false);
  } else {
    showPage('accueil', null, false);
  }
});

/* ---------- RENDER HELPERS ---------- */
function formatPrice(p) {
  return p.toLocaleString('fr-FR') + ' cfa';
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
  const prods = BESTSELLERS_IDS.map(id => PRODUCTS.find(p => p.id === id && !p.masque)).filter(Boolean);
  grid.innerHTML = prods.map(productCardHTML).join('');
  bindCardEvents(grid);
}

function renderCollection(genre, catFilter) {
  const grid = document.getElementById(genre + 'Grid');
  const countEl = document.getElementById(genre + 'Count');
  if (!grid) return;

  let prods = PRODUCTS.filter(p => p.genre === genre && !p.masque);
  if (catFilter && catFilter !== 'all') prods = prods.filter(p => p.cat === catFilter);

  prods.sort((a, b) => {
    if (a.cat === 'chouchou' && b.cat !== 'chouchou') return 1;
    if (a.cat !== 'chouchou' && b.cat === 'chouchou') return -1;
    return a.name.localeCompare(b.name, 'fr');
  });

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

/* ---------- PAGE FAMILLE ---------- */
function renderFamillePage(famille) {
  const prods = PRODUCTS.filter(p => p.famille === famille);
  const titre = prods[0] ? prods[0].name.replace(/\s+(rouge|vert|bleu|noir|blanc|rose|jaune|violet|orange|beige|\d+ml)$/i, '').trim() : 'Autres formes';
  document.getElementById('familleTitle').textContent = titre;
  const grid = document.getElementById('familleGrid');
  grid.innerHTML = prods.map(productCardHTML).join('');
  bindCardEvents(grid);
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page-famille').classList.remove('hidden');
  window.scrollTo({ top: 0 });
}

function showFamille(famille) {
  closeModal();
  renderFamillePage(famille);
  history.pushState({ page: 'famille', famille }, '', '#famille');
}

document.getElementById('familleRetour').addEventListener('click', () => history.back());

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
  document.getElementById('modalDesc').textContent = prod.desc;

  const genreLabel = prod.genre === 'femme' ? 'Femme' : prod.genre === 'homme' ? 'Homme' : 'Mixte';
  const typeLabel = prod.cat.charAt(0).toUpperCase() + prod.cat.slice(1);
  const badgeHTML = prod.badge ? `<span class="modal-tag badge">${prod.badge}</span>` : '';
  document.getElementById('modalTags').innerHTML =
    `<span class="modal-tag genre">${genreLabel}</span><span class="modal-tag type">${typeLabel}</span>${badgeHTML}`;

  const badgesHTML = prod.cat === 'chouchou'
    ? `<span><i class="fas fa-hands"></i> Fait à la main</span>
       <span><i class="fas fa-magic"></i> Au crochet</span>
       <span><i class="fas fa-feather-alt"></i> Doux pour les cheveux</span>
       <span><i class="fas fa-truck"></i> Livraison rapide</span>`
    : `<span><i class="fas fa-star"></i> Qualité premium</span>
       <span><i class="fas fa-truck"></i> Livraison rapide</span>
       <span><i class="fas fa-magic"></i> Senteur longue durée</span>
       <span><i class="fab fa-whatsapp"></i> Conseil WhatsApp</span>`;
  document.getElementById('modalBadges').innerHTML = badgesHTML;

  const famillEl = document.getElementById('modalFamille');
  const autresFormes = (prod.famille && prod.famille.trim())
    ? PRODUCTS.filter(p => p.famille === prod.famille && p.id !== prod.id)
    : [];
  if (autresFormes.length > 0) {
    famillEl.innerHTML = `<button class="btn-autres-formes" id="btnVoirFormes"><i class="fas fa-th-large"></i> Voir les autres formes de ce produit (${autresFormes.length})</button>`;
    document.getElementById('btnVoirFormes').addEventListener('click', () => showFamille(prod.famille));
  } else {
    famillEl.innerHTML = '';
  }

  const variantesEl = document.getElementById('modalVariantes');
  if (prod.variantes && prod.variantes.length) {
    const first = prod.variantes[0];
    currentProduct = { ...prod, price: first.prix, varianteChoisie: first.label };
    document.getElementById('modalPrice').textContent = formatPrice(first.prix);

    variantesEl.innerHTML = `
      <div class="modal-variants">
        <span class="mv-label">Taille :</span>
        <div class="mv-options">
          ${prod.variantes.map((v, i) => `
            <button class="mv-btn${i === 0 ? ' active' : ''}" data-prix="${v.prix}" data-label="${v.label}">${v.label}</button>
          `).join('')}
        </div>
      </div>`;

    variantesEl.querySelectorAll('.mv-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        variantesEl.querySelectorAll('.mv-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const prix = parseInt(btn.dataset.prix);
        const label = btn.dataset.label;
        document.getElementById('modalPrice').textContent = formatPrice(prix);
        currentProduct = { ...prod, price: prix, varianteChoisie: label };
        const waMsg = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\nJe souhaite commander : ${prod.name} (${label}) – ${formatPrice(prix)}`);
        document.getElementById('modalWa').href = `https://wa.me/22958774871?text=${waMsg}`;
      });
    });

    const waMsg = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\nJe souhaite commander : ${prod.name} (${first.label}) – ${formatPrice(first.prix)}`);
    document.getElementById('modalWa').href = `https://wa.me/22958774871?text=${waMsg}`;
  } else {
    variantesEl.innerHTML = '';
    currentProduct = prod;
    document.getElementById('modalPrice').textContent = formatPrice(prod.price);
    const waMsg = encodeURIComponent(`Salut Clarisse, j'espère que tu vas bien 😊\nJe souhaite commander : ${prod.name} – ${formatPrice(prod.price)}`);
    document.getElementById('modalWa').href = `https://wa.me/22958774871?text=${waMsg}`;
  }

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
  saveCart();
  renderCart();
  showToast(`${prod.name} ajouté au panier ✓`);
  updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); updateCartCount(); }
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
async function init() {
  try {
    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data } = await db.from('products').select('*');
    if (data) PRODUCTS = data.map(p => ({ ...p, desc: p.description }));
  } catch (e) {
    console.warn('Chargement produits depuis Supabase impossible:', e);
  }
  history.replaceState({ page: 'accueil', filter: null }, '', '#accueil');
  showPage('accueil', null, false);
  updateCartCount();
  renderCart();
}

init();