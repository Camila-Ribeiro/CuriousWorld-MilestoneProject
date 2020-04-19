var fullName = document.getElementById("fullname");
var email = document.getElementById("emailaddress");
var message = document.getElementById("textarea");
var feedback_name= document.getElementById("feedback_fullname");
var feedback_email= document.getElementById("feedback_email");
var feedback_text= document.getElementById("feedback_text");
var submit_success = document.getElementById("alert_success");
var submit_fail = document.getElementById("alert_danger");

function sendMail(contactForm) {
  emailjs
    .send("gmail", "googleplaces_milestoneproject", {
      from_name: contactForm.fullname.value,
      from_email: contactForm.emailaddress.value,
      project_request: contactForm.textarea.value
    })
    .then(
      function(response) {
        if (submit_fail) {
          submit_fail.classList.add("d-none");
        }
        resetForm();
        submit_success.classList.remove("d-none");
        setTimeout(() => {
          submit_success.classList.add("d-none");
        }, 3000);
        console.log("SUCCESS", response);
      },
      function(error) {
        submit_fail.classList.remove("d-none");
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
    feedback.classList.add("d-none"); 
  }else{
    input.classList.remove("is-invalid");
    input.classList.add("is-valid"); 
    feedback.classList.remove("d-none"); 
  }
}

function resetForm() {
  var arr_feedback = document.querySelectorAll(".valid-feedback");
  var arr_valid = document.querySelectorAll(".is-valid");
  for (let index = 0; index < arr_feedback.length; index++) {
    var feedback = arr_feedback[index];
    var valid = arr_valid[index];
    feedback.classList.add("d-none");
    valid.classList.remove("is-valid");
  }
  document.getElementById("contact_form").reset();
}
