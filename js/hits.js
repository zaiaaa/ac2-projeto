// Atualiza ícone do carrinho
const div = document.getElementsByClassName("carrinhoIcon")[0];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

div.innerHTML = `
  <a class="nav-link position-relative" href="/carrinho.html">
      Carrinho
      <span class="position-absolute mt-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
          ${carrinho.length}
      </span>
  </a>
`;

// Função pra definir cor da badge pelo nicho
function corBadge(nicho) {
  switch (nicho.toLowerCase()) {
    case "camisa":
      return "bg-primary";
    case "calça":
      return "bg-success";
    case "sapato":
      return "bg-dark";
    case "terno":
      return "bg-warning";
    case "jóias":
      return "bg-info";
    default:
      return "bg-secondary";
  }
}

// Pega o container principal
const container = document.querySelector(".content");

// Puxa os produtos do localStorage
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Agrupa produtos por nicho
const grupos = {};
produtos.forEach(p => {
  const nicho = p.nicho || "Outros";
  if (!grupos[nicho]) grupos[nicho] = [];
  grupos[nicho].push(p);
});

// Cria uma seção pra cada nicho
for (const nicho in grupos) {
  const section = document.createElement("section");
  section.className = "mb-5";

  const titulo = document.createElement("h2");
  titulo.className = "mb-3 text-center text-uppercase fw-bold";
  titulo.innerText = nicho;
  section.appendChild(titulo);

  const linha = document.createElement("div");
  linha.className = "d-flex flex-wrap gap-4 justify-content-center";

  grupos[nicho].forEach(p => {
    const card = document.createElement("div");
    card.className = "card position-relative";
    card.style.width = "18rem";
    card.style.cursor = "pointer";
    card.onclick = () => abrirDetalhes(p.id);

    card.innerHTML = `
      <img src="${p.imagem}" class="card-img-top hover-img" alt="${p.nome}">
      <span class="position-absolute top-0 start-0 m-2 badge ${corBadge(p.nicho)}">${p.nicho}</span>
      <div class="card-body">
          <h5>${p.nome}</h5>
          <p class="card-text">${p.descricao}</p>
          <h6 style="color: green;">R$ ${p.preco.toFixed(2)}</h6>
      </div>
    `;
    linha.appendChild(card);
  });

  section.appendChild(linha);
  container.appendChild(section);
}

// Abre a página de detalhes
function abrirDetalhes(id) {
  localStorage.setItem("produtoSelecionado", id);
  window.location.href = "view.html";
}
