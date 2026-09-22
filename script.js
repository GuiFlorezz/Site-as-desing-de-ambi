/* ==========================================
   1. HEADER MODO ILHA (SCROLL)
   ========================================== */
// Seleciona o cabeçalho pelo ID
const header = document.getElementById('cabecalho');

// Escuta o evento de rolagem (scroll) da página
window.addEventListener('scroll', () => {
    // Verifica se a página rolou mais de 50 pixels para baixo
    if (window.scrollY > 50) {
        // Se sim, adiciona a classe que transforma em ilha
        header.classList.add('header-ilha');
    } else {
        // Se voltou para o topo, remove a classe (volta ao normal)
        header.classList.remove('header-ilha');
    }
});