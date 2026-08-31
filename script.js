const newClientButton = document.getElementById("newClient");
const existingClientButton = document.getElementById("existingClient");

newClientButton.addEventListener("click", () => {
    window.location.href = "new-client.html";
});

existingClientButton.addEventListener("click", () => {
    window.location.href = "existing-client.html";
});