let scrollCount = 0;
const objetivo = 3;
const seccion = document.getElementById("bloqueo-scroll");

let zoomAplicado = false;
let scrollDesbloqueado = false;

let bloqueoActivo = true;

function bloquearScroll() {
    scrollDesbloqueado = false;
    bloqueoActivo = true;
}

function desbloquearScroll() {
    scrollDesbloqueado = true;
    bloqueoActivo = false;
}

if (window.scrollY === 0) {
    bloquearScroll();
}

window.addEventListener("scroll", () => {
    if (window.scrollY === 0 && scrollDesbloqueado) {
        scrollCount = 0;
        zoomAplicado = false;
        seccion.style.transform = "scale(1)";
        bloquearScroll();
    }
});

window.addEventListener("wheel", (e) => {
    if (bloqueoActivo) {
        e.preventDefault();

        if (e.deltaY > 0) {
            scrollCount++;
            console.log(`Intentos de scroll: ${scrollCount}`);

            if (scrollCount >= objetivo) {
                seccion.style.transition = "transform 0.5s ease";
                seccion.style.transform = "scale(1.05)";
                zoomAplicado = true;

                setTimeout(() => {
                    desbloquearScroll();
                }, 500);
            }
        }
        return;
    }

    if (zoomAplicado && e.deltaY < 0) {
        scrollCount--;
        if (scrollCount <= 0) {
            seccion.style.transform = "scale(1)";
            zoomAplicado = false;
        }
    }

    if (!zoomAplicado && e.deltaY > 0) {
        scrollCount++;
        if (scrollCount >= objetivo) {
            seccion.style.transform = "scale(1.05)";
            zoomAplicado = true;
        }
    }
}, { passive: false });

document.querySelectorAll('a[data-target]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const cards = Array.from(document.querySelectorAll(".project-card"));
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        cards.forEach((card, index) => {
            card.classList.toggle("active", index === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    updateCarousel();
});
