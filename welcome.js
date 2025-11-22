document.addEventListener('DOMContentLoaded', () => {
    const botaoEntrar = document.getElementById('botao-entrar');
    const inputNome = document.getElementById('input-nome');

    const entrar = () => {
        const nomeUsuario = inputNome.value.trim();
        if (nomeUsuario) {
            localStorage.setItem('nomeUsuario', nomeUsuario);
            window.location.href = 'pagina_primaria.html';
        }
    };

    botaoEntrar.addEventListener('click', entrar);
    inputNome.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            entrar();
        }
    });
});