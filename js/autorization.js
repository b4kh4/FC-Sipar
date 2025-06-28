const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", () => {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    showRegister.classList.add("active");
    showLogin.classList.remove("active");
});

showLogin.addEventListener("click", () => {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    showLogin.classList.add("active");
    showRegister.classList.remove("active");
});