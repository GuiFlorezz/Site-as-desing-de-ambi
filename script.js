/* ==========================================
   1. HEADER MODO ILHA (SCROLL DINÂMICO)
   ========================================== */
const header = document.getElementById('cabecalho');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
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
   4. CARROSSEL 3D COVERFLOW (INFINITO)
   ========================================== */
const items = document.querySelectorAll('.galeria-coverflow .projeto-item');
const btnPrev = document.getElementById('btn-prev-projeto');
const btnNext = document.getElementById('btn-next-projeto');

if (items.length > 0) {
    let currentIndex = 0;

    function updateCoverflow() {
        const total = items.length;

        items.forEach((item, index) => {
            // Calcula a menor distância entre o card atual e o card central
            let diff = index - currentIndex;

            // Ajuste matemático para rotação infinita contínua
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const absDiff = Math.abs(diff);

            if (absDiff > 2) {
                // Esconde os cards que estão muito longe no fundo
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
                item.style.transform = `translateX(${diff * 200}px) scale(0.5) rotateY(0deg)`;
                item.style.zIndex = '0';
            } else {
                // Renderiza as 5 cartas visíveis com efeito 3D
                item.style.pointerEvents = 'auto';
                
                // Posições baseadas no screenshot
                const translateX = diff * 170; // Espaçamento lateral entre cards
                const rotateY = diff * -30;    // Angulação 3D das laterais
                const scale = 1 - (absDiff * 0.15); // Redução gradual de tamanho
                const zIndex = 10 - absDiff;   // Sobreposição correta das camadas
                
                // Esferas de opacidade e brilho para dar profundidade
                const opacity = diff === 0 ? 1 : (absDiff === 1 ? 0.85 : 0.5);
                const filter = diff === 0 ? 'brightness(1)' : 'brightness(0.75)';

                item.style.opacity = opacity;
                item.style.filter = filter;
                item.style.zIndex = zIndex;
                item.style.transform = `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`;
            }
        });
    }

    // Navegar para o próximo (Direita)
    btnNext?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    });

    // Navegar para o anterior (Esquerda)
    btnPrev?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCoverflow();
    });

    // Permitir clicar diretamente em qualquer card lateral para centralizá-lo
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateCoverflow();
        });
    });

    // Suporte para deslizar o dedo na tela (Touch Swipe no Mobile)
    let startX = 0;
    const galeriaContainer = document.querySelector('.galeria-coverflow');

    galeriaContainer?.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    galeriaContainer?.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                currentIndex = (currentIndex + 1) % items.length; // Swipe Esquerda
            } else {
                currentIndex = (currentIndex - 1 + items.length) % items.length; // Swipe Direita
            }
            updateCoverflow();
        }
    });

    // Inicializa o carrossel posicionado na primeira carta
    updateCoverflow();
}
/* ==========================================
   5. ACORDION DA SEÇÃO FAQ
   ========================================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const perguntaBtn = item.querySelector('.faq-pergunta');
    const resposta = item.querySelector('.faq-resposta');

    perguntaBtn.addEventListener('click', () => {
        const estaAtivo = item.classList.contains('ativo');

        // Opcional: Fecha os outros itens ao abrir um novo
        faqItems.forEach(outroItem => {
            outroItem.classList.remove('ativo');
            outroItem.querySelector('.faq-resposta').style.maxHeight = null;
        });

        // Alterna o item clicado
        if (!estaAtivo) {
            item.classList.add('ativo');
            resposta.style.maxHeight = resposta.scrollHeight + 'px';
        }
    });
});