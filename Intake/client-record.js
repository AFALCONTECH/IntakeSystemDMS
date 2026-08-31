console.log("CLIENT RECORD FILE LOADED");

const selectedClientId =
    localStorage.getItem("selectedClientId");

const storedClients =
    localStorage.getItem("falconClients");


if (!selectedClientId || !storedClients) {

    console.error("NO SELECTED CLIENT OR DATABASE");

    window.location.href = "existing-client.html";

}


let clients = [];

try {

    clients = JSON.parse(storedClients);

} catch (error) {

    console.error("DATABASE ERROR:", error);

    window.location.href = "existing-client.html";

}


const record = clients.find(
    client => client.clientId === selectedClientId
);


if (!record) {

    console.error(
        "CLIENT NOT FOUND:",
        selectedClientId
    );

    window.location.href = "existing-client.html";

}


const client = record.client || {};
const boat = record.boat || {};
const clientLocation = record.location || {};


// CLIENT DATA

document.getElementById("clientName").value =
    `${client.firstName || ""} ${client.lastName || ""}`.trim();

document.getElementById("clientId").textContent =
    record.clientId || "—";

document.getElementById("firstName").value =
    client.firstName || "";

document.getElementById("lastName").value =
    client.lastName || "";

document.getElementById("clientPhone").value =
    client.phone || "";

document.getElementById("clientEmail").value =
    client.email || "";

document.getElementById("preferredContact").value =
    client.preferredContact || "";


// BOAT DATA

document.getElementById("boatType").value =
    boat.type || "";

document.getElementById("boatMake").value =
    boat.make || "";

document.getElementById("boatModel").value =
    boat.model || "";

document.getElementById("boatNotes").value =
    boat.notes || "";


// LOCATION DATA

document.getElementById("community").value =
    clientLocation.community || "";

document.getElementById("city").value =
    clientLocation.city || "";

document.getElementById("address").value =
    clientLocation.address || "";

document.getElementById("access").value =
    clientLocation.access || "";


// SAVE CHANGES

document.getElementById("saveChanges").addEventListener(
    "click",
    () => {

        record.client.firstName =
            document.getElementById("firstName").value.trim();

        record.client.lastName =
            document.getElementById("lastName").value.trim();

        record.client.phone =
            document.getElementById("clientPhone").value.trim();

        record.client.email =
            document.getElementById("clientEmail").value.trim();

        record.client.preferredContact =
            document.getElementById("preferredContact").value || "—";


        record.boat.type =
            document.getElementById("boatType").value || "—";

        record.boat.make =
            document.getElementById("boatMake").value || "—";

        record.boat.model =
            document.getElementById("boatModel").value.trim();

        record.boat.notes =
            document.getElementById("boatNotes").value.trim();


        record.location.community =
            document.getElementById("community").value || "—";

        record.location.city =
            document.getElementById("city").value || "—";

        record.location.address =
            document.getElementById("address").value.trim();

        record.location.access =
            document.getElementById("access").value.trim();


        localStorage.setItem(
            "falconClients",
            JSON.stringify(clients)
        );


        alert("CLIENT RECORD SAVED");

        console.log("UPDATED CLIENT:", record);

    }
);


// DELETE CLIENT

document.getElementById("deleteClient").addEventListener(
    "click",
    () => {

        const confirmed = confirm(
            `DELETE CLIENT RECORD?\n\n${record.client.firstName || ""} ${record.client.lastName || ""}\n${record.clientId}\n\nThis cannot be undone.`
        );


        if (!confirmed) {
            return;
        }


        const updatedClients = clients.filter(
            client => client.clientId !== selectedClientId
        );


        localStorage.setItem(
            "falconClients",
            JSON.stringify(updatedClients)
        );


        localStorage.removeItem("selectedClientId");


        alert("CLIENT RECORD DELETED");


        window.location.href = "existing-client.html";

    }
);


// BACK TO CLIENTS

document.getElementById("backToClients").addEventListener(
    "click",
    () => {

        window.location.href = "existing-client.html";

    }
);