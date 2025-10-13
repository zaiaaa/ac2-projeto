document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos da página
    const addToCartButton = document.getElementById("add-to-cart-btn");
    const sizeSelect = document.getElementById("size-select");
    const quantityInput = document.getElementById("quantity-input");
    
    // Adiciona o "ouvidor" de clique no botão
    addToCartButton.addEventListener("click", () => {
        // 1. Pega os dados do produto da página
        const productName = document.getElementById("product-name").innerText;
        const productPriceText = document.getElementById("product-price").innerText;
        const productImage = document.getElementById("product-image").src;
        
        // Limpa o preço para pegar apenas o número
        const productPrice = parseFloat(productPriceText.replace("R$ ", "").replace(",", "."));

        // 2. Cria um objeto para representar o produto
        const product = {
            id: `${productName}-${sizeSelect.value}`, // Cria um ID único por produto e tamanho
            name: productName,
            price: productPrice,
            size: sizeSelect.value,
            quantity: parseInt(quantityInput.value),
            image: productImage
        };

        // 3. Pega o carrinho atual do localStorage ou cria um array vazio
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        // 4. Adiciona o novo produto ao carrinho
        carrinho.push(product);

        // 5. Salva o carrinho atualizado no localStorage
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // 6. Dá um feedback para o usuário e atualiza o ícone
        alert(`${product.name} foi adicionado ao carrinho!`);
        updateCartIcon();
    });

    // Função para atualizar o número no ícone do carrinho
    function updateCartIcon() {
        const carrinhoIconDiv = document.querySelector(".carrinhoIcon");
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        
        // Usei o mesmo HTML do seu arquivo index.js para manter o padrão
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

    // Chama a função uma vez quando a página carrega para garantir que o número esteja certo
    updateCartIcon();
});
