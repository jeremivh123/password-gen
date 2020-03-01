var resultEl = document.querySelector("#result");
var lengthEl = document.querySelector("#length");
var uppercaseEl = document.querySelector("#uppercase");
var lowercaseEl = document.querySelector("#lowercase");
var numbersEl = document.querySelector("#numbers");
var specialCharactersEl = document.querySelector("#specialCharacters");
var generateEl = document.querySelector("#generate");
var clipboardEl = document.querySelector("#clipboard");

var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
   number: getRandomNumber,
    symbol: getRandomSymbol
};



generateEl.addEventListener('click', function(){
    var length = lengthEl.value;
    var hasLower = lowercaseEl.checked;
    var hasUpper = uppercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbol = specialCharactersEl.checked;
    //console.log(length);
    resultEl.innerHTML= generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});

//clipboard

clipboardEl.addEventListener('click', function(){
    var textarea = document.createElement('textarea');
    var password = resultEl.innerHTML;

    if(!password){
        return;
    }

    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password has been copied.');
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = "";

    var typesCount = lower + upper + number + symbol;
    console.log('typescount:', typesCount);
    var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    (
        item => Object.values(item)[0]
     );

    //console.log('typesArr:', typesArr);
   
    if(typesCount === 0){
        return '';
    }
    for (let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });    
    }
    var finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()* 26)+ 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()* 26)+ 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()* 10)+ 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random()* symbols.length)];
}
