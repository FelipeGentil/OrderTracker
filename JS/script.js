const btnPedido = document.querySelector("#btnPedido");
const descricaoEl = document.querySelector("#inputPedido");

//tabs
const btnTodos = document.querySelector("#btnTodos");
const btnPendente = document.querySelector("#btnPendente");
const btnEm_andamento = document.querySelector("#btnEm-andamento");
const btnConcluido = document.querySelector("#btnConcluido");

const selectOrdenacao = document.querySelector("#filtro__track");
const listaEl = document.querySelector("#lista");

const btnSidebar = document.querySelector("#button");
const templateEl = document.querySelector("#order-card-template");

let estado = {
    ordens: [
        { id: 1, status: "PENDENTE", total: 150 },
        { id: 2, status: "EM_ANDAMENTO", total: 300 },
        { id: 3, status: "CONCLUIDO", total: 500 }
    ],
    statusFiltro: "TODOS",
    buscarTexto: "",
    sortPor: "data",
    selecionadoId: null,
    sideAberta: false,
    carregando: false,
    erro: null
};

const obterListaVisivel = () => {
    if (estado.statusFiltro === "TODOS") {
        return estado.ordens;
    } else {
        return estado.ordens.filter(ordem => ordem.status === estado.statusFiltro)
    };
        
    };

const setStatusFiltro = (novoStatus) => {
    estado.statusFiltro = novoStatus   
    render();
};

btnTodos.addEventListener("click", () => {
    setStatusFiltro("TODOS");
});

btnEm_andamento.addEventListener("click", () => {
    setStatusFiltro("EM-ANDAMENTO");
});

btnConcluido.addEventListener("click", () => {
    setStatusFiltro("CONCLUIDO");
});

const render = () => {
    listaEl.innerHTML = "";
    const listaVisivel = obterListaVisivel();
    listaVisivel.forEach(ordem => {
        const clone = templateEl.content.cloneNode(true);
        clone.querySelector(".order-card__title").textContent =
        "Pedido #" + ordem.id;

        clone.querySelector(".order-card__status").textContent =
        ordem.status;
        
        clone.querySelector(".order-card__total").textContent = 
        ordem.total;
        
        listaEl.appendChild(clone)
    });

};



render();




