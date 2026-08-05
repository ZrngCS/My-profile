/* ======================================
   ZRNG PORTFOLIO
   script.js
====================================== */

// ===============================
// Loading Screen
// ===============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.pointerEvents = "none";

    setTimeout(() => {

        loader.remove();

    }, 700);

});

// ===============================
// Dynamic Year
// ===============================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

// ===============================
// Theme Toggle
// ===============================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme", "light");

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme", "dark");

    }

});

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]')

.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target =

            document.querySelector(

                link.getAttribute("href")

            );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ===============================
// Active Navigation
// ===============================

const sections =

    document.querySelectorAll("section");

const navLinks =

    document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 180;

        const height = section.offsetHeight;

        if (scrollY >= top) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") ===

            "#" + current

        ) {

            link.classList.add("active");

        }

    });

});

// ===============================
// Scroll Reveal
// ===============================

const revealItems =

    document.querySelectorAll(

        ".section,.project-card,.skill-card,.certificate-card"

    );

const reveal = () => {

    revealItems.forEach(item => {

        const top =

            item.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            item.classList.add("show");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();
/* ======================================
   COUNTER ANIMATION
====================================== */

const counters = document.querySelectorAll(".stat h2");

const startCounters = () => {

    counters.forEach(counter => {

        const text = counter.textContent;

        const target = parseInt(text);

        if (isNaN(target)) return;

        let value = 0;

        const speed = target / 60;

        const update = () => {

            value += speed;

            if (value < target) {

                counter.textContent = Math.floor(value) + "+";

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + "+";

            }

        };

        update();

    });

};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const stats = document.querySelector(".stats");

    if (!stats || counterStarted) return;

    const top = stats.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        counterStarted = true;

        startCounters();

    }

});

/* ======================================
   TYPING EFFECT
====================================== */

const typingTarget = document.querySelector(".hero h3");

const words = [

    "Web Developer",

    "UI / UX Designer",

    "Java Programmer",

    "Computer Science Student"

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typingEffect() {

    if (!typingTarget) return;

    const word = words[wordIndex];

    typingTarget.textContent =

        deleting

        ?
        word.substring(0, charIndex--)

    : word.substring(0, charIndex++);

    let speed = deleting ? 50 : 100;

    if (!deleting && charIndex > word.length) {

        deleting = true;

        speed = 1500;

    }

    if (deleting && charIndex < 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

    }

    setTimeout(typingEffect, speed);

}

typingEffect();

/* ======================================
   BACK TO TOP
====================================== */

const topBtn = document.createElement("button");

topBtn.id = "topBtn";

topBtn.innerHTML =

    '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

/* ======================================
   CONTACT FORM
====================================== */

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        form.reset();

    });

}

/* ======================================
   SERVICE WORKER
====================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")

        .then(() => {

            console.log("Service Worker Registered");

        })

        .catch(err => {

            console.log(err);

        });

    });

}