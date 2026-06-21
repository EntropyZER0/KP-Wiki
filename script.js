/* =====================================================
EFECTO DE TRANSICIÓN CRT (TV ANTIGUA)
===================================================== */
const crtLayer = document.getElementById('crt-transition-layer');
const navLinks = document.querySelectorAll('.nav-link');

// Interceptar clicks en la navegación para reproducir la animación de apagado
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el cambio de página inmediato
        const targetUrl = this.getAttribute('href');

        // Ignorar si es un link vacío (#) por ahora (para tu desarrollo)
        if(targetUrl === "#") return;

        // Reproducir la animación de "Apagado"
        crtLayer.classList.remove('crt-turn-on');
        crtLayer.classList.add('crt-turn-off');

        // Redirigir a la nueva página después de que termine la animación
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500); // 500ms coincide con la duración del CSS @keyframes turn-off
    });
});

// Limpieza de clases al retroceder en el navegador (bfcache)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        crtLayer.classList.remove('crt-turn-off');
        crtLayer.classList.add('crt-turn-on');
    }
});

/* =====================================================
MENSAJES ESTILO TERMINAL (SIDEBAR FOOTER)
===================================================== */
const transmission = document.getElementById("transmission");
const mensajes = [
    "INDEXING DB...",
    "DEPENDENCIES LOADED",
    "CHECKING ISO/IEC",
    "REFACTOR REQUIRED",
    "SYS_STATUS: OPTIMAL",
    "MEMORY LEAK AVOIDED"
];

function escribirMensaje(texto) {
    transmission.innerHTML = "> ";
    let i = 0;
    const intervalo = setInterval(() => {
        transmission.innerHTML += texto.charAt(i);
        i++;
        if(i >= texto.length){
            clearInterval(intervalo);
            // El mensaje desaparece o se queda un rato antes del siguiente
            setTimeout(() => { transmission.innerHTML = "> _"; }, 4000);
        }
    }, 60);
}

setInterval(() => {
    const randomMessage = mensajes[Math.floor(Math.random() * mensajes.length)];
    escribirMensaje(randomMessage);
}, 8000);

// Iniciar con un mensaje
setTimeout(() => { escribirMensaje("SYS_BOOT SEQUENCE OK"); }, 1000);

/* =====================================================
GLITCH EN TARJETAS (Sutil, para mantener la vibra)
===================================================== */
const termCards = document.querySelectorAll(".term-card");

setInterval(() => {
    const randomCard = termCards[Math.floor(Math.random() * termCards.length)];
    if(!randomCard) return;

    randomCard.style.transform = "translate(2px, -2px)";
    randomCard.style.boxShadow = "0 0 15px rgba(255,0,60,0.3)";
    
    setTimeout(() => {
        randomCard.style.transform = "translate(0px, 0px)";
        randomCard.style.boxShadow = "var(--glass-glow)";
    }, 150);
}, 4000);

/* =====================================================
SISTEMA DE BÚSQUEDA (FILTRADO EN TIEMPO REAL)
===================================================== */
const searchInput = document.querySelector('.search-bar input');

// Verificamos que la barra de búsqueda exista en la página actual
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        // Convertimos lo que el usuario escribe a minúsculas
        const searchTerm = e.target.value.toLowerCase();
        
        // Seleccionamos todas las tarjetas del diccionario
        const termCards = document.querySelectorAll('.term-card');

        termCards.forEach(card => {
            // Extraemos el texto del título, la descripción y la etiqueta
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
            const tag = card.querySelector('.category-tag') ? card.querySelector('.category-tag').textContent.toLowerCase() : '';

            // Si lo que el usuario escribió coincide con el título, descripción o etiqueta...
            if (title.includes(searchTerm) || description.includes(searchTerm) || tag.includes(searchTerm)) {
                // Lo mostramos (quitando el display none si lo tenía)
                card.style.display = ''; 
                
                // Efecto visual extra: iluminar ligeramente al coincidir (estilo terminal)
                if (searchTerm.length > 0) {
                    card.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)';
                    card.style.borderColor = 'var(--cyan)';
                } else {
                    card.style.boxShadow = 'var(--glass-glow)';
                    card.style.borderColor = 'var(--glass-border)';
                }
            } else {
                // Si no coincide, lo ocultamos
                card.style.display = 'none';
            }
        });
    });
}