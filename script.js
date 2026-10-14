
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