// Main container
const formContainer = document.querySelector(".form-container");

// Form
const formDetails = document.querySelector(".fromdetails");

// Title
const formTitle = document.getElementById("formTitle");

// Input fields
const imageUrlInput = document.querySelector('input[placeholder="Enter image URL"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');

// Radio buttons
const categoryRadios = document.querySelectorAll('input[name="category"]');

// Buttons inside form
const createBtn = document.querySelector(".create-btn");
const closeBtn = document.getElementById("closeBtn");

// External buttons
const addBtn = document.querySelector("#addBtn");
const upbtn = document.querySelector("#upbtn");
const downbtn = document.querySelector("#downbtn");

const maincontainer = document.querySelector(".container");

// Show the form
addBtn.addEventListener("click", function () {
  formContainer.style.display = "block";
  maincontainer.style.display = "none";
});

// Hide form when clicking Close
closeBtn.addEventListener("click", function () {  
  formContainer.style.display = "none";
  maincontainer.style.display = "flex";
});

// Form submit
formDetails.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // Get trimmed input values
  const image = imageUrlInput.value.trim();
  const name = fullNameInput.value.trim();
  const home = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim(); 

  // Validation
  if(image === ""){
    alert("Please enter a valid Image URL");
    return;
  }

  if(name === ""){
    alert("Please enter a valid Full Name");
    return;
  }

  if(home === ""){
    alert("Please enter a valid Home Town");
    return;
  }

  if(purpose === ""){
    alert("Please enter a valid Purpose");
    return;
  }

  // Get selected category
  let selected = false;
  categoryRadios.forEach(function(cat){
    if(cat.checked){
      selected = cat.value; // store selected value
    }
  });

  if(!selected){
    alert("Please select a category");
    return;
  }

    // Optionally hide form and show main container
  formContainer.style.display = "none";
  maincontainer.style.display = "flex";

  // alert("Note created successfully!");


  

  // Save to localStorage function
function saveStorage(obj) {
  // Check if "new" exists in localStorage
  if (localStorage.getItem("new") === null) {
    let oldstores = [];
    oldstores.push(obj);
    localStorage.setItem("new", JSON.stringify(oldstores));
  } else {
    let oldstores = JSON.parse(localStorage.getItem("new"));
    oldstores.push(obj);
    localStorage.setItem("new", JSON.stringify(oldstores));
  }
}



  // Save data to localStorage
  saveStorage({
    image,
    name,
    home,
    purpose,
    selected
  });

  // Reset form
  formDetails.reset();


});

// Select the container where cards will be added
const cardSection = document.querySelector('.card-section');

// Function to create a card
function createCard(data) {


  // Create main card div
  const card = document.createElement('div');
  card.className = 'card';

  // Avatar image
  const img = document.createElement('img');
  img.src = data.img;
  img.alt = 'profile';
  img.className = 'avatar';
  card.appendChild(img);

  // Name
  const name = document.createElement('h2');
  name.textContent = data.name;
  card.appendChild(name);

  // Home town
  const hometown = document.createElement('p');
  hometown.innerHTML = `<span>Home town</span> <span>${data.home}</span>`;
  card.appendChild(hometown);

  // Bookings
  const bookings = document.createElement('p');
  bookings.innerHTML = `<span>Bookings</span> <span>${data.bookings}</span>`;
  card.appendChild(bookings);

  // Buttons container
  const buttons = document.createElement('div');
  buttons.className = 'buttons';

  // Call button
  const callBtn = document.createElement('button');
  callBtn.className = 'call';
  callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';
  buttons.appendChild(callBtn);

  // Message button
  const msgBtn = document.createElement('button');
  msgBtn.className = 'msg';
  msgBtn.textContent = 'Message';
  buttons.appendChild(msgBtn);

  // Append buttons to card
  card.appendChild(buttons);

  // Append card to container
  cardSection.appendChild(card);
}

// Example usage
createCard({
  img: 'https://i.pravatar.cc/80?img=1',
  name: 'Fatima Uma',
  home: 'Singapore',
  bookings: '3 times'
});
