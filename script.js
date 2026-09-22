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