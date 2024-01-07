
function checkEmail(emailInput, emailField) {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emailPattern)) {
    emailField.classList.add("invalid");
    return false;
  }
  emailField.classList.remove("invalid");
  return true;
}


function createPass(passInput, passField) {
  if (passInput.value === "") {
    passField.classList.add("invalid");
    return false;
  }
  passField.classList.remove("invalid");
  return true;
}


function confirmPass(passInput, cPassInput, cPassField) {
  if (passInput.value !== cPassInput.value || cPassInput.value === "") {
    cPassField.classList.add("invalid");
    return false;
  }
  cPassField.classList.remove("invalid");
  return true;
}


document.querySelectorAll(".show-hide").forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input");
    if (pInput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      pInput.type = "text";
    } else {
      eyeIcon.classList.replace("bx-show", "bx-hide");
      pInput.type = "password";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"),
        emailField = form.querySelector(".email-field"),
        emailInput = emailField.querySelector(".email"),
        passField = form.querySelector(".create-password"),
        passInput = passField.querySelector(".password"),
        cPassField = form.querySelector(".confirm-password"),
        cPassInput = cPassField.querySelector(".cPassword");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

  
    const isEmailValid = checkEmail(emailInput, emailField),
          isPassValid = createPass(passInput, passField),
          isCPassValid = confirmPass(passInput, cPassInput, cPassField);

    if (isEmailValid && isPassValid && isCPassValid) {
     
      const userData = {
        email: emailInput.value,
        password: passInput.value
      };

      fetch('http://localhost:3306/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log('User created successfully:', data.message);
          window.location.assign("index1.html");
          
        } else {
          console.error('Error creating user:', data.error);
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
       
      });
    }
  });

  emailInput.addEventListener("keyup", () => checkEmail(emailInput, emailField));
  passInput.addEventListener("keyup", () => createPass(passInput, passField));
  cPassInput.addEventListener("keyup", () => confirmPass(passInput, cPassInput, cPassField));
});
