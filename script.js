// Inicialize um carrinho de compras vazio
const carrinhoDeCompras = [];

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(botao) {
    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);

    // Verifica se o nome e o preço são válidos
    if (nome && !isNaN(preco)) {
        adicionarProdutoAoCarrinho(nome, preco);
    } else {
        alert('Nome ou preço inválido. Não é possível adicionar o item ao carrinho.');
    }
}

function adicionarProdutoAoCarrinho(nome, preco) {
    const produto = {
        nome: nome,
        preco: preco
    };

    carrinhoDeCompras.push(produto);
    atualizarCarrinho();
}

// Função para calcular o valor total do carrinho
function calcularTotalCarrinho() {
    let total = 0;
    for (let i = 0; i < carrinhoDeCompras.length; i++) {
        total += carrinhoDeCompras[i].preco;
    }
    return total;
}

// Função para atualizar o carrinho e o valor total exibidos no HTML
function atualizarCarrinho() {
    const carrinhoLista = document.getElementById('cart-items');
    const totalCarrinho = document.getElementById('cart-total');

    // Limpa o carrinho
    carrinhoLista.innerHTML = '';

    // Atualiza a lista de produtos no carrinho
    for (let i = 0; i < carrinhoDeCompras.length; i++) {
        const item = carrinhoDeCompras[i];
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        carrinhoLista.appendChild(listItem);
    }

    // Atualiza o valor total
    totalCarrinho.textContent = `R$ ${calcularTotalCarrinho().toFixed(2)}`;
}



// Função para criar a mensagem do pedido
function criarMensagemPedido() {
    let mensagem = 'Olá, gostaria de fazer um pedido com os seguintes itens:\n';
    
    for (let i = 0; i < carrinhoDeCompras.length; i++) {
        mensagem += `${carrinhoDeCompras[i].nome} - R$ ${carrinhoDeCompras[i].preco.toFixed(2)}\n`;
    }

    mensagem += `\nTotal: R$ ${calcularTotalCarrinho().toFixed(2)}`;

    return mensagem;
}

// Função para enviar o pedido para o WhatsApp (substitua o número de telefone)
function enviarPedidoWhatsApp() {
    const numeroWhatsApp = '5592982229102'; // Coloque o número entre aspas
    const mensagem = criarMensagemPedido();
    const linkWhatsApp = `https://wa.me/${'5592982229102'}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, '_blank');
}

// Event listeners para os botões "Adicionar ao Carrinho" e "Enviar Pedido"
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', function () {
        const produto = this.dataset.nome;
        const preco = parseFloat(this.dataset.preco);
        adicionarAoCarrinho(produto, preco);
    });
});

document.getElementById('enviar-pedido').addEventListener('click', enviarPedidoWhatsApp);
