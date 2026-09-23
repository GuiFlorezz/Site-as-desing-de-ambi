/* ==========================================
   1. HEADER MODO ILHA (SCROLL DINÂMICO)
   ========================================== */
const header = document.getElementById('cabecalho');
const heroSection = document.getElementById('inicio');

window.addEventListener('scroll', () => {
    // Pega a altura total da seção principal (Hero)
    const heroHeight = heroSection.offsetHeight;
    
    // Diminuímos 80px do cálculo para que a ilha se forme 
    // um pouquinho antes da seção principal sumir completamente, 
    // garantindo que a transição termine exatamente na troca de seção
    if (window.scrollY > (heroHeight - 80)) {
        header.classList.add('header-ilha');
    } else {
        header.classList.remove('header-ilha');
    }
});
/* ==========================================
   2. MENU MOBILE (HAMBÚRGUER)
   ========================================== */
const btnMenu = document.getElementById('btn-menu');
const menuNavegacao = document.getElementById('menu-navegacao');
// Seleciona todos os links dentro do menu
const linksMenu = document.querySelectorAll('.nav-link');

// Função para abrir/fechar o menu
function toggleMenu() {
    // Adiciona ou remove a classe que mostra a tela do menu
    menuNavegacao.classList.toggle('menu-aberto');
    // Adiciona ou remove a classe que transforma o botão em "X"
    btnMenu.classList.toggle('ativo');
    
    // Trava a rolagem da página quando o menu estiver aberto (opcional, mas recomendado)
    if (menuNavegacao.classList.contains('menu-aberto')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Quando clicar no botão (os 3 riscos), roda a função toggleMenu
btnMenu.addEventListener('click', toggleMenu);

// Quando clicar em qualquer link do menu, fecha a subjanela
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuNavegacao.classList.remove('menu-aberto');
        btnMenu.classList.remove('ativo');
        document.body.style.overflow = 'auto'; // Destrava a rolagem
    });
});