# FALCON — DMS Intake V1

## Purpose

Falcon Intake is the entry point for **Desert Marine Services (DMS)** client information.

The purpose of V1 is simple:

> **Capture client information quickly, store it, find it, and review the complete client record.**

This is intentionally a small working system. The goal is to prove the workflow before adding a larger database, backend, automation, or Command Center.

---

## Current Flow

```text
INDEX
  ↓
NEW CLIENT
  ↓
CLIENT
  ↓
BOAT
  ↓
LOCATION
  ↓
REVIEW
  ↓
CREATE CLIENT RECORD
  ↓
EXISTING CLIENTS
  ↓
SEARCH
  ↓
CLIENT RECORD
  ↓
EDIT / SAVE / DELETE
```

---

## Current Features

### New Client

Captures:

* First name
* Last name
* Phone
* Email
* Preferred contact method
* Boat type
* Boat make
* Boat model / class
* Boat notes
* Community / lake
* City
* Street address
* Gate / access information

A unique client ID is generated when the record is created.

Example:

```text
F-921658
```

---

### Existing Clients

The Existing Clients page provides:

* Full client list
* Client search
* Client name
* Phone
* Email
* Boat information
* Community / city
* Client ID
* Selection of an individual client record
* Return to the main database/index

---

### Client Record

The Client Record displays the stored information for the selected client.

It currently supports:

* Client information
* Contact information
* Preferred contact method
* Boat information
* Location information
* Gate / access information
* Editing stored information
* Saving changes
* Deleting unwanted records
* Returning to the client list

---

## Current Storage

V1 currently uses browser `localStorage`.

The primary storage key is:

```text
falconClients
```

Selected client navigation uses:

```text
selectedClientId
```

The records are stored locally in the browser rather than in a shared cloud database.

### Important

This means:

```text
Laptop browser
    ↓
Laptop localStorage

Phone browser
    ↓
Phone localStorage
```

The two devices do **not** currently share the same client database.

This is intentional for V1.

---

## Current Data Structure

A client record currently follows this general structure:

```json
{
  "clientId": "F-123456",
  "client": {
    "firstName": "John",
    "lastName": "Smith",
    "phone": "555-123-4567",
    "email": "john@example.com",
    "preferredContact": "CALL"
  },
  "boat": {
    "type": "PONTOON",
    "make": "DUFFY",
    "model": "16",
    "notes": ""
  },
  "location": {
    "community": "Lake Mirage",
    "city": "Rancho Mirage",
    "address": "123 Example Way",
    "access": "Security gate"
  },
  "createdAt": "2026-08-31T19:00:00.000Z"
}
```

This structure is currently serving as the foundation for future DMS data architecture.

---

# V1 Development Philosophy

The system is being built incrementally.

The current priority is:

> **Make the workflow work before making the architecture big.**

The development cycle is:

```text
BUILD
 ↓
TEST
 ↓
USE
 ↓
FIND PROBLEM
 ↓
FIX
 ↓
TEST AGAIN
```

Real-world use is considered part of development.

---

# Current Phase

## Phase 1 — Intake Workflow

**Status: WORKING**

The primary client intake workflow has been built and tested on desktop.

Next:

### Phone Testing

The current Intake will be published through GitHub and tested on a phone.

The purpose of this test is to determine:

* Is the interface practical on a phone?
* Is navigation fast enough?
* Is data entry comfortable?
* Are any fields inconvenient?
* Does the workflow make sense while moving between jobs?
* Does local storage persist as expected?
* What needs to change before introducing shared storage?

---

# Not Yet Built

The following are intentionally **not part of the current V1**:

* Cloud database
* Shared phone/laptop database
* User authentication
* Backend API
* Automated synchronization
* Command Center
* Route management
* Accounting integration
* Job management
* Automated notifications
* Advanced permissions
* Production database architecture

These should be added only after the Intake workflow has been proven.

---

# Future Direction

The eventual DMS system is expected to grow from the Intake into a larger operating system.

Conceptually:

```text
                    DMS
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       CLIENTS     BOATS       JOBS
          │          │          │
          └──────────┼──────────┘
                     ↓
                   ROUTES
                     ↓
                 COMMAND CENTER
                     ↓
        OFFERS / PAYMENTS / ACCOUNTING
```

The current Intake is the **entry point** into that future system.

---

# Important Rule

Do not add complexity simply because it is technically possible.

The system should first prove:

> **Can Anthony use this quickly and reliably in the real world?**

If the answer is yes, the next layer can be built on top of it.

If the answer is no, fix the workflow before expanding the architecture.

---

## Project Status

**Falcon DMS Intake V1**

🟢 New Client — Working
🟢 Existing Clients — Working
🟢 Search — Working
🟢 Client Record — Working
🟢 Edit — Working
🟢 Delete — Working
🟢 Navigation — Working
🟡 Phone Testing — Next
⚪ Shared Database — Future
⚪ Command Center — Future

---

**FALCON**

`CLIENT → DATABASE → COMMAND CENTER`
