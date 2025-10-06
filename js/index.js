const div = document.getElementsByClassName("carrinhoIcon")[0]
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

div.innerHTML = `

    <a class="nav-link" href="/carrinho.html">
        Carrinho
        <span class="position-absolute mt-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
            ${carrinho.length}
        </span>
    </a>


`