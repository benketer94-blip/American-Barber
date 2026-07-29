const whatsappForm = document.querySelector("#whatsapp-chat-form");
const whatsappMessage = document.querySelector("#whatsapp-message");
const whatsappNumber = "351911541306";

whatsappForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = (whatsappMessage?.value || "").trim();
  const defaultMessage = "Hello American Barber, I would like to book an appointment.";
  const finalMessage = message || defaultMessage;
  const encodedMessage = encodeURIComponent(finalMessage);

  const fallbackUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  const directUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

  const link = document.createElement("a");
  link.href = directUrl;
  link.target = "_self";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    window.location.href = fallbackUrl;
  }, 300);
});
