/* ======================================
   ZRNG PORTFOLIO
   script.js
====================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => { loader.remove(); }, 700);
});

const year = document.getElementById("year");
const useLowMotion = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)").matches;
if (year) { year.textContent = new Date().getFullYear(); }

const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem("theme", "dark");
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) { target.scrollIntoView({ behavior: useLowMotion ? "auto" : "smooth" }); }
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const scrollTasks = [];
let scrollTicking = false;

const runScrollTasks = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        scrollTasks.forEach(task => task());
        scrollTicking = false;
    });
};
window.addEventListener("scroll", runScrollTasks, { passive: true });

const updateActiveNavigation = () => {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 180;
        if (scrollY >= top) { current = section.id; }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) { link.classList.add("active"); }
    });
};
scrollTasks.push(updateActiveNavigation);

const revealItems = document.querySelectorAll(".section,.project-card,.skill-card,.certificate-card");
const reveal = () => {
    revealItems.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) { item.classList.add("show"); }
    });
};
scrollTasks.push(reveal);

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
const startCountersWhenVisible = () => {
    const stats = document.querySelector(".stats");
    if (!stats || counterStarted) return;
    const top = stats.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
        counterStarted = true;
        startCounters();
    }
};
scrollTasks.push(startCountersWhenVisible);

/* ======================================
   MULTI-LANGUAGE & TYPING EFFECT
====================================== */
const typingWords = {
    en: [
        "Web Developer",
        "UI / UX Designer",
        "Java Programmer",
        "Computer Science Student"
    ],
    ku: [
        "گەشەپێدەری وێب",
        "دیزاینەری UI / UX",
        "پرۆگرامەری جاڤا",
        "خوێندکاری زانستی کۆمپیوتەر"
    ]
};

const translations = {
    en: {
        nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
        hero_hello: "👋 Hello, I'm", hero_name: "Zrng Sarkan Ghafur", country_name: "Kurdistan",
        hero_desc: "Passionate about Web Development, Programming, UI/UX Design and Artificial Intelligence.",
        hero_view_projects: "View Projects", hero_contact: "Contact Me", profile_role: "Web Developer",
        about_title: "ABOUT ME", about_subtitle: "Who am I?", about_h3: "I'm Zrng Sarkan Ghafur",
        about_p: "I'm a Computer Science student at University of Sulaimani,(UoS). I'm passionate about Web Development, UI/UX Design, Programming and Artificial Intelligence. I enjoy building modern websites, web applications and creative user experiences.",
        about_name: "Name", about_country: "Country", about_email: "Email", about_status: "Status", about_available: "Available", about_cv: "View CV",
        stat_projects: "Projects", stat_years: "Years Learning", stat_passion: "Passion", stat_ideas: "Ideas",
        skills_title: "MY SKILLS", skills_subtitle: "Technologies",
        exp_title: "EXPERIENCE", exp_subtitle: "Learning Journey",
        exp_1: "Started learning Web Development.", exp_2: "Built Quiz Game and Portfolio projects.", exp_3: "Improved JavaScript, Java and UI Design.",
        proj_title: "MY PROJECTS", proj_subtitle: "Featured Projects", proj_avail: "Available to explore", proj_eyebrow: "Featured web experience",
        proj_name: "Quiz App <span>— learn, play, improve.</span>",
        proj_desc: "A polished quiz experience that turns practice into a small daily challenge, with categories, a timer, score tracking and an installable PWA experience.",
        proj_f1_title: "Multiple categories", proj_f1_desc: "Choose a topic that matches your curiosity.",
        proj_f2_title: "Focused gameplay", proj_f2_desc: "Race the timer and see your score instantly.",
        proj_f3_title: "Ready everywhere", proj_f3_desc: "Responsive design with an installable PWA.",
        proj_btn: "View Project", proj_contact: "Have a project in mind?",
        modal_eyebrow: "Project overview", modal_desc: "A fast, friendly quiz app designed to make learning feel rewarding on every screen.",
        modal_f1: "Light & dark mode", modal_f2: "Live score system", modal_f3: "Works offline", modal_f4: "Smooth animations",
        modal_cta: "Start a similar project",
        cert_title: "CERTIFICATES", cert_subtitle: "Achievements", cert_1_desc: "Completed Web Development Course", cert_2_desc: "Frontend Development", cert_3_desc: "Programming Fundamentals",
        contact_title: "CONTACT", contact_subtitle: "Let's Work Together", contact_btn: "Send Message",
        form_name: "Full Name", form_email: "Email Address", form_subject: "Subject", form_msg: "Write your message...",
        footer_rights: "Zrng Sarkan Ghafur All Rights Reserved.", install_app: "Install App",
        success_msg: "✅ Message Sent Successfully", error_msg: "❌ Failed"
    },
    ku: {
        nav_home: "سەرەکی", nav_about: "دەربارە", nav_skills: "تواناکان", nav_projects: "پڕۆژەکان", nav_contact: "پەیوەندی",
        hero_hello: "👋 سڵاو، من", hero_name: "زرنگ سەرکان غەفوور", country_name: "کوردستان",
        hero_desc: "ئارەزوومەندم بە گەشەپێدانی وێب، پرۆگرامسازی، دیزاینی UI/UX و ژیری دەستکرد.",
        hero_view_projects: "بینینی پڕۆژەکان", hero_contact: "پەیوەندیم پێوە بکە", profile_role: "گەشەپێدەری وێب",
        about_title: "دەربارەی من", about_subtitle: "من کێم؟", about_h3: "من زرنگ سەرکان غەفوورم",
        about_p: "من خوێندکاری زانستی کۆمپیوتەرم لە زانکۆی سلێمانی. ئارەزوومەندم بە گەشەپێدانی وێب، دیزاینی UI/UX، پرۆگرامسازی و ژیری دەستکرد. چێژ دەبینم لە دروستکردنی وێبسایتی مۆدێرن، ئەپلیکەیشنی وێب و ئەزموونی داهێنەرانەی بەکارهێنەر.",
        about_name: "ناو", about_country: "وڵات", about_email: "ئیمەیڵ", about_status: "دۆخ", about_available: "بەردەستە", about_cv: "بینینی CV",
        stat_projects: "پڕۆژەکان", stat_years: "ساڵی فێربوون", stat_passion: "خولیای کار", stat_ideas: "بیرۆکە",
        skills_title: "تواناکانم", skills_subtitle: "تەکنەلۆژیاکان",
        exp_title: "ئەزموون", exp_subtitle: "گەشتی فێربوون",
        exp_1: "دەستم کرد بە فێربوونی گەشەپێدانی وێب.", exp_2: "پڕۆژەی یاری کویز و پۆرتفۆلیۆم دروستکرد.", exp_3: "جاڤاسکڕێپت، جاڤا و دیزاینی UI م بەرەوپێش برد.",
        proj_title: "پڕۆژەکانم", proj_subtitle: "پڕۆژە هەڵبژێردراوەکان", proj_avail: "بەردەستە بۆ بینین", proj_eyebrow: "ئەزموونێکی نایابی وێب",
        proj_name: "کویز ئاپ <span>— فێربە، یاری بکە، بەرەوپێشچۆ.</span>",
        proj_desc: "ئەزموونێکی پێشکەوتووی کویز کە ڕاهێنان دەگۆڕێت بۆ ئاڵەنگارییەکی ڕۆژانە، لەگەڵ پۆلێنەکان، کاتژمێر، هەژمارکردنی خاڵەکان و ئەپلیکەیشنی PWA.",
        proj_f1_title: "چەندین پۆلێن", proj_f1_desc: "بابەتێک هەڵبژێرە کە لەگەڵ ئارەزووەکانت دەگونجێت.",
        proj_f2_title: "یاری سەرنجڕاکێش", proj_f2_desc: "پێشبڕکێ بکە لەگەڵ کات و ڕاستەوخۆ خاڵەکانت ببینە.",
        proj_f3_title: "لە هەموو شوێنێک ئامادەیە", proj_f3_desc: "دیزاینێکی گونجاو لەگەڵ ئەپلیکەیشنێکی PWA.",
        proj_btn: "بینینی پڕۆژە", proj_contact: "بیرۆکەی پڕۆژەیەکت هەیە؟",
        modal_eyebrow: "کورتەی پڕۆژە", modal_desc: "ئەپلیکەیشنێکی خێرا و ئاسان بۆ کویز کە فێربوون دەکاتە کارێکی چێژبەخش لە هەموو شاشەیەکدا.",
        modal_f1: "دۆخی ڕووناک و تاریک", modal_f2: "سیستەمی خاڵی ڕاستەوخۆ", modal_f3: "بەبێ ئینتەرنێت کار دەکات", modal_f4: "ئەنیمەیشنی نەرم",
        modal_cta: "دەستپێکردنی پڕۆژەیەکی هاوشێوە",
        cert_title: "بڕوانامەکان", cert_subtitle: "دەستکەوتەکان", cert_1_desc: "تەواوکردنی کۆرسی گەشەپێدانی وێب", cert_2_desc: "گەشەپێدانی ڕووکاری پێشەوە (Frontend)", cert_3_desc: "بنەماکانی پرۆگرامسازی",
        contact_title: "پەیوەندی", contact_subtitle: "با پێکەوە کار بکەین", contact_btn: "ناردنی نامە",
        form_name: "ناوی تەواو", form_email: "ئیمەیڵ", form_subject: "بابەت", form_msg: "نامەکەت لێرە بنووسە...",
        footer_rights: "زرنگ سەرکان غەفوور. هەموو مافێک پارێزراوە.", install_app: "دابەزاندنی ئەپلیکەیشن",
        success_msg: "✅ نامەکەت بە سەرکەوتوویی نێردرا", error_msg: "❌ سەرکەوتوو نەبوو"
    }
};

const langBtn = document.getElementById("langBtn");
let currentLang = localStorage.getItem("lang") || "en";

let typingTarget = document.querySelector(".hero h3");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
    if (!typingTarget) return;
    const currentWords = typingWords[currentLang] || typingWords.en;
    if (wordIndex >= currentWords.length) wordIndex = 0;
    
    const word = currentWords[wordIndex];
    typingTarget.textContent = deleting
        ? word.substring(0, charIndex--)
        : word.substring(0, charIndex++);

    let speed = deleting ? 50 : 100;

    if (!deleting && charIndex > word.length) {
        deleting = true;
        speed = 1500;
    }
    if (deleting && charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % currentWords.length;
    }
    setTimeout(typingEffect, speed);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    if (lang === "ku") {
        document.documentElement.setAttribute("dir", "rtl");
        if(langBtn) langBtn.textContent = "EN";
        document.body.style.fontFamily = "'Outfit', sans-serif"; 
    } else {
        document.documentElement.setAttribute("dir", "ltr");
        if(langBtn) langBtn.textContent = "KU";
        document.body.style.fontFamily = "'Outfit', sans-serif";
    }

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = translations[lang][key];
            } else if (element.hasAttribute("data-html")) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    wordIndex = 0;
    charIndex = 0;
    deleting = false;
}

if (langBtn) {
    langBtn.addEventListener("click", () => {
        setLanguage(currentLang === "en" ? "ku" : "en");
    });
}

setLanguage(currentLang);

if (useLowMotion) {
    if (typingTarget) typingTarget.textContent = typingWords[currentLang][0];
} else {
    typingEffect();
}

/* ======================================
   BACK TO TOP
====================================== */
const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(topBtn);

const updateTopButton = () => {
    if (window.scrollY > 500) { topBtn.classList.add("show"); }
    else { topBtn.classList.remove("show"); }
};
scrollTasks.push(updateTopButton);
runScrollTasks();

topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: useLowMotion ? "auto" : "smooth" });
};

/* ======================================
   CONTACT FORM
====================================== */
const form = document.querySelector(".contact-form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    emailjs.sendForm("service_7h2i5ws", "template_iuxclj6", this)
    .then(() => {
        alert(translations[currentLang].success_msg);
        form.reset();
    })
    .catch(() => {
        alert(translations[currentLang].error_msg);
    });
});

/* ===============================
   Project Details Dialog
=============================== */
const projectModal = document.getElementById("projectModal");
const projectTrigger = document.querySelector(".project-details-btn");
const projectCloseButtons = document.querySelectorAll("[data-project-close]");
let lastFocusedElement;

const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedElement ? lastFocusedElement.focus() : null;
};

if (projectModal && projectTrigger) {
    projectTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        lastFocusedElement = document.activeElement;
        projectModal.classList.add("is-open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        projectModal.querySelector(".project-modal-close").focus();
    });
    projectCloseButtons.forEach(button => {
        button.addEventListener("click", (e) => { e.preventDefault(); closeProjectModal(); });
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && projectModal.classList.contains("is-open")) {
            closeProjectModal();
        }
    });
}

/* ======================================
   SERVICE WORKER
====================================== */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js")
        .then(() => { console.log("Service Worker Registered"); })
        .catch(err => { console.log(err); });
    });
}

/* =========================
   MOBILE MENU
========================= */
const menuBtn = document.getElementById("menuBtn");
const menu = document.querySelector("nav ul");
if (menuBtn && menu) {
    menuBtn.onclick = () => { menu.classList.toggle("active"); };
    document.querySelectorAll("nav ul a").forEach(link => {
        link.onclick = () => { menu.classList.remove("active"); };
    });
}

/* =========================
   INSTALL APP
========================= */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.add("show");
});
installBtn.addEventListener("click", async() => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") { console.log("PWA Installed"); }
    installBtn.classList.remove("show");
    deferredPrompt = null;
});
window.addEventListener("appinstalled", () => {
    console.log("Application Installed");
    installBtn.style.display = "none";
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
    });
}
console.log("%cZRNG PORTFOLIO", "color:#6C63FF;font-size:28px;font-weight:bold;");
console.log("Created by Zrng Sarkan Ghafur");
