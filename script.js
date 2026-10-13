
const contactTrigger = document.querySelector("#contact-trigger");
const modalOverlay = document.querySelector("#contact-modal");
const closeButton = document.querySelector("#modal-close");
const modal = modalOverlay.querySelector(".modal");

function openModal(event) {
    event.preventDefault();

    modalOverlay.classList.add("is-open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
}

function closeModal() {
    if (!modalOverlay.classList.contains("is-open")) return;

    modalOverlay.classList.add("is-closing");
    modalOverlay.classList.remove("is-open");

    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    setTimeout(() => {
        modalOverlay.classList.remove("is-closing");
        contactTrigger.focus();
    }, 700);
}

contactTrigger.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

// Close when clicking outside the modal
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

const modalTriggers = document.querySelectorAll(".js-modal-trigger");

modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openModal);
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