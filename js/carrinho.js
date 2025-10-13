const div = document.getElementsByClassName("col-lg-8")[0];
const resumo = document.getElementsByClassName("resumo")[0];

//localStorage.setItem("carrinho", JSON.stringify([ { modelo: "Camisa Polo", tamanho: "G", valor: 79.90, quantidade: 1 }, { modelo: "Camisa Polo", tamanho: "G", valor: 79.90, quantidade: 1 } ]));

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderizarCarrinho() {
  div.innerHTML = "";

  // renderiza os cards
  for (let i = 0; i < carrinho.length; i++) {
    div.innerHTML += `
      <div class="card mb-3" data-index="${i}">
        <div class="row g-0 align-items-center">
          <div class="col-md-3 text-center">
            <img src="../assets/camisa.webp" class="img-fluid rounded-start" alt="Produto">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${carrinho[i].name}</h5>
              <p class="card-text text-muted">Tamanho ${carrinho[i].size}</p>
              <p class="card-text fw-bold">R$ ${carrinho[i].price.toFixed(2)}</p>
            </div>
          </div>
          <div class="col-md-3 text-center">
            <div class="d-flex justify-content-center align-items-center">
              <button class="btnMenos btn btn-outline-secondary btn-sm me-2" data-index="${i}">-</button>
              <span class="quantidade">${carrinho[i].quantity}</span>
              <button class="btnMais btn btn-outline-secondary btn-sm ms-2" data-index="${i}">+</button>
            </div>
            <button class="btnRemover btn btn-link text-danger mt-2 p-0" data-index="${i}">Remover</button>
          </div>
        </div>
      </div>
    `;
  }

  // eventos
  document.querySelectorAll(".btnMais").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      carrinho[i].quantity++;
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderizarCarrinho(); // atualiza carrinho + subtotal
    });
  });

  document.querySelectorAll(".btnMenos").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      if (carrinho[i].quantity > 1) {
        carrinho[i].quantity--;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        renderizarCarrinho();
      }
    });
  });

  document.querySelectorAll(".btnRemover").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      carrinho.splice(i, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderizarCarrinho();
    });
  });

  // calcula subtotal
  const subtotal = carrinho.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // atualiza resumo
  resumo.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Resumo</h5>
        <hr>
        <p class="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>R$ ${subtotal.toFixed(2)}</span>
        </p>
        <p class="d-flex justify-content-between">
          <span>Frete</span>
          <span>R$ 20,00</span>
        </p>
        <hr>
        <h5 class="d-flex justify-content-between">
          <span>Total</span>
          <span class="text-success">R$ ${(subtotal + 20).toFixed(2)}</span>
        </h5>
        <a class="compra btn btn-success w-100 mt-3" href="./sucesso.html">Finalizar Compra</a>
      </div>
    </div>
  `;
  
  const botaoCompra = document.getElementsByClassName("compra")[0];
  if (botaoCompra) {
    botaoCompra.addEventListener("click", (e) => {
      e.preventDefault(); // evita o redirecionamento imediato
      localStorage.removeItem("carrinho"); // limpa carrinho
      window.location.href = botaoCompra.href; // vai pra sucesso.html
    });
  }
}


renderizarCarrinho();
