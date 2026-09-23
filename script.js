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
    const items = Array.from(galeria.children);
    
    // 1. Clona os itens para frente e para trás [Bloco 1][Bloco 2 (Original)][Bloco 3]
    items.forEach(item => galeria.appendChild(item.cloneNode(true)));
    items.slice().reverse().forEach(item => galeria.insertBefore(item.cloneNode(true), galeria.firstChild));

    // Calcula a largura de 1 bloco completo de cards
    const getSetWidth = () => galeria.scrollWidth / 3;

    // Posiciona a rolagem no Bloco 2 (centro) ao carregar
    const initPosition = () => {
        galeria.scrollLeft = getSetWidth();
    };
    initPosition();
    window.addEventListener('resize', initPosition);

    // Calcula a distância do salto a cada clique (largura do card + gap)
    const getScrollAmount = () => {
        const item = galeria.querySelector('.projeto-item');
        if (!item) return 300;
        const gap = parseInt(window.getComputedStyle(galeria).gap) || 24;
        return item.offsetWidth + gap;
    };

    // 2. Botão PRÓXIMO (Direita)
    btnNext.addEventListener('click', () => {
        const setWidth = getSetWidth();
        const step = getScrollAmount();

        // Se estiver chegando no Bloco 3, reposiciona instantaneamente para o Bloco 2 antes de rolar
        if (galeria.scrollLeft >= (setWidth * 2) - galeria.clientWidth - 5) {
            galeria.scrollLeft -= setWidth;
        }

        galeria.scrollBy({ left: step, behavior: 'smooth' });
    });

    // 3. Botão ANTERIOR (Esquerda)
    btnPrev.addEventListener('click', () => {
        const setWidth = getSetWidth();
        const step = getScrollAmount();

        // Se estiver no início do Bloco 2, reposiciona instantaneamente para o Bloco 3 antes de rolar
        if (galeria.scrollLeft <= setWidth + 5) {
            galeria.scrollLeft += setWidth;
        }

        galeria.scrollBy({ left: -step, behavior: 'smooth' });
    });

    // 4. Suporte para arrasto de dedo no Celular (Mobile)
    galeria.addEventListener('scroll', () => {
        const setWidth = getSetWidth();
        if (setWidth === 0) return;

        if (galeria.scrollLeft >= setWidth * 2) {
            galeria.scrollLeft -= setWidth;
        } else if (galeria.scrollLeft <= 5) {
            galeria.scrollLeft += setWidth;
        }
    });
}