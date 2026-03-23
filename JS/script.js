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

const sidebarEl = document.querySelector(".sidebar");
const sideContentEl = document.querySelector(".side__content");

let estado = {
    ordens: [
        { id: 1, descricao: "Pedido teste 1", status: "PENDENTE", total: 0, criadaEmIso: new Date().toISOString() },
        { id: 2, descricao: "Pedido teste 2", status: "EM_ANDAMENTO", total: 0, criadaEmIso: new Date().toISOString() },
        { id: 3, descricao: "Pedido teste 3", status: "CONCLUIDO", total: 0, criadaEmIso: new Date().toISOString() }
    ],
    proximoId: 4,
    statusFiltro: "TODOS",
    sortPor: "data",
    pedidoSelecionadoId: null
};

const pedidos = [
    {
        id: 1,
        titulo: "pedido 1",
        status: "pendente"
    },
    {
        id: 2, 
        titulo: "pedido 2",
        status: "andamento"
    }
];

const salvarEstado = () => {
    localStorage.setItem("orderTracker", JSON.stringify(estado));
};

const carregarEstado = () => {
    const estadoSalvo = localStorage.getItem("orderTracker");

    if (estadoSalvo) {
        estado = JSON.parse(estadoSalvo);
    }
};

const obterListaVisivel = () => {

    let listaFiltrada;

    if (estado.statusFiltro === "TODOS") {
        listaFiltrada = estado.ordens;
    } else {
        listaFiltrada = estado.ordens.filter(ordem => ordem.status === estado.statusFiltro);
    }

    const copia = [...listaFiltrada];

    if (estado.sortPor === "nome") {
        copia.sort((a, b) =>
            a.descricao.localeCompare(b.descricao))
    };

    if (estado.sortPor === "situacao") {
        const peso = { PENDENTE: 1, EM_ANDAMENTO: 2, CONCLUIDO: 3 };
        copia.sort((a, b) => peso[a.status] - peso[b.status])
    };

    if (estado.sortPor === "data") {
        copia.sort((a, b) =>
            b.criadaEmIso.localeCompare(a.criadaEmIso))
    };

    return copia;
};

const obterPedidoSelecionado = () => {
    if(estado.pedidoSelecionadoId === null) {
        return null;
    } else {
       return estado.ordens.find(ordem => ordem.id === estado.pedidoSelecionadoId );
    };
};

const formatarStatus = (status) => {
    if (status === "PENDENTE") return "Pendente";
    if (status === "EM_ANDAMENTO") return "Em andamento";
    if (status === "CONCLUIDO") return "Concluído";
};

const renderSidebar = () => {
    const pedido = obterPedidoSelecionado();

    if (!pedido) {
    sidebarEl.hidden = true;
    return;
}
    sidebarEl.hidden = false;

    sideContentEl.innerHTML = `
    <p><strong>ID:</strong> ${pedido.id}</p>
    <p><strong>Descrição:</strong> ${pedido.descricao}</p>
    <p><strong>Status:</strong> ${formatarStatus(pedido.status)}</p>
    <p><strong>Total:</strong> ${pedido.total}</p>
    <p><strong>Data:</strong> ${new Date(pedido.criadaEmIso).toLocaleString()}</p>`;
};

const render = () => {
    lista.innerHTML = "";
    const visiveis = obterListaVisivel()
    visiveis.forEach(ordem => {
        const card = criarCard(ordem);
        lista.appendChild(card);
    });
    renderSidebar();
};

const criarCard = (ordem) => {
    const clone = templateCard.content.cloneNode(true);
    const li = clone.querySelector(".order-card");
    li.dataset.id = ordem.id;
    novoStatus(li, ordem.status);
    preencherConteudo(clone, ordem);
    return clone;
}

const novoStatus = (li, status) => {
        if (status === "PENDENTE") {
            li.classList.add("is-pendente");
        }

        if (status === "EM_ANDAMENTO") {
            li.classList.add("is-andamento");
        }

        if (status === "CONCLUIDO") {
            li.classList.add("is-concluido")
        }
    }

const preencherConteudo = (clone, pedido) => {
    const title = clone.querySelector(".order-card__title");
        title.textContent = `Pedido #${pedido.id}: ${pedido.descricao}`;

        const status = clone.querySelector(".order-card__status");
        status.textContent = `Status: ${formatarStatus(pedido.status)}`;

        const total = clone.querySelector(".order-card__total");
        total.textContent = `Total R$${pedido.total}`;

}

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
    salvarEstado();
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
    salvarEstado();
    render();
};

lista.addEventListener("click", (e) => {
    const card = e.target.closest(".order-card");
    if(!card) return;
    const id = Number(card.dataset.id)
    selecionarPedido(id)
});

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
};

const setOrdenacao = (novoValor) => {
    estado.sortPor = novoValor;
    salvarEstado();
    render();
};

 const selecionarPedido = (id) => {
    estado.pedidoSelecionadoId = id;
    salvarEstado();
    render();
 };

 const fecharSidebar = () => {
    estado.pedidoSelecionadoId = null;
    salvarEstado();
    render();
 };

 btnSidebar.addEventListener("click", fecharSidebar);

selectOrdenacao.addEventListener("change", (e) => { setOrdenacao(e.target.value) });

carregarEstado();
atualizarTabsAtivas(estado.statusFiltro);
render();








