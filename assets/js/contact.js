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
        console.log("FAILED", response);
      }
    );
  return false;
}
