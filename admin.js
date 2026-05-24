/* ============================================================
   CLARISSE BOUTIQUE – admin.js
============================================================ */

const SUPABASE_URL = "https://zwanhqbugrjmmeebmhtt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YW5ocWJ1Z3JqbW1lZWJtaHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTg2NDMsImV4cCI6MjA5NTE5NDY0M30.x1ug6h55FogY_gqkJYx8zmLqYPr-_ldV33SiwgOZAbM";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let editingId = null;
let imageActuelle = null;

/* ---------- AUTH ---------- */
document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const { error } = await db.auth.signInWithPassword({
    email:    document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  });
  if (error) showAlert('loginError', 'Email ou mot de passe incorrect.');
  else ouvrirDashboard();
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await db.auth.signOut();
  location.reload();
});

db.auth.getSession().then(({ data }) => {
  if (data.session) ouvrirDashboard();
});

function ouvrirDashboard() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  chargerProduits();
}

/* ---------- PRODUITS ---------- */
async function chargerProduits() {
  const { data } = await db.from('products').select('*').order('genre').order('name');
  const produits = data || [];
  document.getElementById('productCount').textContent = produits.length + ' produit(s)';
  document.getElementById('tableBody').innerHTML = produits.map(p => `
    <tr>
      <td><img src="${p.img}" alt="${p.name}" class="prod-img" /></td>
      <td><strong>${p.name}</strong></td>
      <td><span class="pill pill-cat">${p.cat}</span></td>
      <td>${p.genre}</td>
      <td>${p.price.toLocaleString('fr-FR')} CFA</td>
      <td>${p.badge ? `<span class="pill pill-badge">${p.badge}</span>` : '—'}</td>
      <td class="actions-cell">
        <button class="btn btn-sm btn-secondary" onclick="modifierProduit(${p.id})">Modifier</button>
        <button class="btn btn-sm btn-danger" onclick="supprimerProduit(${p.id}, \`${p.name.replace(/`/g,'')}\`)">Supprimer</button>
      </td>
    </tr>
  `).join('');
}

/* ---------- UPLOAD PHOTO ---------- */
document.getElementById('prodImgFile').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const preview = document.getElementById('prodImgPreview');
  preview.src = URL.createObjectURL(file);
  preview.classList.add('visible');
  document.getElementById('uploadLabel').innerHTML = '<strong>' + file.name + '</strong><br/>Photo sélectionnée';
});

async function uploaderImage(file) {
  const ext      = file.name.split('.').pop();
  const nomFichier = Date.now() + '.' + ext;
  const { error } = await db.storage.from('produits').upload(nomFichier, file, { upsert: true });
  if (error) throw new Error(error.message);
  const { data } = db.storage.from('produits').getPublicUrl(nomFichier);
  return data.publicUrl;
}

/* ---------- FORMULAIRE ---------- */
document.getElementById('productForm').addEventListener('submit', async e => {
  e.preventDefault();

  const fichier = document.getElementById('prodImgFile').files[0];
  let imgUrl = imageActuelle || 'images/placeholder.jpg';

  if (fichier) {
    try {
      imgUrl = await uploaderImage(fichier);
    } catch (err) {
      showAlert('formError', 'Erreur upload photo : ' + err.message);
      return;
    }
  }

  const payload = {
    name:        document.getElementById('prodName').value.trim(),
    price:       parseInt(document.getElementById('prodPrice').value),
    cat:         document.getElementById('prodCat').value,
    genre:       document.getElementById('prodGenre').value,
    img:         imgUrl,
    badge:       document.getElementById('prodBadge').value.trim() || null,
    description: document.getElementById('prodDesc').value.trim()
  };

  let error;
  if (editingId) {
    ({ error } = await db.from('products').update(payload).eq('id', editingId));
  } else {
    const { data: max } = await db.from('products').select('id').order('id', { ascending: false }).limit(1);
    const nextId = max && max.length ? max[0].id + 1 : 100;
    ({ error } = await db.from('products').insert([{ id: nextId, ...payload }]));
  }

  if (error) showAlert('formError', 'Erreur : ' + error.message);
  else {
    showAlert('formSuccess', editingId ? 'Produit modifié.' : 'Produit ajouté.');
    resetFormulaire();
    chargerProduits();
  }
});

async function modifierProduit(id) {
  const { data } = await db.from('products').select('*').eq('id', id).single();
  if (!data) return;
  editingId = id;
  imageActuelle = data.img;
  document.getElementById('prodName').value  = data.name;
  document.getElementById('prodPrice').value = data.price;
  document.getElementById('prodCat').value   = data.cat;
  document.getElementById('prodGenre').value = data.genre;
  document.getElementById('prodBadge').value = data.badge || '';
  document.getElementById('prodDesc').value  = data.description;

  const preview = document.getElementById('prodImgPreview');
  preview.src = data.img;
  preview.classList.add('visible');
  document.getElementById('uploadLabel').innerHTML = '<strong>Photo actuelle</strong><br/>Cliquer pour en choisir une autre';
  document.getElementById('formTitle').textContent = 'Modifier un produit';
  document.getElementById('submitBtn').textContent = 'Enregistrer';
  document.getElementById('cancelBtn').style.display = 'inline-block';
  document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

async function supprimerProduit(id, nom) {
  if (!confirm(`Supprimer "${nom}" ? Action irréversible.`)) return;
  await db.from('products').delete().eq('id', id);
  chargerProduits();
}

document.getElementById('cancelBtn').addEventListener('click', resetFormulaire);

function resetFormulaire() {
  editingId = null;
  imageActuelle = null;
  document.getElementById('productForm').reset();
  document.getElementById('formTitle').textContent = 'Ajouter un produit';
  document.getElementById('submitBtn').textContent = 'Ajouter';
  document.getElementById('cancelBtn').style.display = 'none';
  document.getElementById('prodImgPreview').classList.remove('visible');
  document.getElementById('uploadLabel').innerHTML = '<strong>Cliquer pour choisir une photo</strong><br/>JPG, PNG, WEBP';
  ['formError', 'formSuccess'].forEach(id => document.getElementById(id).style.display = 'none');
}

/* ---------- UTILS ---------- */
function showAlert(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}
