document.addEventListener('DOMContentLoaded', async () => {
    const mainContainer = document.querySelector('.detalhe-main');

    const urlParams = new URLSearchParams(window.location.search);
    const nomeBanda = urlParams.get('banda');

    if (!nomeBanda) {
        mainContainer.innerHTML = '<p>Banda não especificada. Volte para a página inicial e selecione uma banda.</p>';
        return;
    }

    try {
        const response = await fetch('data.json');
        const bandas = await response.json();
        const dadosBanda = bandas.find(banda => banda.nome === nomeBanda);

        if (dadosBanda) {
            renderizarDetalhes(dadosBanda, mainContainer);
        } else {
            mainContainer.innerHTML = `<p>Banda "${nomeBanda}" não encontrada.</p>`;
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes da banda:', error);
        mainContainer.innerHTML = '<p>Não foi possível carregar as informações da banda.</p>';
    }

    atualizarDataHora();
    setInterval(atualizarDataHora, 1000);
});

function renderizarDetalhes(dadosBanda, container) {
    // Lógica para a saudação personalizada
    const nomeUsuario = localStorage.getItem('nomeUsuario') || 'visitante';
    const horaAtual = new Date().getHours();
    let saudacao = '';

    if (horaAtual >= 5 && horaAtual < 12) {
        saudacao = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = 'Boa tarde';
    } else {
        saudacao = 'Boa noite';
    }

    const saudacaoCompleta = `${saudacao}, ${nomeUsuario}! Você escolheu uma lenda. Prepare-se para mergulhar na história e descobrir os segredos que tornaram o ${dadosBanda.nome} um ícone do rock.`;

    document.title = `Detalhes - ${dadosBanda.nome}`;

    container.innerHTML = `
        <h2 class="detalhe-saudacao" data-text="${saudacaoCompleta}">${saudacaoCompleta}</h2>
        <div class="detalhe-imagem-card">
            <img src="${dadosBanda.imagem}" alt="Logo da banda ${dadosBanda.nome}">
        </div>
        <div class="detalhe-info">
            <h2>Sobre a Banda</h2>
            <p>${dadosBanda.descricao.replace(/\n/g, '<br>')}</p>
            <div class="botoes-container">
                ${criarBotao(dadosBanda.documentario, 'Assistir Documentário', 'botao-video', 'youtube')}
                ${criarBotao(dadosBanda.video, 'Assistir Clipe no YouTube', 'botao-video', 'youtube')}
                ${criarBotao(dadosBanda.spotify, 'Ouvir no Spotify', 'botao-spotify', 'spotify')}
                <a href="${dadosBanda.link}" target="_blank" class="botao">Visitar Site Oficial</a>
            </div>
        </div>

        <div class="horizontal-carousel-container">
            <div class="horizontal-carousel-track">
                ${dadosBanda.imagens_carousel.map(img => `<img src="${img.src}" alt="${img.alt}">`).join('')}
            </div>
        </div>
    `;
}

/**
 * Função auxiliar para criar botões dinamicamente, evitando repetição de HTML.
 */
function criarBotao(url, texto, classe, tipoIcone) {
    if (!url || url.trim() === '') return '';

    const icones = {
        youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="youtube-icon"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>',
        spotify: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="spotify-icon"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.194 14.054c-.227.32-.636.43-1.007.227a6.62 6.62 0 0 1-3.652-1.113c-.32-.193-.43-.573-.227-.893.193-.32.573-.43.893-.227a5.82 5.82 0 0 0 3.193.973c.36.113.5.5.394.86zm1.273-2.32c-.26.393-.76.533-1.193.28a7.933 7.933 0 0 1-4.32-1.613c-.393-.227-.533-.72-.28-1.12.227-.393.72-.533 1.12-.28a7.033 7.033 0 0 0 3.826 1.42c.433.133.6.6.447 1.013zM18.82 9.42c-.32.48-.92.64-1.44.32A9.75 9.75 0 0 1 8.56 8.327c-.48-.24-.64-.84-.32-1.32.32-.48.92-.64 1.4-.32a10.55 10.55 0 0 0 9.54 2.413c.52-.16.96.24.84.72z"/></svg>'
    };

    return `
        <a href="${url}" target="_blank" class="botao ${classe}">
            ${icones[tipoIcone] || ''}
            ${texto}
        </a>
    `;
}

function atualizarDataHora() {
    const dataHoraContainer = document.getElementById('data-hora');
    if (!dataHoraContainer) return;
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');
    dataHoraContainer.textContent = `${dataFormatada} - ${horaFormatada}`;
}