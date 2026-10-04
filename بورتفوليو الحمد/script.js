/* =========================================
   VELMOOR PORTFOLIO
   ANIMATION ENGINE
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.querySelector(".loader")
            .classList.add("hide");

    }, 1700);

});


/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal, .reveal-image");


const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   COUNTERS
========================================= */

const counters =
    document.querySelectorAll("[data-target]");

let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target.toLocaleString();

                return;
            }

            counter.textContent =
                current.toLocaleString();

            requestAnimationFrame(updateCounter);

        };

        updateCounter();

    });

}


const numbersSection =
    document.querySelector(".numbers");


const numbersObserver =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

                numbersObserver.disconnect();

            }

        },

        {
            threshold: .3
        }

    );


numbersObserver.observe(numbersSection);


/* =========================================
   PARALLAX HERO
========================================= */

const heroBg =
    document.querySelector(".hero-bg");


window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroBg.style.transform =
            `scale(1.05) translateY(${scroll * .15}px)`;

    }

});


/* =========================================
   PROJECT CARD TILT
========================================= */

const cards =
    document.querySelectorAll(".project-card");


cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - .5) * -5;

        const rotateY =
            ((x / rect.width) - .5) * 5;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll("a[href^='#']")
.forEach(link => {

    link.addEventListener("click", function(e) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================================
   MOUSE MOVEMENT EFFECT
========================================= */

document.addEventListener("mousemove", e => {

    const x =
        (e.clientX / window.innerWidth - .5);

    const y =
        (e.clientY / window.innerHeight - .5);

    const decoration =
        document.querySelector(".contact-decoration");

    if (decoration) {

        decoration.style.transform =
            `translate(${x * 20}px, ${y * 20}px)`;

    }

});