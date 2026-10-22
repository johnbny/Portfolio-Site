
const modalOverlay = document.querySelector("#contact-modal");
const closeButton = document.querySelector("#modal-close");
const modal = modalOverlay.querySelector(".modal");
const modalTriggers = document.querySelectorAll(
    "#contact-trigger, .js-modal-trigger"
);

function openModal(event) {
    event.preventDefault();

    // Cancel any unfinished closing animation
    modalOverlay.classList.remove("is-closing");
    modalOverlay.classList.add("is-open");

    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
}

function closeModal() {
    if (!modalOverlay.classList.contains("is-open")) return;

    modalOverlay.classList.remove("is-open");
    modalOverlay.classList.add("is-closing");

    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    setTimeout(() => {
        modalOverlay.classList.remove("is-closing");
    }, 700);
}

// All modal triggers
modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openModal);
});

// Close button
closeButton.addEventListener("click", closeModal);

// Close by clicking the background
modalOverlay.addEventListener("click", (event) => {
    if (!modal.contains(event.target)) {
        closeModal();
    }
});

// Close with Escape
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modalOverlay.classList.contains("is-open")
    ) {
        closeModal();
    }
});



const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", (event) => {
    event.preventDefault();

    const isDark =
        document.documentElement.dataset.theme === "dark";

    if (isDark) {
        delete document.documentElement.dataset.theme;
    } else {
        document.documentElement.dataset.theme = "dark";
    }
});


// service_7v3wydl
// template_0nhfrzm
// public key // ps944456VELoHcHxZ


function contact(event) {
    event.preventDefault();

    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');

    // Show loading screen
    loading.classList.add('modal__overlay--visible');

    emailjs.sendForm(
        'service_7v3wydl',
        'template_0nhfrzm',
        event.target
    ).then(() => {
        console.log('Message sent successfully');

        // Hide loading screen after email is sent
        loading.classList.remove('modal__overlay--visible');

        // Show success screen
        success.classList.add('modal__overlay--visible');

    }).catch((error) => {
        console.error('Email failed to send:', error);

        // Hide loading screen if sending fails
        loading.classList.remove('modal__overlay--visible');

        // Optional: display an error message
        alert('Failed to send your message. Please try again.');
    });
}


const hamburger = document.getElementById("hamburger");
const navigationLinks = document.getElementById("navigation-links");

// Open and close the full-screen menu
function toggleMenu(isOpen) {
    navigationLinks.classList.toggle("is-open", isOpen);
    hamburger.classList.toggle("is-active", isOpen);

    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
}

// Hamburger click
hamburger.addEventListener("click", () => {
    const isOpen = navigationLinks.classList.contains("is-open");
    toggleMenu(!isOpen);
});

// Close menu when selecting a navigation link
navigationLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        toggleMenu(false);
    });
});

// Close menu when clicking outside the navigation
document.addEventListener("click", (event) => {
    if (
        navigationLinks.classList.contains("is-open") &&
        !hamburger.contains(event.target) &&
        !navigationLinks.contains(event.target)
    ) {
        toggleMenu(false);
    }
});

// Close menu with Escape key
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        navigationLinks.classList.contains("is-open")
    ) {
        toggleMenu(false);
        hamburger.focus();
    }
});

// Close menu if the screen is resized to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
        toggleMenu(false);
    }
});

document.querySelectorAll('.js-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modal = document.querySelector('.modal-overlay');

        if (modal) {
            modal.classList.add('is-open');
            modal.classList.remove('is-closing');
        }
    });
});


const shapes = document.querySelectorAll(".shape");

const shapeMotion = Array.from(shapes, () => ({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    speed: 0.30 + Math.random() * 0.25,
    strength: 40 + Math.random() * 100,
    direction: Math.random() * Math.PI * 2,
    phase: Math.random() * Math.PI * 2,
    frequency: 0.5 + Math.random() * 1.5,
    idlePhase: Math.random() * Math.PI * 2,
    idleSpeed: 0.08 + Math.random() * 0.04
}));

let mouseX = 0;
let mouseY = 0;
let activity = 0;
let lastMouseMove = 0;
let time = 0;
let previousTime = performance.now();

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;

    lastMouseMove = performance.now();
});

function animateShapes() {
    const now = performance.now();
    const delta = Math.min((now - previousTime) / 16.667, 2);
    previousTime = now;

    time += delta / 60;

    // Fade out gradually after the mouse stops
    const isMoving = now - lastMouseMove < 100;

    activity += ((isMoving ? 1 : 0) - activity) *
        (1 - Math.pow(0.96, delta));

    shapes.forEach((shape, index) => {
        const motion = shapeMotion[index];

        const angle =
            motion.direction +
            Math.sin(time * motion.frequency + motion.phase) * 2.2;

        // Very slow, continuous idle hovering
        const idleX =
            Math.cos(time * motion.idleSpeed + motion.idlePhase) * 60;

        const idleY =
            Math.sin(time * motion.idleSpeed + motion.idlePhase) * 60;

        // Original mouse interaction remains unchanged
        motion.targetX =
            idleX +
            (mouseX * motion.strength +
                Math.cos(angle) * motion.strength * 0.7) * activity;

        motion.targetY =
            idleY +
            (mouseY * motion.strength +
                Math.sin(angle) * motion.strength * 0.7) * activity;

        // Independent, smooth response for every shape
        const easing = 1 - Math.pow(1 - motion.speed, delta);

        motion.x += (motion.targetX - motion.x) * easing;
        motion.y += (motion.targetY - motion.y) * easing;

        shape.style.transform =
            `translate3d(${motion.x}px, ${motion.y}px, 0)`;
    });

    requestAnimationFrame(animateShapes);
}

animateShapes();
