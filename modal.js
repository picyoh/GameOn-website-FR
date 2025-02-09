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
const textInput = document.querySelectorAll(".text-control");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  // autofocus
  textInput[0].focus();
}

//close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
 
// launch blur event for text-control
textInput.forEach((input) => input.addEventListener("blur", checkTextInput));

function checkTextInput(input){
  // get actual input
  var input = this;
  //get formData binded
  var formDataBinded = input.parentNode;

  // set customs constraints
  switch(input.id){
    case "first":
    case "last":
      // set message
      formDataBinded.setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du nom.");
      // name regex declaration
      const nameRegex = new RegExp("[a-zA-Z]+(([ .'-])?[a-zA-Z]){1,20}");
      // test input value
      var checkInput = nameRegex.test(input.value);
      setVisibility(checkInput);
    break;
    
    case "email":
      // set message
      formDataBinded.setAttribute("data-error","Veuillez entrer une adresse mail valide(ex: john@doe.com).");
      // email regex declaration
      const mailRegex = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
      // test input value
      var checkInput = mailRegex.test(input.value);
      setVisibility(checkInput);
    break;
    
    case "birthdate":
          // get year of birth
    let birthdateYear = input.value.substring(0,4);
    // get date
    let date = new Date();
    // get year
    let year = date.getFullYear();
    // BD empty
    if(input.value == ""){
      // set message
      formDataBinded.setAttribute("data-error","Veuillez entrer une date de naissance.");
      checkInput = false;
      setVisibility(checkInput);
    // BD < 7years
    }else if(birthdateYear > year - 7){
      // set message
      formDataBinded.setAttribute("data-error","Vous semblez jeune.");
      checkInput = false;
      setVisibility(checkInput);
    // BD > 77years
    } else if(birthdateYear < year - 77){
      // set message
      formDataBinded.setAttribute("data-error","Avez vous vraiment toute cette experience?.");
      checkInput = false;
      setVisibility(checkInput);
    }else{
      checkInput = true;
      setVisibility(checkInput);
    }
    
    break;

    case "quantity":
      // set message
      formDataBinded.setAttribute("data-error","Vous devez entrer un chiffre");
      //  test input value
      var checkInput =! Object.is(NaN, input.valueAsNumber);
      setVisibility(checkInput);
    break;
    
    default:
      console.log("erreur Dev");
  }

  // setVisibility for text-control
  function setVisibility(checkInput){
    textError = formDataBinded.getAttribute("data-error-visible");
    
    if(checkInput == true){
      //remove error
      formDataBinded.setAttribute("data-error-visible", false);
      return textError = false;
    }else if(checkInput == false){
      // set visibility 
      formDataBinded.setAttribute("data-error-visible", true);
      return textError = true;
    }
  }
}


// check checkBox
function checkboxCheck(){
  // CheckBoxes
  let checkBoxes = document.querySelectorAll(".checkbox-input");
  // all except the last 2
  let checkBoxesLength = checkBoxes.length - 2;
  let checkBoxesNodeError;

  // creer boucle full -2 pour location
  for(let i = 0; i < (checkBoxesLength); i++){
    if(checkBoxes[i].checked == true){
      var boxChecked = true;
    }else {
      checkBoxesNodeError = checkBoxes[i].parentNode;
    }
  }

  // set location error
  if(boxChecked == undefined){
    checkBoxesNodeError.setAttribute("data-error", "il vous faut choisir au moins une option");
    checkBoxesNodeError.setAttribute("data-error-visible", true);
  }else{
    checkBoxesNodeError.setAttribute("data-error-visible", false);
  }

  // CGU
  let cgu = checkBoxes[checkBoxesLength].checked;
  let cguParent = checkBoxes[checkBoxesLength].parentNode;

  // set cgu error
  if(cgu == false){
    cguParent.setAttribute("data-error", "Vous devez accepter les termes et conditions");
    cguParent.setAttribute("data-error-visible", true);
  }else{
    cguParent.setAttribute("data-error-visible", false);
  }

  if(cgu && boxChecked){
    return checkBoxesChecked = true;
  }else {
    return checkBoxesChecked = false;
  }
  console.log(checkBoxesChecked);
}

function validate(event){

  event.preventDefault();
  
  // check empty text
  var emptyText;

  for(let i = 0; i < textInput.length; i++){
    if(textInput[i].value == ''){
      emptyText = true;textInput.forEach((input) => input.addEventListener("blur", checkTextInput));
      textInput[i].focus();
    }else{
      emptyText = false;
    }
  }
  
  checkboxCheck();

  // send form
  if (!emptyText && !textError && checkBoxesChecked){
    
    let XHR = new XMLHttpRequest();
    let form = document.querySelector("form");
    let FD = new FormData(form);
    
    //define success 
    XHR.addEventListener("load", function(event){
      alert("Merci ! Votre réservation a été reçue.");
    });
    
    //define error
    XHR.addEventListener("error", function(event){
      alert("Erreur !");
    });

   XHR.open("POST", "/example.php");
    // send Data
    XHR.send(FD);  
  }
}