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
/* ==========================================
   3. ANIMAÇÕES DE ENTRADA (SCROLL REVEAL)
   ========================================== */
// Seleciona todos os elementos que têm a classe 'animar-surgir'
const elementosAnimar = document.querySelectorAll('.animar-surgir');

// Cria o observador
const observadorScroll = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        // Se 15% do elemento apareceu na tela...
        if (entrada.isIntersecting) {
            // Adiciona a classe que faz a animação acontecer
            entrada.target.classList.add('mostrar');
            
            // Faz a animação acontecer apenas uma vez (para de observar)
            observadorScroll.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15 // Dispara quando 15% do elemento estiver visível
});

// Pede para o observador vigiar cada elemento selecionado
elementosAnimar.forEach((elemento) => {
    observadorScroll.observe(elemento);
});
/* ==========================================
   4. CARROSSEL INFINITO DE PROJETOS
   ========================================== */
const galeria = document.querySelector('.galeria-grid');
const btnPrev = document.getElementById('btn-prev-projeto');
const btnNext = document.getElementById('btn-next-projeto');

if (galeria && btnPrev && btnNext) {
    
    // 1. Duplica os cards para criar o efeito de loop infinito sem fim
    const cardsOriginais = Array.from(galeria.children);
    cardsOriginais.forEach(card => {
        const clone = card.cloneNode(true);
        galeria.appendChild(clone); // Duplica no final
    });

    // Função para calcular a largura de deslocamento de 1 card
    const getCardWidth = () => {
        const item = galeria.querySelector('.projeto-item');
        return item ? item.offsetWidth + 24 : 300; // 24px é o gap
    };

    // 2. Clique no botão PRÓXIMO (Direita)
    btnNext.addEventListener('click', () => {
        const maxScroll = galeria.scrollWidth / 2;
        
        // Se estiver chegando na metade (fim dos cards originais), reseta para o início suavemente
        if (galeria.scrollLeft >= maxScroll - 10) {
            galeria.scrollBehavior = 'auto';
            galeria.scrollLeft = 0;
        }
        
        galeria.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    // 3. Clique no botão ANTERIOR (Esquerda)
    btnPrev.addEventListener('click', () => {
        const maxScroll = galeria.scrollWidth / 2;

        // Se estiver no começo e clicar para voltar, pula para a metade instantaneamente
        if (galeria.scrollLeft <= 10) {
            galeria.scrollBehavior = 'auto';
            galeria.scrollLeft = maxScroll;
        }

        galeria.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    // 4. Loop Infinito no celular (Swipe de dedo)
    galeria.addEventListener('scroll', () => {
        const maxScroll = galeria.scrollWidth / 2;
        
        // Quando o usuário arrasta com o dedo até o fim da primeira cópia, reseta sem que ele perceba
        if (galeria.scrollLeft >= maxScroll) {
            galeria.scrollLeft = galeria.scrollLeft - maxScroll;
        }
    });
}