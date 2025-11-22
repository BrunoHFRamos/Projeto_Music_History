let cardContainer = document.querySelector(".card-container");
let dados = [];

document.addEventListener('DOMContentLoaded', () => {
    verificarUsuario();
    carregarDados();
    atualizarDataHora();    
    setInterval(atualizarDataHora, 1000);
});

function verificarUsuario() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    if (!nomeUsuario) {
        window.location.href = 'index.html';
        return;
    }

    const saudacaoContainer = document.getElementById('saudacao-usuario');
    const horaAtual = new Date().getHours();
    let saudacao = '';

    if (horaAtual >= 5 && horaAtual < 12) {
        saudacao = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = 'Boa tarde';
    } else {
        saudacao = 'Boa noite';
    }

    saudacaoContainer.textContent = `${saudacao}, ${nomeUsuario}!`;
}

function atualizarDataHora() {
    const dataHoraContainer = document.getElementById('data-hora');
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');
    if (dataHoraContainer) {
        dataHoraContainer.textContent = `${dataFormatada} - ${horaFormatada}`;
    }
}

async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCarousel(dados);
        // Renderiza todos os cards por padrão ao carregar
        renderizarCards(dados); 
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function renderizarCarousel(dados) {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = '';
    dados.forEach(banda => {
        if (banda.imagem) {
            const cardLink = document.createElement('a');
            cardLink.href = `detalhe.html?banda=${encodeURIComponent(banda.nome)}`;
            cardLink.className = 'carousel-card';
            cardLink.innerHTML = `
                <img src="${banda.imagem}" alt="Logo da banda ${banda.nome}">
                <span>${banda.nome}</span>
            `;
            carouselContainer.appendChild(cardLink);
        }
    });
}

async function iniciarBuscas() {
    const termoBusca = document.getElementById('input-busca').value.toLowerCase();
    
    // Se a busca estiver vazia, mostra tudo. Senão, filtra.
    if (termoBusca.trim() === '') {
        renderizarCarousel(dados);
        renderizarCards(dados);
        document.querySelector('.card-list-main').style.display = 'block';
        return;
    }
    
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca)
    );
    
    // Mostra a seção <main> que estava escondida
    document.querySelector('.card-list-main').style.display = 'block';
    renderizarCarousel(dadosFiltrados);
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = '';
    for (let dado of dados) {
        let article = document.createElement("article");

        const tituloLink = document.createElement('a');
        tituloLink.href = `detalhe.html?banda=${encodeURIComponent(dado.nome)}`;
        tituloLink.innerHTML = `<h2>${dado.nome}</h2>`;
        const descricaoP = document.createElement('p');
        descricaoP.textContent = dado.descricao_curta;
        
        // Limpa o article e adiciona os novos elementos
        article.innerHTML = '';
        article.appendChild(tituloLink);
        article.appendChild(descricaoP);
        cardContainer.appendChild(article);
    }
}