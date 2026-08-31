console.log("EXISTING CLIENT FILE LOADED");

const clientSearch = document.getElementById("clientSearch");
const clientList = document.getElementById("clientList");
const emptyState = document.getElementById("emptyState");
const backToDatabase = document.getElementById("backToDatabase");


// =========================
// LOAD CLIENTS
// =========================

function loadClients() {

    const storedClients = localStorage.getItem("falconClients");

    if (!storedClients) {
        return [];
    }

    try {

        return JSON.parse(storedClients);

    } catch (error) {

        console.error("DATABASE ERROR:", error);

        return [];

    }

}


// =========================
// DISPLAY CLIENTS
// =========================

function displayClients(searchTerm = "") {

    const clients = loadClients();

    clientList.innerHTML = "";


    const filteredClients = clients.filter(record => {

        const firstName =
            record.client?.firstName || "";

        const lastName =
            record.client?.lastName || "";

        const fullName =
            `${firstName} ${lastName}`.toLowerCase();

        return fullName.includes(
            searchTerm.toLowerCase()
        );

    });


    // =========================
    // EMPTY STATE
    // =========================

    if (filteredClients.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    // =========================
    // CLIENT CARDS
    // =========================

    filteredClients.forEach(record => {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className = "client-card";


        const firstName =
            record.client?.firstName || "";

        const lastName =
            record.client?.lastName || "";

        const name =
            `${firstName} ${lastName}`.trim();


        const phone =
            record.client?.phone || "NO PHONE";

        const email =
            record.client?.email || "NO EMAIL";


        const make =
            record.boat?.make || "—";

        const model =
            record.boat?.model || "—";


        const community =
            record.location?.community || "—";

        const city =
            record.location?.city || "—";


        card.innerHTML = `

            <div class="client-card-main">

                <div class="client-name">
                    ${name || "CLIENT"}
                </div>

                <div class="client-contact">
                    ${phone} • ${email}
                </div>

                <div class="client-boat">
                    ${make} • ${model}
                </div>

                <div class="client-location">
                    ${community} • ${city}
                </div>

            </div>

            <div class="client-id">
                ${record.clientId || "—"}
            </div>

        `;


        // =========================
        // OPEN CLIENT RECORD
        // =========================

        card.addEventListener("click", () => {

            localStorage.setItem(
                "selectedClientId",
                record.clientId
            );

            console.log(
                "SELECTED CLIENT:",
                record
            );

            window.location.href =
                "client-record.html";

        });


        clientList.appendChild(card);

    });

}


// =========================
// SEARCH
// =========================

if (clientSearch) {

    clientSearch.addEventListener("input", () => {

        displayClients(
            clientSearch.value
        );

    });

}


// =========================
// BACK TO DATABASE
// =========================

if (backToDatabase) {

    backToDatabase.addEventListener("click", () => {

        window.location.href =
            "index.html";

    });

}


// =========================
// INITIAL LOAD
// =========================

displayClients();