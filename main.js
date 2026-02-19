const contacts = [
  { name: "Mario Rossi", email: "mario.rossi@email.it", phone: "3331234567" },
  { name: "Luisa Bianchi", email: "luisa.bianchi@email.it", phone: "3477654321" },
  { name: "Paolo Verdi", email: "paolo.verdi@email.it", phone: "3499999999" }
];

const contactsSection = document.getElementById("contactsSection");
const toggleListBtn = document.getElementById("toggleListBtn");
const contactsTableBody = document.getElementById("contactsTableBody");
const emptyState = document.getElementById("emptyState");

const contactForm = document.getElementById("contactForm");
const formTitle = document.getElementById("formTitle");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const saveBtn = document.getElementById("saveBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let isListVisible = true;
let editingIndex = null;

function renderContacts() {
  contactsTableBody.innerHTML = "";

  if (contacts.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button type="button" data-action="edit" data-index="${index}">Modifica</button>
        <button type="button" data-action="delete" data-index="${index}">Elimina</button>
      </td>
    `;

    contactsTableBody.appendChild(row);
  });
}

function resetForm() {
  contactForm.reset();
  editingIndex = null;
  formTitle.textContent = "Aggiungi nuovo contatto";
  saveBtn.textContent = "Aggiungi contatto";
  cancelEditBtn.classList.add("hidden");
}

toggleListBtn.addEventListener("click", () => {
  isListVisible = !isListVisible;
  contactsSection.classList.toggle("hidden", !isListVisible);
  toggleListBtn.textContent = isListVisible
    ? "Nascondi lista contatti"
    : "Mostra lista contatti";
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newContact = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim()
  };

  if (editingIndex === null) {
    contacts.push(newContact);
  } else {
    contacts[editingIndex] = newContact;
  }

  renderContacts();
  resetForm();
});

cancelEditBtn.addEventListener("click", resetForm);

contactsTableBody.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.dataset.action;
  const index = Number(target.dataset.index);

  if (!Number.isInteger(index) || index < 0 || index >= contacts.length) {
    return;
  }

  if (action === "delete") {
    contacts.splice(index, 1);

    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex !== null && editingIndex > index) {
      editingIndex -= 1;
    }

    renderContacts();
    return;
  }

  if (action === "edit") {
    const selected = contacts[index];
    editingIndex = index;

    nameInput.value = selected.name;
    emailInput.value = selected.email;
    phoneInput.value = selected.phone;

    formTitle.textContent = "Modifica contatto";
    saveBtn.textContent = "Salva modifiche";
    cancelEditBtn.classList.remove("hidden");
  }
});

renderContacts();
