const panels = document.querySelectorAll(".data-panel");

let currentPanel = 0;


/* SHOW PANEL */

function showPanel(index) {

    panels.forEach((panel, i) => {
        panel.classList.toggle("active", i === index);
    });

    currentPanel = index;

    if (index === 3) {
        updateReview();
    }
}


/* GET SELECTED CHOICE */

function getSelected(group) {

    const selected = group.querySelector(".choice.selected");

    return selected ? selected.textContent.trim() : "—";
}


/* BUILD REVIEW */

function updateReview() {

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    const phone = document.getElementById("phone").value.trim();
    const emailName = document.getElementById("emailName").value.trim();
    const emailDomain = document.getElementById("emailDomain").value;

    const contactChoice = getSelected(
        document.querySelectorAll(".choice-group")[0]
    );

    const boatGroups = document.querySelectorAll(".choice-group");

    const boatType = getSelected(boatGroups[1]);
    const boatMake = getSelected(boatGroups[2]);

    const boatModel = document.getElementById("boatModel").value.trim();
    const boatNotes = document.getElementById("boatNotes").value.trim();

    const community = document.getElementById("community").value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value.trim();
    const access = document.getElementById("access").value.trim();


    /* CLIENT */

    document.getElementById("reviewClient").textContent =
        `${firstName || "—"} ${lastName || ""}`.trim();


    /* BOAT */

    document.getElementById("reviewBoat").textContent =
        `${boatMake} · ${boatType}${boatModel ? " · " + boatModel : ""}`;


    /* LOCATION */

    document.getElementById("reviewLocation").textContent =
        `${community || "—"}${city ? " · " + city : ""}${address ? " · " + address : ""}`;


    /* ACCESS */

    document.getElementById("reviewAccess").textContent =
        access || "—";
}


/* NEXT */

document.querySelectorAll(".primary-button").forEach(button => {

    button.addEventListener("click", () => {

        if (currentPanel < panels.length - 1) {
            showPanel(currentPanel + 1);
        }

    });

});


/* BACK */

document.querySelectorAll(".secondary-button").forEach(button => {

    button.addEventListener("click", () => {

        if (currentPanel > 0) {
            showPanel(currentPanel - 1);
        }

    });

});


/* CHOICE BUTTONS */

document.querySelectorAll(".choice-group").forEach(group => {

    const choices = group.querySelectorAll(".choice");

    choices.forEach(choice => {

        choice.addEventListener("click", () => {

            choices.forEach(item => {
                item.classList.remove("selected");
            });

            choice.classList.add("selected");
        });

    });

});


/* START */

showPanel(0);

/* CREATE CLIENT RECORD */

const createClientButton = document.querySelectorAll(".primary-button")[3];

createClientButton.addEventListener("click", () => {

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const emailName = document.getElementById("emailName").value.trim();
    const emailDomain = document.getElementById("emailDomain").value;

    const email = emailName
        ? emailName + emailDomain
        : "";

    const contactMethod =
        getSelected(document.querySelectorAll(".choice-group")[0]);

    const boatGroups = document.querySelectorAll(".choice-group");

    const boatType = getSelected(boatGroups[1]);
    const boatMake = getSelected(boatGroups[2]);

    const boatModel =
        document.getElementById("boatModel").value.trim();

    const boatNotes =
        document.getElementById("boatNotes").value.trim();

    const community =
        document.getElementById("community").value;

    const city =
        document.getElementById("city").value;

    const address =
        document.getElementById("address").value.trim();

    const access =
        document.getElementById("access").value.trim();


    /* CLIENT ID */

    const clientId =
        "F-" + Date.now().toString().slice(-6);


    /* CLIENT RECORD */

    const clientRecord = {

        clientId: clientId,

        client: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            preferredContact: contactMethod
        },

        boat: {
            type: boatType,
            make: boatMake,
            model: boatModel,
            notes: boatNotes
        },

        location: {
            community: community,
            city: city,
            address: address,
            access: access
        },

        createdAt: new Date().toISOString()

    };


    /* GET EXISTING CLIENTS */

    const clients =
        JSON.parse(localStorage.getItem("falconClients")) || [];


    /* ADD NEW CLIENT */

    clients.push(clientRecord);


    /* SAVE */

    localStorage.setItem(
        "falconClients",
        JSON.stringify(clients)
    );


    /* CONFIRM */

    alert(
    "CLIENT RECORD CREATED\n\n" +
    "CLIENT ID: " + clientId
);

window.location.href = "index.html";

});