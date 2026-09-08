document.addEventListener("DOMContentLoaded", () => {

    /* ========== LOGO TYPE ========= */
    const textEl = document.getElementById("text");
    if (textEl) {
        if (sessionStorage.getItem("logoTyped") === "true") {
            textEl.textContent = "  점검 중 , 지연됨 .! ";
        } else {
            let charIndex = 0;
            const word = "  점검 중 , 지연됨 .! ";

            function type() {
                textEl.textContent = word.slice(0, charIndex + 1);
                charIndex++;

                if (charIndex < word.length) {
                    setTimeout(type, 200);
                } else {
                    sessionStorage.setItem("logoTyped", "true");
                }
            }
            type();
        }
    }
    
    /* ========== LOGO MUSIC ========= */
    const logo = document.getElementById("logoText");
    const logoMusic = document.getElementById("logoMusic");

    logoMusic.loop = true;

    logo?.addEventListener("click", (e) => {
        e.preventDefault();

        if (logoMusic.paused) {
            logoMusic.play();
            logo.classList.add("playing");
        } else {
            logoMusic.pause();
            logo.classList.remove("playing");
        }
    });

    /* ========== LANGUAGE ========= */
    const langIcon = document.getElementById("langToggle");
    const languageSound = document.getElementById("languageSound");
    let currentLang = localStorage.getItem("lang") || "en";

    function applyLang() {
        if (!langIcon) return;

        langIcon.src = currentLang === "en"
            ? "./assets/images/us.webp"
            : "./assets/images/vn.webp";

        document.documentElement.lang = currentLang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            el.textContent = el.dataset[currentLang];
        });

        localStorage.setItem("lang", currentLang);
    }

    langIcon?.addEventListener("click", () => {
        languageSound.currentTime = 0;
        languageSound.play();
        currentLang = currentLang === "en" ? "vi" : "en";
        applyLang();
    });

    applyLang();

    /* ========== DARK / LIGHT ========= */
    const body = document.body;
    const moon = document.querySelector(".moon");
    const sun = document.querySelector(".sun");
    const soundOn = document.getElementById("soundOn");
    const soundOff = document.getElementById("soundOff");

    const savedTheme = sessionStorage.getItem("theme");
    if (savedTheme === "dark") body.classList.add("dark");

    moon?.addEventListener("click", () => {
        body.classList.add("dark");
        sessionStorage.setItem("theme", "dark");
        soundOn.currentTime = 0;
        soundOn.play();
    });

    sun?.addEventListener("click", () => {
        body.classList.remove("dark");
        sessionStorage.setItem("theme", "light");
        soundOff.currentTime = 0;
        soundOff.play();
    });

    /* ========== MENU DOWNLOAD ========= */

const folderToggle = document.getElementById("folderToggle");
const folderMenu = document.getElementById("folderMenu");
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link => {
    link.addEventListener("click", function () {

        navLinks.forEach(nav => nav.classList.remove("active-link"));

        this.classList.add("active-link");

    });
});


folderToggle.addEventListener("click", function (e) {
    e.preventDefault();

    folderMenu.classList.toggle("active");

    navLinks.forEach(nav => nav.classList.remove("active-link"));

    this.classList.add("active-link");
});


document.querySelectorAll(".submenu-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        this.parentElement.classList.toggle("active");
    });
});


document.addEventListener("click", function (e) {
    if (!folderToggle.contains(e.target) && !folderMenu.contains(e.target)) {
        folderMenu.classList.remove("active");
    }
});

    /* ========== NAV ACTIVE ========= */
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 50;
            const sectionId = section.getAttribute("id");

            const link = document.querySelector(
                ".nav__menu a[href*=" + sectionId + "]"
            );
            if (!link) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add("active-link");
            } else {
                link.classList.remove("active-link");
            }
        });
    });

    /* ========== SCROLL REVEAL ========= */
    const sr = ScrollReveal({
        origin: "top",
        distance: "60px",
        duration: 2500,
        delay: 200,
        reset: true,
    });

    sr.reveal(".profile__border, .profile__name");
    sr.reveal(
        ".profile__social, .profile_profession, .profile__info-group, .profile__buttons, .projects__card, .skills__area",
        { delay: 300, origin: "bottom" }
    );

});
