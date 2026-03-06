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
  isVisible: false,
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

    if (this.isVisible) {
      this.showContact();
    }
  },
  removeContact(removeName) {
    let filtered = this.listaContatti.filter((contatto) => contatto.name != removeName);
    this.listaContatti = filtered;

    if (this.isVisible) {
      this.showContact();
    }
  },
  editContact(name, number) {
    this.listaContatti.forEach((contatto) => {
      if (contatto.name == name) {
        contatto.number = number;
      }
    });

    if (this.isVisible) {
      this.showContact();
    }
  }
};

btnShow.addEventListener("click", () => {
  if (rubrica.isVisible == false) {
    rubrica.showContact();
    btnShow.innerHTML = "Nascondi contatti";
    rubrica.isVisible = true;
  } else {
    containerContact.innerHTML = "";
    btnShow.innerHTML = "Mostra contatti";
    rubrica.isVisible = false;
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
