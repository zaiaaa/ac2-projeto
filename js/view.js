document.addEventListener("DOMContentLoaded", () => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const idSelecionado = parseInt(localStorage.getItem("produtoSelecionado"));
    const produto = produtos.find(p => p.id === idSelecionado);

    const detalhes = document.getElementById("containerProduto");

    if (!detalhes) return; // Se o container não existir, não faz nada
    
    if (produto) {
        detalhes.innerHTML = `
            <div class="row">
                <div class="col-12 col-md-6">
                    <img src="${produto.imagem}" id="product-image" class="img-fluid rounded" alt="${produto.nome}">
                </div>
                <div class="col-12 col-md-6">
                    <h1 id="product-name">${produto.nome}</h1>
                    <p class="lead">${produto.descricao}</p>
                    <h2 id="product-price" class="text-success fw-bold my-3">R$ ${produto.preco.toFixed(2)}</h2>
                    <div class="mb-3">
                        <label for="size-select" class="form-label">Tamanho:</label>
                        <select class="form-select w-50" id="size-select">
                            ${produto.nicho && produto.nicho.toLowerCase() === "sapato" ? `
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                            ` : ["camisa","calça"].includes(produto.nicho?.toLowerCase()) ? `
                                <option value="P">P</option>
                                <option value="M">M</option>
                                <option value="G">G</option>
                                <option value="GG">GG</option>
                            ` : `
                                <option disabled value="unico">Tamanho Único!!</option>
                            `}
                        </select>

                    </div>
                    <div class="mb-4">
                        <label for="quantity-input" class="form-label">Quantidade:</label>
                        <input type="number" class="form-control w-25" id="quantity-input" value="1" min="1">
                    </div>
                    <button id="add-to-cart-btn" class="btn btn-primary btn-lg w-100">Adicionar ao Carrinho 🛒</button>
                </div>
            </div>
        `;

        // Depois de criar o HTML do produto
        // Se o nicho for sapato, troca as opções para números
        
        
        // Seleciona os elementos depois que o HTML foi criado
        const sizeSelect = document.getElementById("size-select");
        const addToCartButton = document.getElementById("add-to-cart-btn");
        const quantityInput = document.getElementById("quantity-input");

        addToCartButton.addEventListener("click", () => {
            const productName = document.getElementById("product-name").innerText;
            const productPriceText = document.getElementById("product-price").innerText;
            const productImage = document.getElementById("product-image").src;
            const productPrice = parseFloat(productPriceText.replace("R$ ", "").replace(",", "."));

            const productObj = {
                id: `${produto.id}-${sizeSelect.value}`, // ID único por produto e tamanho
                name: productName,
                price: productPrice,
                size: sizeSelect.value,
                quantity: parseInt(quantityInput.value),
                image: productImage
            };

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            // Evita duplicatas, somando quantidade se já existir
            const existente = carrinho.find(item => item.id === productObj.id);
            if (existente) {
                existente.quantity += productObj.quantity;
            } else {
                carrinho.push(productObj);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            alert(`${productObj.name} foi adicionado ao carrinho!`);
            updateCartIcon();
        });

        // Atualiza o ícone do carrinho
        function updateCartIcon() {
            const carrinhoIconDiv = document.querySelector(".carrinhoIcon");
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            carrinhoIconDiv.innerHTML = `
                <a class="nav-link" href="/carrinho.html">
                    Carrinho
                    <span class="position-absolute mt-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        ${carrinho.length}
                        <span class="visually-hidden">itens no carrinho</span>
                    </span>
                </a>
            `;
        }

        updateCartIcon();

    } else {
        detalhes.innerHTML = "<p>Produto não encontrado.</p>";
    }
});
