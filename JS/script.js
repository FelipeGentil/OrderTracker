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

const obterListaVisivel = () => {
    if (estado.statusFiltro === "TODOS") {
        return estado.ordens
    } else {
        return estado.ordens.filter(ordem => ordem.status === estado.statusFiltro);
    };
};

const formatarStatus = (status) => {
    if(status === "PENDENTE") return "Pendente";
    if(status === "EM_ANDAMENTO") return "Em andamento";
    if(status === "CONCLUIDO") return "Concluído";
};

const render = () => {
    lista.innerHTML = "";
    const visiveis = obterListaVisivel()
    visiveis.forEach(ordem => {
        const clone = templateCard.content.cloneNode(true);

        const li = clone.querySelector(".order-card");

        if (ordem.status === "PENDENTE") {
            li.classList.add("is-pendente");
        }

        if (ordem.status === "EM_ANDAMENTO") {
            li.classList.add("is-andamento");
        }

        if (ordem.status === "CONCLUIDO") {
            li.classList.add("is-concluido")
        }
        
        const title = clone.querySelector(".order-card__title");
        title.textContent = `Pedido #${ordem.id}: ${ordem.descricao}`;

        const status = clone.querySelector(".order-card__status");
        status.textContent = `Status: ${formatarStatus(ordem.status)}`;

        const total = clone.querySelector(".order-card__total");
        total.textContent = `Total R$${ordem.total}`;

        lista.appendChild(clone);
    });
};

const criarPedido = () => {
    const pedido = inputPedido.value.trim();
    if (!pedido) return;

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
    if (e.key === "Enter") {
        criarPedido();
    };
});

const setStatusFiltro = (novoStatus) => {
    estado.statusFiltro = novoStatus;
    atualizarTabsAtivas(novoStatus);
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

const atualizarTabsAtivas = (statusAtual) => {
    if (statusAtual === "TODOS") {
        btnTodos.classList.add("is-active");
        btnTodos.setAttribute("aria-pressed", "true");
    } else {
        btnTodos.classList.remove("is-active");
        btnTodos.setAttribute("aria-pressed", "false");
    };

    if (statusAtual === "PENDENTE") {
        btnPendente.classList.add("is-active");
        btnPendente.setAttribute("aria-pressed", "true");
    } else {
        btnPendente.classList.remove("is-active");
        btnPendente.setAttribute("aria-pressed", "false");
    };

    if (statusAtual === "CONCLUIDO") {
        btnConcluido.classList.add("is-active");
        btnConcluido.setAttribute("aria-pressed", "true");
    } else {
        btnConcluido.classList.remove("is-active");
        btnConcluido.setAttribute("aria-pressed", "false")
    };

    if (statusAtual === "EM_ANDAMENTO") {
        btnEmAndamento.classList.add("is-active");
        btnEmAndamento.setAttribute("aria-pressed", "true")
    } else {
        btnEmAndamento.classList.remove("is-active");
        btnEmAndamento.setAttribute("aria-pressed", "false")
    };
}
render();








