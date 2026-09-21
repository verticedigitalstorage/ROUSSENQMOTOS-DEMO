/*
 * Protótipo comercial Roussenq Motos.
 * As fotos vieram do Instagram público informado pelo cliente.
 * Ano, km, cilindrada, versão, descrição e preço abaixo são DADOS FICTÍCIOS DE DEMONSTRAÇÃO.
 */

const CONFIG = {
  whatsapp: "5548988121232",
  instagram: "https://www.instagram.com/leandro.r.goulart/",
  storageKey: "roussenq-motos-demo-v1",
};

const DEMO_MOTOS = [
  {
    id: "honda-cg-titan",
    brand: "Honda",
    model: "CG 160 Titan",
    version: "Titan",
    year: 2023,
    km: 18400,
    cc: 160,
    price: 18900,
    image: "./assets/moto-01.jpg",
    images: ["./assets/moto-01.jpg", "./assets/moto-03.jpg", "./assets/moto-06.jpg"],
    description: "Uma opção versátil para o dia a dia, com condução leve e posição confortável. Informações comerciais ilustrativas para esta demonstração.",
    sold: false,
  },
  {
    id: "honda-elite",
    brand: "Honda",
    model: "Elite 125",
    version: "Scooter",
    year: 2024,
    km: 6200,
    cc: 125,
    price: 14200,
    image: "./assets/moto-02.jpg",
    images: ["./assets/moto-02.jpg", "./assets/moto-05.jpg", "./assets/moto-01.jpg"],
    description: "Scooter compacta e prática para deslocamentos urbanos. Dados de ano, km e valor usados somente para apresentar o funcionamento do catálogo.",
    sold: false,
  },
  {
    id: "honda-cg-fan",
    brand: "Honda",
    model: "CG 150 Fan",
    version: "ESDi",
    year: 2015,
    km: 38600,
    cc: 150,
    price: 12500,
    image: "./assets/moto-03.jpg",
    images: ["./assets/moto-03.jpg", "./assets/moto-06.jpg", "./assets/moto-01.jpg"],
    description: "Moto urbana de proposta simples e robusta. Conteúdo de demonstração, sujeito à substituição pelo estoque e dados oficiais.",
    sold: false,
  },
  {
    id: "yamaha-crosser",
    brand: "Yamaha",
    model: "Crosser 150",
    version: "Z",
    year: 2022,
    km: 14700,
    cc: 150,
    price: 20500,
    image: "./assets/moto-04.jpg",
    images: ["./assets/moto-04.jpg", "./assets/moto-06.jpg", "./assets/moto-03.jpg"],
    description: "Perfil aventureiro, suspensão elevada e proposta versátil para cidade e estrada. Especificações demonstrativas.",
    sold: false,
  },
  {
    id: "honda-pcx",
    brand: "Honda",
    model: "PCX 150",
    version: "DLX",
    year: 2020,
    km: 22100,
    cc: 150,
    price: 17800,
    image: "./assets/moto-05.jpg",
    images: ["./assets/moto-05.jpg", "./assets/moto-02.jpg", "./assets/moto-04.jpg"],
    description: "Scooter confortável, com visual marcante e uso urbano descomplicado. Dados comerciais fictícios usados no protótipo.",
    sold: false,
  },
  {
    id: "honda-cg-start",
    brand: "Honda",
    model: "CG 160 Start",
    version: "Start",
    year: 2021,
    km: 26300,
    cc: 160,
    price: 15700,
    image: "./assets/moto-06.jpg",
    images: ["./assets/moto-06.jpg", "./assets/moto-03.jpg", "./assets/moto-01.jpg"],
    description: "Uma motocicleta direta e econômica para a rotina. Valores e especificações são apenas exemplos para a apresentação.",
    sold: false,
  },
];

const main = document.querySelector("main");
const toast = document.querySelector(".toast");
let activeBrand = "Todas";
let searchTerm = "";

function getMotos() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey));
    return Array.isArray(saved) ? saved : structuredClone(DEMO_MOTOS);
  } catch {
    return structuredClone(DEMO_MOTOS);
  }
}

function saveMotos(motos) {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(motos));
}

function resetMotos() {
  localStorage.removeItem(CONFIG.storageKey);
  showToast("Dados de demonstração restaurados.");
  renderRoute();
}

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function km(value) {
  return `${Number(value || 0).toLocaleString("pt-BR")} km`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function slugify(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function whatsappUrl(moto) {
  const message = moto
    ? `Olá! Vi a ${moto.brand} ${moto.model} no site da Roussenq Motos e gostaria de mais informações.`
    : "Olá! Visitei o site da Roussenq Motos e gostaria de mais informações sobre as motos disponíveis.";
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

function bindWhatsapp(root = document) {
  root.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const id = link.dataset.whatsapp;
    const moto = id && id !== "geral" ? getMotos().find((item) => item.id === id) : null;
    link.href = whatsappUrl(moto);
    link.target = "_blank";
    link.rel = "noreferrer";
  });
}

function motoCard(moto) {
  return `
    <article class="moto-card">
      <a href="#moto/${encodeURIComponent(moto.id)}" aria-label="Ver detalhes de ${escapeHtml(moto.brand)} ${escapeHtml(moto.model)}">
        <div class="moto-photo">
          <img src="${escapeHtml(moto.image)}" alt="${escapeHtml(moto.brand)} ${escapeHtml(moto.model)}" loading="lazy" />
          <span class="moto-tag">DISPONÍVEL</span>
        </div>
        <div class="moto-card-body">
          <span class="moto-brand">${escapeHtml(moto.brand)}</span>
          <h3>${escapeHtml(moto.model)}</h3>
          <div class="moto-meta"><span>${escapeHtml(moto.year)}</span><span>${km(moto.km)}</span></div>
          <div class="moto-price-row">
            <div class="moto-price"><small>Valor demonstrativo</small><strong>${money(moto.price)}</strong></div>
            <span class="text-link">Detalhes</span>
          </div>
        </div>
      </a>
    </article>`;
}

function homeTemplate() {
  return `
    <section class="hero">
      <div class="hero-media"><img src="./assets/moto-04.jpg" alt="Motocicleta disponível na Roussenq Motos" /></div>
      <div class="hero-content">
        <p class="section-kicker">Roussenq Motos · Catálogo digital</p>
        <h1>Encontre sua <span>próxima moto.</span></h1>
        <p>Veja as motos disponíveis, compare os detalhes e fale direto com a Roussenq pelo WhatsApp.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#motos">Ver motos disponíveis</a>
          <a class="btn btn-secondary" data-whatsapp="geral" href="#">Falar no WhatsApp</a>
        </div>
      </div>
    </section>

    <section class="section page-shell" id="catalogo">
      <div class="catalog-header">
        <div>
          <p class="section-kicker">Estoque atual</p>
          <h2 class="section-title">Motos disponíveis</h2>
          <span class="demo-badge">Informações de demonstração</span>
        </div>
        <div class="catalog-tools">
          <div class="search-box"><input id="moto-search" type="search" placeholder="Buscar por modelo" aria-label="Buscar moto por modelo" value="${escapeHtml(searchTerm)}" /></div>
          <div class="filters" aria-label="Filtrar por marca">
            ${["Todas", "Honda", "Yamaha"].map((brand) => `<button class="filter ${activeBrand === brand ? "active" : ""}" data-brand="${brand}">${brand}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="moto-grid" id="moto-grid"></div>
    </section>

    <section class="section trust-section">
      <div class="page-shell">
        <p class="section-kicker">Atendimento simples</p>
        <h2 class="section-title">Sua próxima moto pode estar aqui.</h2>
        <div class="trust-grid">
          <div class="trust-item"><strong>Estoque organizado</strong><span>Veja rapidamente o que está disponível.</span></div>
          <div class="trust-item"><strong>Contato direto</strong><span>Fale sobre a moto escolhida pelo WhatsApp.</span></div>
          <div class="trust-item"><strong>Negociação fácil</strong><span>Converse diretamente com a Roussenq Motos.</span></div>
        </div>
      </div>
    </section>`;
}

function renderCatalog() {
  const grid = document.querySelector("#moto-grid");
  if (!grid) return;
  const available = getMotos().filter((moto) => !moto.sold);
  const filtered = available.filter((moto) => {
    const brandMatch = activeBrand === "Todas" || moto.brand === activeBrand;
    const haystack = `${moto.brand} ${moto.model} ${moto.version}`.toLowerCase();
    return brandMatch && haystack.includes(searchTerm.toLowerCase());
  });
  grid.innerHTML = filtered.length ? filtered.map(motoCard).join("") : `<div class="empty-state">Nenhuma moto encontrada com estes filtros.</div>`;
}

function bindCatalog() {
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
    activeBrand = button.dataset.brand;
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
    renderCatalog();
  }));
  document.querySelector("#moto-search")?.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderCatalog();
  });
}

function renderHome(target) {
  main.innerHTML = homeTemplate();
  renderCatalog();
  bindCatalog();
  bindWhatsapp(main);
  if (target === "motos") requestAnimationFrame(() => document.querySelector("#catalogo")?.scrollIntoView());
  if (target === "contato") requestAnimationFrame(() => document.querySelector("#contato")?.scrollIntoView());
}

function renderDetail(id) {
  const moto = getMotos().find((item) => item.id === id);
  if (!moto || moto.sold) {
    main.innerHTML = `<section class="section page-shell"><h1>Moto não encontrada</h1><p class="section-copy">Ela pode ter sido vendida ou removida do catálogo.</p><a class="btn btn-primary" href="#motos">Voltar ao catálogo</a></section>`;
    return;
  }
  const images = [...new Set([moto.image, ...(moto.images || [])])].slice(0, 3);
  main.innerHTML = `
    <section class="detail-wrap page-shell">
      <a class="back-link" href="#motos">← Voltar para as motos</a>
      <div class="detail-grid">
        <div class="detail-gallery">
          <div class="detail-main-image"><img id="detail-image" src="${escapeHtml(images[0])}" alt="${escapeHtml(moto.brand)} ${escapeHtml(moto.model)}" /></div>
          <div class="thumb-row">
            ${images.map((image, index) => `<button class="thumb ${index === 0 ? "active" : ""}" data-image="${escapeHtml(image)}" aria-label="Ver foto ${index + 1}"><img src="${escapeHtml(image)}" alt="" /></button>`).join("")}
          </div>
        </div>
        <div class="detail-info">
          <p class="section-kicker">${escapeHtml(moto.brand)} · Disponível</p>
          <h1>${escapeHtml(moto.model)}</h1>
          <span class="demo-badge">Dados demonstrativos</span>
          <div class="detail-price"><small>Valor demonstrativo</small><strong>${money(moto.price)}</strong></div>
          <div class="spec-grid">
            <div class="spec"><span>Ano</span><strong>${escapeHtml(moto.year)}</strong></div>
            <div class="spec"><span>Quilometragem</span><strong>${km(moto.km)}</strong></div>
            <div class="spec"><span>Cilindrada</span><strong>${escapeHtml(moto.cc)} cc</strong></div>
            <div class="spec"><span>Versão</span><strong>${escapeHtml(moto.version || "—")}</strong></div>
          </div>
          <p class="detail-description">${escapeHtml(moto.description)}</p>
          <div class="interest-box"><a class="btn btn-primary" data-whatsapp="${escapeHtml(moto.id)}" href="#">Falar sobre esta moto</a></div>
        </div>
      </div>
    </section>`;
  document.querySelectorAll(".thumb").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("#detail-image").src = button.dataset.image;
    document.querySelectorAll(".thumb").forEach((item) => item.classList.toggle("active", item === button));
  }));
  bindWhatsapp(main);
}

function renderAdmin() {
  const motos = getMotos();
  main.innerHTML = `
    <section class="admin-shell">
      <a class="back-link" href="#home">← Ver catálogo público</a>
      <div class="admin-top">
        <div><p class="section-kicker">Painel demonstrativo</p><h1>Gerenciar motos</h1><p class="admin-note">As alterações ficam salvas somente neste navegador. Não existe login ou banco de dados nesta versão.</p></div>
        <a class="btn btn-primary" href="#admin/novo">+ Adicionar moto</a>
      </div>
      <div class="admin-list">
        ${motos.map((moto) => `
          <article class="admin-row">
            <img src="${escapeHtml(moto.image)}" alt="" />
            <div><h3>${escapeHtml(moto.brand)} ${escapeHtml(moto.model)}</h3><p>${escapeHtml(moto.year)} · ${km(moto.km)} · ${money(moto.price)}</p><span class="status-pill ${moto.sold ? "sold" : ""}">${moto.sold ? "VENDIDA" : "PUBLICADA"}</span></div>
            <div class="admin-actions">
              <a class="btn btn-ghost btn-small" href="#admin/editar/${encodeURIComponent(moto.id)}">Editar</a>
              <button class="btn btn-ghost btn-small" data-action="sold" data-id="${escapeHtml(moto.id)}">${moto.sold ? "Reativar" : "Marcar vendida"}</button>
              <button class="btn btn-danger btn-small" data-action="delete" data-id="${escapeHtml(moto.id)}">Excluir</button>
            </div>
          </article>`).join("")}
      </div>
      <div class="admin-toolbar"><button class="btn btn-ghost btn-small" id="reset-demo">Restaurar demonstração</button></div>
    </section>`;

  main.querySelectorAll("[data-action='sold']").forEach((button) => button.addEventListener("click", () => {
    const next = getMotos().map((moto) => moto.id === button.dataset.id ? { ...moto, sold: !moto.sold } : moto);
    saveMotos(next);
    showToast("Status atualizado no catálogo.");
    renderAdmin();
  }));
  main.querySelectorAll("[data-action='delete']").forEach((button) => button.addEventListener("click", () => {
    const moto = getMotos().find((item) => item.id === button.dataset.id);
    if (!confirm(`Excluir ${moto?.brand || "esta moto"} ${moto?.model || ""}?`)) return;
    saveMotos(getMotos().filter((item) => item.id !== button.dataset.id));
    showToast("Moto excluída.");
    renderAdmin();
  }));
  document.querySelector("#reset-demo")?.addEventListener("click", () => {
    if (confirm("Restaurar os dados originais da demonstração?")) resetMotos();
  });
}

function renderMotoForm(id) {
  const editing = Boolean(id);
  const moto = editing ? getMotos().find((item) => item.id === id) : null;
  if (editing && !moto) return renderAdmin();
  const values = moto || { brand: "", model: "", version: "", year: "", km: "", cc: "", price: "", description: "", image: "./assets/moto-01.jpg", sold: false };
  main.innerHTML = `
    <section class="admin-shell">
      <a class="back-link" href="#admin">← Voltar para gerenciar motos</a>
      <div class="admin-top"><div><p class="section-kicker">Painel demonstrativo</p><h1>${editing ? "Editar moto" : "Adicionar moto"}</h1><p class="admin-note">Preencha apenas o essencial. A publicação aparece imediatamente no catálogo deste navegador.</p></div></div>
      <form class="form-card" id="moto-form">
        <div class="form-grid">
          <div class="field"><label for="brand">Marca</label><select id="brand" name="brand" required><option value="">Selecione</option>${["Honda", "Yamaha", "Suzuki", "Outra"].map((brand) => `<option ${values.brand === brand ? "selected" : ""}>${brand}</option>`).join("")}</select></div>
          <div class="field"><label for="model">Modelo</label><input id="model" name="model" required value="${escapeHtml(values.model)}" placeholder="Ex.: CG 160 Titan" /></div>
          <div class="field"><label for="version">Versão</label><input id="version" name="version" value="${escapeHtml(values.version)}" placeholder="Ex.: Titan" /></div>
          <div class="field"><label for="year">Ano</label><input id="year" name="year" type="number" min="1980" max="2030" required value="${escapeHtml(values.year)}" /></div>
          <div class="field"><label for="km">Quilometragem</label><input id="km" name="km" type="number" min="0" required value="${escapeHtml(values.km)}" /></div>
          <div class="field"><label for="cc">Cilindrada</label><input id="cc" name="cc" type="number" min="50" required value="${escapeHtml(values.cc)}" /></div>
          <div class="field"><label for="price">Preço (R$)</label><input id="price" name="price" type="number" min="0" required value="${escapeHtml(values.price)}" /></div>
          <div class="field"><label for="image">URL ou caminho da foto</label><input id="image" name="image" required value="${escapeHtml(values.image)}" /><small>Ou selecione uma imagem abaixo para simular o envio.</small></div>
          <div class="field form-wide"><label for="upload">Selecionar foto</label><input id="upload" type="file" accept="image/*" /></div>
          <div class="field form-wide"><img class="image-preview" id="image-preview" src="${escapeHtml(values.image)}" alt="Pré-visualização da moto" /></div>
          <div class="field form-wide"><label for="description">Descrição</label><textarea id="description" name="description" required>${escapeHtml(values.description)}</textarea></div>
        </div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">${editing ? "Salvar alterações" : "Publicar moto"}</button><a class="btn btn-ghost" href="#admin">Cancelar</a></div>
      </form>
    </section>`;

  const imageInput = document.querySelector("#image");
  const preview = document.querySelector("#image-preview");
  imageInput.addEventListener("input", () => { preview.src = imageInput.value || "./assets/moto-01.jpg"; });
  document.querySelector("#upload").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { imageInput.value = reader.result; preview.src = reader.result; };
    reader.readAsDataURL(file);
  });
  document.querySelector("#moto-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const saved = getMotos();
    const nextMoto = {
      id: editing ? moto.id : `${slugify(data.brand)}-${slugify(data.model)}-${Date.now()}`,
      brand: data.brand,
      model: data.model.trim(),
      version: data.version.trim(),
      year: Number(data.year),
      km: Number(data.km),
      cc: Number(data.cc),
      price: Number(data.price),
      image: data.image.trim(),
      images: [data.image.trim()],
      description: data.description.trim(),
      sold: editing ? moto.sold : false,
    };
    saveMotos(editing ? saved.map((item) => item.id === moto.id ? nextMoto : item) : [nextMoto, ...saved]);
    showToast(editing ? "Alterações salvas." : "Moto publicada no catálogo.");
    location.hash = "#admin";
  });
}

function setActiveNav(route) {
  document.querySelectorAll("[data-nav]").forEach((link) => link.classList.toggle("active", link.dataset.nav === route));
}

function renderRoute() {
  const route = location.hash.replace(/^#/, "") || "home";
  const parts = route.split("/");
  document.body.dataset.route = parts[0];
  window.scrollTo({ top: 0, behavior: "instant" });
  if (parts[0] === "moto") renderDetail(decodeURIComponent(parts[1] || ""));
  else if (parts[0] === "admin" && parts[1] === "novo") renderMotoForm();
  else if (parts[0] === "admin" && parts[1] === "editar") renderMotoForm(decodeURIComponent(parts[2] || ""));
  else if (parts[0] === "admin") renderAdmin();
  else renderHome(parts[0]);
  setActiveNav(["home", "motos", "contato"].includes(parts[0]) ? parts[0] : "");
  bindWhatsapp(document);
  document.title = parts[0] === "admin" ? "Painel — Roussenq Motos" : "Roussenq Motos — Catálogo";
}

window.RoussenqDemo = { getMotos, saveMotos, resetMotos, whatsappUrl };
window.addEventListener("hashchange", renderRoute);
renderRoute();
