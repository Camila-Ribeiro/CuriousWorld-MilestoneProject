var fullName = document.getElementById("fullname");
var email = document.getElementById("emailaddress");
var message = document.getElementById("textarea");
var feedback_name= document.getElementById("feedback_fullname");
var feedback_email= document.getElementById("feedback_email");
var feedback_text= document.getElementById("feedback_text");

function sendMail(contactForm) {
  emailjs
    .send("gmail", "googleplaces_milestoneproject", {
      from_name: contactForm.fullname.value,
      from_email: contactForm.emailaddress.value,
      project_request: contactForm.textarea.value
    })
    .then(
      function(response) {
        console.log("SUCCESS", response);
      },
      function(error) {
        console.log("FAILED:",error, response);
      }
    );
  return false;
}

//VALIDATION
fullName.oninput = function(){
  validateInputs(fullName,feedback_name);
} 

email.oninput = function(){
  validateInputs(email, feedback_email);
}

message.oninput = function(){
  validateInputs(message,feedback_text);
}

function validateInputs(input,feedback){
  if (input.value.length <= 0) {
    input.classList.add("is-invalid"); 
    feedback.style.display = "none";
  }else{
    input.classList.remove("is-invalid");
    input.classList.add("is-valid"); 
    feedback.style.display = "block";   
  }
}