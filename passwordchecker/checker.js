const passwordField = document.getElementById('password');
const showPassword = document.getElementById('showHide');

console.log(passwordField);

const guidelines = {
    hasLower: /^(?=.*[a-z])/,
    hasUpper: /^(?=.*[A-Z])/,
    hasNumber: /^(?=.*[0-9])/,
    hasSpecial: /^(?=.*[@%#\-_!])/,
    noSpace: /^(?!.*[\s])/,
    isLength: /^(?=.{7,12}$)/,
    isGood: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@%#\-_!])(?!.*[\s])(?=.{7,12}$)/
};

passwordField.addEventListener('keyup', () => {
    if(guidelines.hasLower.test(passwordField.value)){
        document.getElementById('hasLower').classList.add('valid');
    } else{
        document.getElementById('hasLower').classList.remove('valid');
    }
    if(guidelines.hasUpper.test(passwordField.value)){
        document.getElementById('hasUpper').classList.add('valid');
    } else{
        document.getElementById('hasUpper').classList.remove('valid');
    }
    if(guidelines.hasNumber.test(passwordField.value)){
        document.getElementById('hasNumber').classList.add('valid');
    } else{
        document.getElementById('hasNumber').classList.remove('valid');
    }
    if(guidelines.hasSpecial.test(passwordField.value)){
        document.getElementById('hasSpecial').classList.add('valid');
    } else{
        document.getElementById('hasSpecial').classList.remove('valid');
    }
    if(guidelines.noSpace.test(passwordField.value)){
        document.getElementById('noSpace').classList.add('valid');
    } else{
        document.getElementById('noSpace').classList.remove('valid');
    }
    if(guidelines.isLength.test(passwordField.value)){
        document.getElementById('isLength').classList.add('valid');
    } else{
        document.getElementById('isLength').classList.remove('valid');
    }
    if(guidelines.isGood.test(passwordField.value)){
        document.getElementById('password').classList.remove('invalid');
        document.getElementById('password').classList.add('valid');
        document.getElementById('invalid-text').style.display = "none";
        document.getElementById('valid-text').style.display = "block";
    } else{
        document.getElementById('password').classList.remove('valid');
        document.getElementById('password').classList.add('invalid');
        document.getElementById('valid-text').style.display = "none";
        document.getElementById('invalid-text').style.display = "block";
    }
});

showPassword.addEventListener('change', () => {
    if(showPassword.checked){
        passwordField.type="text";
    } else{
        passwordField.type="password";
    }
});