let emailInput = document.getElementById("emailInput");
let PemailInput = document.getElementById("PemailInput");
let passwordInput = document.getElementById("passwordInput");
let PpasswordInput = document.getElementById("PpasswordInput");
let loginForm = document.getElementById("loginForm");
let loginAlert = document.getElementById("loginAlert");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    PemailInput.innerText = "."; PpasswordInput.innerText = ".";
    PemailInput.style.color="white"; PpasswordInput.style.color="white";
    loginAlert.style.display = "none";
    const users = JSON.parse(localStorage.getItem("users"));
    if(emailInput.value === "" && passwordInput.value === ""){
        PemailInput.innerText = "Required Email";
        PemailInput.style.color="red";
        PpasswordInput.innerText = "Requird Password";
        PpasswordInput.style.color="red";
        return;
    } else if (emailInput.value === ""){
        PemailInput.innerText = "Required Email";
        PemailInput.style.color="red";
    } else if(passwordInput.value === ""){
        PpasswordInput.innerText = "Requird Password";
        PpasswordInput.style.color="red";
    } else {
        for (i of users){
            if(i.email == emailInput.value && i.password == passwordInput.value){
                let userData = {name:i.name,email:i.email}
                sessionStorage.setItem("user",JSON.stringify(userData));
                window.location.href = "home.html";
            }
            else{
                loginAlert.style.display = "block";
            }
        }
    }
})
