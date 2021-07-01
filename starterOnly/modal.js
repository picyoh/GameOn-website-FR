function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const form = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// lauch submit event

submitBtn.addEventListener("submit", formValidation);

// create FormData
var FD = new FormData();

for (let i = 0; i < form.length; i++){
  
  // inputs to check
  var input = form[i];

  // all except last two
  if(i < (form.length) -2){
    // set input required
    input.required = true;
    
    // set customs constraints for names
    if(input.id == "first" || input.id == "last"){
      input.minLength = 2;
      input.maxLength = 20;
      input.pattern = "[a-zA-Z]+(([ .'-])?[a-zA-Z])*";
    }

    // set custom constraint for email
    if(input.id == "email"){
      input.pattern ="([a-z]+)+@([a-z]{2,})+.([a-z]{2,})*";
    }

    // set custom constraint for birthday
    
    if(input.id == "birthdate"){
      var birthdateYear = input.value.substring(0,4);
      const date = new Date();
      var year = date.getFullYear();
      
      if(year - 7 > birthdateYear){
        console.log("Vous semblez jeune");

      } else if (birthdateYear > year -77){
        console.log("Avez vous vraiment cette experience?");
      }
    }
    // set custom messages
    // .setCustomValidity(message);

    // check input
    var checkedData = input.checkValidity();
    console.log({input, checkedData});
  } 

}

// Form validation on Submit
function formValidation(form){
  
  // first & last names
  // if(2 > form[0].value > 20){

  // }
  // adresse email valide
  // nombre de concours number
  // radio selectionné
  // condition générales cochées
  
  // conserver les données si invalid

}
  
  
// }