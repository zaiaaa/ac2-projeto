// Função para retornar a classe de cor do Bootstrap com base no nicho
function corBadge(nicho) {
    switch (nicho.toLowerCase()) {
        case "camisa":
            return "bg-primary";   // azul
        case "calça":
            return "bg-success";   // verde
        case "sapato":
            return "bg-dark";      // cinza/escuro
        case "terno":
            return "bg-warning";   // amarelo
        default:
            return "bg-secondary"; // padrão
    }
}


const div = document.getElementsByClassName("carrinhoIcon")[0]
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
// Produtos salvos no localStorage
const produtos = [
  { id: 1, nome: "Camisa Polo", preco: 79.90, imagem: "./assets/camisa.webp", descricao: "Camisa polo branca 100% algodão", nicho: "Camisa" },
  { id: 2, nome: "Sapato Social", preco: 85.8, imagem: "./assets/whatsapp-image-2023-10-09-at-110805-8.jpeg", descricao: "Sapato Social", nicho: "Sapato" },
  { id: 3, nome: "Calça Afaiataria", preco: 85.8, imagem: "./assets/Calca-Social-Alfaiataria-Extra-Grande-Remo-Fenut-2.webp", descricao: "Calça Social", nicho: "Calça" },
  { id: 4, nome: "Social Slim", preco: 85.8, imagem: "./assets/camisa-masculina-social-slim-manga-comprida-branco-xadrez-66fed8ca79095.jpg", descricao: "Camisa Social", nicho: "Camisa" },
  { id: 5, nome: "Social Slim", preco: 85.8, imagem: "./assets/Camisa-Social-Slim-Algodao-Misto-VERMELHO-003-05915-01.jpg", descricao: "Camisa social vermelha.", nicho: "calça" },
  { id: 6, nome: "Sapato Social", preco: 85.8, imagem: "./assets/images (1).jpg", descricao: "Pretinho basico", nicho: "Sapato" },
  { id: 7, nome: "Kit Social", preco: 85.8, imagem: "./assets/produto-60-659172ab51ac8.webp", descricao: "Look babado", nicho: "Camisa" },
  { id: 8, nome: "Camisa Social", preco: 85.8, imagem: "./assets/whatsapp-image-2023-03-06-at-20-34-54-dozhey.webp", descricao: "Pretinho basico", nicho: "Sapato" },
  { id: 9, nome: "Escapulário", preco: 85.8, imagem: "./assets/escapu-800.webp", descricao: "Jóia irada!!!", nicho: "Jóias" },
  { id: 10, nome: "Anel Boyzão", preco: 85.8, imagem: "./assets/614b4884362e9151e5e4a4b5_189142-conheca-as-principais-caracteristicas-das-joias-de-ouro-amarelo.jpeg", descricao: "Anel", nicho: "Jóias" },


];

localStorage.setItem("produtos", JSON.stringify(produtos));

const container = document.getElementById("produtosContainer");

produtos.forEach(p => {
  const card = document.createElement("div"); // cria elemento real
  card.className = "card position-relative";
  card.style.width = "20rem";
  card.style.cursor = "pointer";
  card.onclick = () => abrirDetalhes(p.id);

  card.innerHTML = `
      <img src="${p.imagem}" class="card-img-top hover-img" alt="${p.nome}">
      <span class="position-absolute top-0 start-0 m-2 badge ${corBadge(p.nicho || "Outro")}">${p.nicho || "Outro"}</span>
      <div class="card-body">
          <h3>${p.nome}</h3>
          <p class="card-text">${p.descricao}</p>
          <h3 style="color: green">${p.preco.toFixed(2)}</h3>
      </div>
  `;

  container.appendChild(card); // adiciona sem apagar os anteriores
});


function abrirDetalhes(id) {
  localStorage.setItem("produtoSelecionado", id);
  window.location.href = "view.html";
}





div.innerHTML = `

    <a class="nav-link" href="/carrinho.html">
        Carrinho
        <span class="position-absolute mt-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
            ${carrinho.length}
        </span>
    </a>


`