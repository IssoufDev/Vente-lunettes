const searchInput = document.getElementById("search");
const cards = [...document.querySelectorAll(".card")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const modalDialog = modal.querySelector(".modal-content");
const productInput = document.getElementById("product");
const closeButton = document.getElementById("close");
const orderForm = document.getElementById("orderForm");
const scrollButton = document.getElementById("scrollTopBtn");
let lastTrigger = null;

function normalizeText(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function filterProducts() {
    const query = normalizeText(searchInput.value).split(" ").filter(Boolean);
    let visibleCount = 0;

    cards.forEach((card) => {
        const searchableText = normalizeText([
            card.dataset.name,
            card.querySelector("h2")?.textContent,
            card.querySelector(".product-type")?.textContent
        ].filter(Boolean).join(" "));
        const compactQuery = query.join("");
        const compactText = searchableText.replace(/\s/g, "");
        const matches = query.every((term) => searchableText.includes(term))
            || (compactQuery.length > 0 && compactText.includes(compactQuery));
        card.hidden = !matches;
        visibleCount += Number(matches);
    });

    resultCount.textContent = `${visibleCount} modèle${visibleCount === 1 ? "" : "s"}`;
    emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", filterProducts);
filterProducts();

document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const isTyping = activeElement instanceof HTMLElement
        && (activeElement.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName));

    if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInput.focus();
    }
});

function closeOrderModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastTrigger?.focus();
}

document.querySelectorAll(".btn-order").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");
        lastTrigger = button;
        productInput.value = card.dataset.name;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        modalDialog.focus();
        document.getElementById("name").focus();
    });
});

closeButton.addEventListener("click", closeOrderModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeOrderModal();
});

modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeOrderModal();
        return;
    }

    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll("button, input, textarea")]
        .filter((element) => !element.disabled && element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!orderForm.reportValidity()) return;

    const message = [
        "Bonjour MAMOUTOU COLLECTION, je souhaite passer une commande.",
        `Modèle : ${productInput.value}`,
        `Nom : ${document.getElementById("name").value}`,
        `Couleur : ${document.getElementById("color").value}`,
        `Téléphone : ${document.getElementById("phone").value}`,
        `Adresse : ${document.getElementById("address").value}`
    ].join("\n");

    window.open(`https://wa.me/22367498538?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".slider").forEach((slider) => {
        const images = [...slider.querySelectorAll("img")];
        if (images.length < 2) return;

        let current = 0;
        window.setInterval(() => {
            images[current].classList.remove("active");
            current = (current + 1) % images.length;
            images[current].classList.add("active");
        }, 4000);
    });
}

function updateScrollButton() {
    scrollButton.classList.toggle("show", window.scrollY > 300);
}

window.addEventListener("scroll", updateScrollButton, { passive: true });
scrollButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});