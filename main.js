let nameInput = document.querySelector("#nameInput");
let numberInput = document.querySelector("#numberInput");

let btnShow = document.querySelector("#btnShow");
let btnAdd = document.querySelector("#btnAdd");
let btnRemove = document.querySelector("#btnRemove");
let btnEdit = document.querySelector("#btnEdit");

let containerContact = document.querySelector(".containerContact");

let rubrica = {
  listaContatti: [
    { name: "Mario", number: 12345 },
    { name: "Valter", number: 67890 }
  ],
  showContact() {
    containerContact.innerHTML = "";

    this.listaContatti.forEach((contatto) => {
      let p = document.createElement("p");
      p.innerHTML = `${contatto.name} - ${contatto.number}`;
      containerContact.appendChild(p);
    });
  },
  addContact(newName, newNumber) {
    this.listaContatti.push({
      name: newName,
      number: newNumber
    });
  },
  removeContact(removeName) {
    let filtered = this.listaContatti.filter((contatto) => contatto.name != removeName);
    this.listaContatti = filtered;
  },
  editContact(name, number) {
    this.listaContatti.forEach((contatto) => {
      if (contatto.name == name) {
        contatto.number = number;
      }
    });
  }
};

let check = false;

btnShow.addEventListener("click", () => {
  if (check == false) {
    rubrica.showContact();
    btnShow.innerHTML = "Nascondi contatti";
    check = true;
  } else {
    containerContact.innerHTML = "";
    btnShow.innerHTML = "Mostra contatti";
    check = false;
  }
});

btnAdd.addEventListener("click", () => {
  if (nameInput.value != "") {
    rubrica.addContact(nameInput.value, numberInput.value);
    nameInput.value = "";
    numberInput.value = "";
  }
});

btnRemove.addEventListener("click", () => {
  if (nameInput.value != "") {
    rubrica.removeContact(nameInput.value);
    nameInput.value = "";
  }
});

btnEdit.addEventListener("click", () => {
  if (nameInput.value != "") {
    rubrica.editContact(nameInput.value, numberInput.value);
    nameInput.value = "";
    numberInput.value = "";
  }
});
