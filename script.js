async function carregarLista() {
    const res = await fetch('https://fakestoreapi.com/products');
    const produtos = await res.json();

    const lista = document.getElementById('listaProdutos');

    lista.innerHTML = produtos.map(p => `
      <div class="product-item" onclick="carregarProduto(${p.id})">
        <strong>ID ${p.id}</strong> - ${p.title}
      </div>
    `).join('');
}

function buscarPorId() {
    const id = document.getElementById('productId').value;
    if (id) carregarProduto(id);
}

async function carregarProduto(id) {
    const container = document.getElementById('product');

    container.innerHTML = "<p>Carregando...</p>";

    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const p = await res.json();

        container.innerHTML = `
        <img src="${p.image}">
        <div class="product-info">
          <h2>${p.title}</h2>
          <p class="price">$${p.price}</p>
          <p>${p.description}</p>
          <p class="rating">⭐ ${p.rating.rate} (${p.rating.count} avaliações)</p>
        </div>
      `;
    } catch {
        container.innerHTML = "<p>Erro ao carregar produto</p>";
    }
}

carregarLista();
carregarProduto(1);