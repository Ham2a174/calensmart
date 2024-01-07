document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"),
        eField = form.querySelector(".email"),
        eInput = eField.querySelector("input"),
        pField = form.querySelector(".password"),
        pInput = pField.querySelector("input");

  form.onsubmit = (e) => {
    e.preventDefault();
   
    validateEmailAndPassword();

    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
      const userData = {
        email: eInput.value,
        password: pInput.value
      };

      fetch('http://localhost:3306/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log('Login successful:', data.message);
          window.location.assign("calendar.html");
        } else {
          console.error('Login failed:', data.error);
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
    }
  };

  function validateEmailAndPassword() {
    (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
    (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

    setTimeout(() => {
      eField.classList.remove("shake");
      pField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => { checkEmail(); }
    pInput.onkeyup = () => { checkPass(); }
  }

  function checkEmail() {
    
  }

  function checkPass() {
    
  }
});
