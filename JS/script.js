const btnPedido = document.querySelector("#btnPedido");
const inputPedido = document.querySelector("#inputPedido");

//tabs
const btnTodos = document.querySelector("#btnTodos");
const btnPendente = document.querySelector("#btnPendente");
const btnEmAndamento = document.querySelector("#btnEm-andamento");
const btnConcluido = document.querySelector("#btnConcluido");

const selectOrdenacao = document.querySelector("#filtro__track");
const lista = document.querySelector("#lista");

const btnSidebar = document.querySelector("#button");
const templateCard = document.querySelector("#order-card-template");

let estado = {
    ordens: [
        { id: 1, descricao: "Pedido teste 1", status: "PENDENTE", total: 0, criadaEmIso: new Date().toISOString() },
        { id: 2, descricao: "Pedido teste 2", status: "EM_ANDAMENTO", total: 0, criadaEmIso: new Date().toISOString() },
        { id: 3, descricao: "Pedido teste 3", status: "CONCLUIDO", total: 0, criadaEmIso: new Date().toISOString() }
    ],
    proximoId: 4,
    statusFiltro: "TODOS",
    sortPor: "data"
};

const render = () => {
    lista.innerHTML = "";
    const visiveis = obterListaVisivel()
    estado.visiveis.forEach(ordem => {
        const clone = templateCard.content.cloneNode(true);

        const title = clone.querySelector(".order-card__title");
        title.textContent = `Pedido #${ordem.id}: ${ordem.descricao}`;

        const status = clone.querySelector(".order-card__status");
        status.textContent = `Status ${ordem.status}`;

        const total = clone.querySelector(".order-card__total");
        total.textContent = `Total R$${ordem.total}`;

        lista.appendChild(clone);

    });
};

const criarPedido = () => {
    const pedido = inputPedido.value.trim();
    if (!pedido === "") return;

    let pedidoNovo = {
        id: estado.proximoId,
        descricao: pedido,
        status: "PENDENTE",
        total: 4,
        criadaEmIso: new Date().toISOString()
    };

    estado.ordens.unshift(pedidoNovo);
    estado.proximoId++;
    inputPedido.value = "";
    render();
}

btnPedido.addEventListener("click", criarPedido);

inputPedido.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        criarPedido();
    };
});

const obterListaVisivel = () => {
    if(estado.statusFiltro === "TODOS") {
        return estado.ordens
    } else {
        return estado.ordens.filter(ordem => ordem.status === estado.statusFiltro);
    };
};

const setStatusFiltro = (novoStatus) => {
    estado.statusFiltro = novoStatus;
    render();
};

btnTodos.addEventListener("click", () => {
    setStatusFiltro("TODOS");
});

btnPendente.addEventListener("click", () => {
    setStatusFiltro("PENDENTE");
});

btnEmAndamento.addEventListener("click", () => {
    setStatusFiltro("EM_ANDAMENTO");
});

btnConcluido.addEventListener("click", () => {
    setStatusFiltro("CONCLUIDO");
});

render();








