let RegForm = document.querySelector("#RegForm");
let nameInput = document.getElementById("nameInput");
let PnameInput = document.getElementById("PnameInput");
let emailInput = document.getElementById("emailInput");
let PemailInput = document.getElementById("PemailInput");
let passwordInput = document.getElementById("passwordInput");
let PpasswordInput = document.getElementById("PpasswordInput");
let conPassInput = document.getElementById("conPassInput");
let PconPassInput = document.getElementById("PconPassInput");
let RegisterBtn = document.getElementById("RegisterBtn");

let namePattern = /^[a-zA-Z0-9_@-]+$/;
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

RegForm.addEventListener("submit",(e)=>{
    e.preventDefault();
        PnameInput.innerText = "."; PemailInput.innerText = "."; PpasswordInput.innerText = "."; PconPassInput.innerText = ".";
        PnameInput.style.color="white"; PemailInput.style.color="white"; PpasswordInput.style.color="white"; PconPassInput.style.color="white";
    let nameError=false , emailError=false , passwordError=false ;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let userExist = users.find((user) => user.email === emailInput.value);
    if(!namePattern.test(nameInput.value) || nameInput.value === ""){
        if(nameInput.value === ""){
            PnameInput.innerText = "Required Name";
            PnameInput.style.color="red";
            nameError = true;
        } else {
            PnameInput.innerText = "Email is not valid";
            PnameInput.style.color="red";
            nameError = true;
        }
    }
    if(!emailPattern.test(emailInput.value) || emailInput.value === "" || userExist){
        if(emailInput.value === ""){
            PemailInput.innerText = "Required Email";
            PemailInput.style.color="red";
            emailError = true;
        } else{
            PemailInput.innerText = "Email isn't valid";
            PemailInput.style.color="red";
            emailError = true;
        }
        
    }
    if(passwordInput.value || passwordInput.value === "" || conPassInput.value === ""){
        if(passwordInput.value === "" ){
            PpasswordInput.innerText = "Requird Password";
            PpasswordInput.style.color="red";
            passwordError = true ;
        }else if(passwordInput.value.length < 8 ){
            PpasswordInput.innerText = "passord must be 8 char at least";
            PpasswordInput.style.color="red";
            
            passwordError = true ;
        } 
        if(conPassInput.value === ""){
            PconPassInput.innerText = "Requird Confirm Password";
            PconPassInput.style.color="red";
            passwordError = true ;
        } else if(conPassInput.value != passwordInput.value){
            PconPassInput.innerText = "Confirm password not matched";
            PconPassInput.style.color="red";
            passwordError = true ;
        }
    }
    if(nameError || emailError || passwordError){
        return;
    }
    if(userExist){
        PemailInput.innerText = "Email is not valid";
        PemailInput.style.color="red";
        return;
    }
    const updatedUser = [{ name : nameInput.value,email: emailInput.value, password: passwordInput.value }, ...users];
    localStorage.setItem("users", JSON.stringify(updatedUser));
    RegForm.reset();
    PnameInput.innerText = "."; PemailInput.innerText = "."; PpasswordInput.innerText = "."; PconPassInput.innerText = ".";
        PnameInput.style.color="white"; PemailInput.style.color="white"; PpasswordInput.style.color="white"; PconPassInput.style.color="white";
        let message = document.getElementById("successMessage");
        message.style.display = "block"; 
        message.style.opacity = 1;
        setTimeout(() => {
            window.location.href = "Login.html";
        }, 2000);
})
