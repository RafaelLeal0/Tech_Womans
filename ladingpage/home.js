document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true
    });

    const ctaButton = document.querySelector(".cta");
    ctaButton.addEventListener("click", () => {
        window.scrollTo({
            top: document.querySelector(".container").offsetTop,
            behavior: "smooth"
        });
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.3 });

cards.forEach((card) => {
    observer.observe(card);
});

window.addEventListener("scroll", () => {
    document.querySelector(".hero").style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});




