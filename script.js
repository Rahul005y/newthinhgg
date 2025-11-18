// -------------------------
// SELECT ELEMENTS
// -------------------------
const formContainer = document.querySelector(".form-container");
const formDetails = document.querySelector(".fromdetails");
const formTitle = document.getElementById("formTitle");

const imageUrlInput = document.querySelector('input[placeholder="Enter image URL"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');

const categoryRadios = document.querySelectorAll('input[name="category"]');

const createBtn = document.querySelector(".create-btn");
const closeBtn = document.getElementById("closeBtn");

const addBtn = document.querySelector("#addBtn");
const upbtn = document.querySelector("#upbtn");
const downbtn = document.querySelector("#downbtn");

const maincontainer = document.querySelector(".container");
const cardStack = document.querySelector(".card-stack"); // FIXED


// -------------------------
// OPEN FORM
// -------------------------
addBtn.addEventListener("click", () => {
  formContainer.style.display = "block";
  maincontainer.style.display = "none";
});


// -------------------------
// CLOSE FORM
// -------------------------
closeBtn.addEventListener("click", () => {
  formContainer.style.display = "none";
  maincontainer.style.display = "flex";
});


// -------------------------
// SAVE TO STORAGE
// -------------------------
function saveStorage(obj) {
  let oldstores = JSON.parse(localStorage.getItem("new")) || [];
  oldstores.push(obj);
  localStorage.setItem("new", JSON.stringify(oldstores));
}


// -------------------------
// SUBMIT FORM
// -------------------------
formDetails.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const image = imageUrlInput.value.trim();
  const name = fullNameInput.value.trim();
  const home = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  if (!image || !name || !home || !purpose) {
    alert("Please fill all fields correctly!");
    return;
  }

  let selected = false;
  categoryRadios.forEach(cat => {
    if (cat.checked) selected = cat.value;
  });

  if (!selected) {
    alert("Please select a category");
    return;
  }

  saveStorage({ image, name, home, purpose, selected });

  formContainer.style.display = "none";
  maincontainer.style.display = "flex";
  formDetails.reset();

  createCard();
});


// -------------------------
// CREATE CARD
// -------------------------
function createCard() {
  cardStack.innerHTML = ""; 

  let allTasks = JSON.parse(localStorage.getItem("new")) || [];

  allTasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = task.image;
    img.classList.add("avatar");
    card.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = task.name;
    card.appendChild(name);

    const hometown = document.createElement("p");
    hometown.textContent = `Home: ${task.home}`;
    card.appendChild(hometown);

    const pur = document.createElement("p");
    pur.textContent = `Purpose: ${task.purpose}`;
    card.appendChild(pur);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    buttons.appendChild(callBtn);
    buttons.appendChild(msgBtn);

    card.appendChild(buttons);

    cardStack.appendChild(card);
  });

  updatecard(); // FIXED → Update after creating
}


// -------------------------
// LOAD CARDS ON PAGE LOAD
// -------------------------
createCard();


// -------------------------
// UPDATE CARD STACK
// -------------------------
function updatecard() {

  let cards = document.querySelectorAll(".card-stack .card"); // FIXED

  cards.forEach(function(card, index) {

    card.style.zIndex = 100 - index;

    card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.03})`; // FIXED

    card.style.opacity = `${1 - index * 0.05}`; // FIXED
  });
}


// -------------------------
// MOVE LAST CARD TO TOP
// -------------------------
upbtn.addEventListener("click", function () {
  let lastchild = cardStack.lastElementChild;

  if (lastchild) {
    cardStack.insertBefore(lastchild, cardStack.firstElementChild);
    updatecard();
  }
});


// -------------------------
// MOVE FIRST CARD TO BOTTOM
// -------------------------
downbtn.addEventListener("click", function () {
  let firstchild = cardStack.firstElementChild;

  if (firstchild) {
    cardStack.appendChild(firstchild);
    updatecard();
  }
});
