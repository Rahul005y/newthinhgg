let addBtn = document.querySelector("#addBtn");
let formContainer = document.querySelector(".form-container");
let closeBtn = document.querySelector("#closeBtn");
let createbtn= document.querySelector(".create-btn");
let fromdetails= document.querySelector(".fromdetails");
let container= document.querySelector(".container");
let tagchecked= document.querySelector(".tag-checked");
let radiogroup= document.querySelector(".radio-group");












fromdetails.addEventListener("submit", function(e) {
  e.preventDefault(); 
  formContainer.style.display = "none"; 
  container.style.display = "flex"; 

  tagchecked.forEach(function(val){
    console.log(val);
  });


});



addBtn.addEventListener("click", function() {
  formContainer.style.display = "flex"; 
  container.style.display = "none"; 
});

closeBtn.addEventListener("click", function() {
  formContainer.style.display = "none"; 
  container.style.display = "flex"; 

});


