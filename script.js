const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Successful form
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Email Regex
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else{
        showError(input, 'Email is not valid')
    }
}

//Check required field
function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() === ''){ //taking away any old whitespace
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max){
    if(input.value.length < min || input.value.length > max){
        showError(input, `${getFieldName(input)} must be in between ${min} and 
        ${max} characters long`);
    }
}

function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password does not match')
    }
}
//this is what shows the input field error message to the user
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event Listener
form.addEventListener('submit', e => {
    e.preventDefault(); //prevents from actually submitting
    //this is an empty username input
    checkRequired([username, email, password, password2]);
    checkEmail(email);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkLength(password2, 6, 25);
    checkPasswordsMatch(password, password2);
});