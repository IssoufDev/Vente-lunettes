// RECHERCHE

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

        const name = card.dataset.name.toLowerCase();

        if(name.includes(value)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});


// MODAL

const modal = document.getElementById("modal");
const productInput = document.getElementById("product");
const closeBtn = document.getElementById("close");

document.querySelectorAll(".btn-order").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        productInput.value = card.dataset.name;

        modal.style.display = "flex";

    });

});

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});


// WHATSAPP

function sendWhatsApp(){

    const produit = document.getElementById("product").value;
    const name = document.getElementById("name").value;
    const couleur = document.getElementById("color").value;
    const quantite = document.getElementById("quantity").value;
    const telephone = document.getElementById("phone").value;
    const adresse = document.getElementById("address").value;
    const message = document.getElementById("message").value;

    const texte =

`Bonjour MAMOUTOU COLLECTION,
Ces ${name}
Je souhaite commander :
Lunettes : ${produit}
Couleur : ${couleur}
Quantité : ${quantite}
Téléphone : ${telephone}
Adresse : ${adresse}

Message :
${message}
Merci.`;

    const numero = "22367498538";

    const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;

    window.open(url, "_blank");

}


// SLIDERS AUTOMATIQUES

const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {

    const images = slider.querySelectorAll("img");

    let index = 0;

    setInterval(() => {

        images[index].classList.remove("active");

        index++;

        if(index >= images.length){
            index = 0;
        }

        images[index].classList.add("active");

    }, 3000);

});

//   FLECHE
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

// clic → scroll smooth
scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.getElementById("orderForm").addEventListener("submit", function(e){
    e.preventDefault();

    if(!this.checkValidity()){
        this.reportValidity();
        return;
    }

    sendWhatsApp();
});