const productButtons = document.querySelectorAll(".product-card");
const modal = document.querySelector("#reserve-modal");
const modalPanel = document.querySelector(".reserve-modal__panel");
const closeButton = document.querySelector(".reserve-modal__close");
const productName = document.querySelector("#reserve-product");
const reserveForm = document.querySelector("#reserve-form");
const pickupDate = document.querySelector("#pickup-date");
const reserveError = document.querySelector("#reserve-error");

let selectedProduct = "";

const today = new Date();
const timezoneOffset = today.getTimezoneOffset() * 60000;
pickupDate.min = new Date(today - timezoneOffset).toISOString().split("T")[0];

function openReserveModal(product) {
  selectedProduct = product;
  productName.textContent = product;
  reserveError.textContent = "";
  pickupDate.value = "";
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(() => pickupDate.focus(), 80);
}

function closeReserveModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openReserveModal(button.dataset.product);
  });
});

closeButton.addEventListener("click", closeReserveModal);

modal.addEventListener("click", (event) => {
  if (!modalPanel.contains(event.target)) {
    closeReserveModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeReserveModal();
  }
});

reserveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!pickupDate.value) {
    reserveError.textContent = "Please choose a pickup date first.";
    pickupDate.focus();
    return;
  }

  const subject = `Product reservation: ${selectedProduct}`;
  const body = [
    "Hello American Barber,",
    "",
    `I would like to reserve: ${selectedProduct}`,
    `Pickup date: ${pickupDate.value}`,
    "",
    "Thank you.",
  ].join("\n");

  window.location.href = `mailto:golanketer@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
});
