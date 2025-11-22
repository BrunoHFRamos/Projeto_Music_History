document.addEventListener('DOMContentLoaded', () => {
    adicionarInfoFooter();
});

function adicionarInfoFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) {
        return;
    }

    if (footer.querySelector('.copyright-info')) {
        return; // Evita adicionar o conteúdo múltiplas vezes
    }

    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'copyright-info';
    copyrightDiv.style.textAlign = 'center';
    copyrightDiv.style.width = '100%';
    copyrightDiv.style.marginTop = '15px';
    copyrightDiv.innerHTML = `&copy; 2025 Music History. Todos os direitos reservados.<br> 🖥️ Desenvolvido por Bruno Ramos 🖥️`;
    footer.appendChild(copyrightDiv);
}