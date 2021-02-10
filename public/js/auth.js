let loginBtn = document.getElementById('login-btn');
let signUpBtn = document.getElementById('signup-btn');

let loginEmail = document.querySelectorAll('#login-form .email')[0];
let signUpEmail = document.querySelectorAll('#signup-form .email')[0];

let signUpPassword = document.querySelectorAll('#signup-form .password')[0];
let loginPassword = document.querySelectorAll('#login-form .password')[0];

let signUpUsername = document.querySelectorAll('#signup-form .username')[0];



// login
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let body = {
        email: await loginEmail.value,
        password: await loginPassword.value
    }
    console.log(body)
})








// sign up