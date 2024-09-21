let listOfRandomNumbers = [];
let maxNumber = 10;
let secretNumber = generateRandomNumber();

function changeHTML(tag, text){

    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text,"UK English Female",{rate: 1.2});

}

initialMessage();

let attempts = 1;

function verifyAnswer(){

    let answer = parseInt(document.querySelector("input").value);
    
    if(answer == secretNumber){

        changeHTML("h1", "That's correct!");
        let attemptsTxt = `You found the secret number: ${secretNumber}
        \n (${attempts} ${(attempts == 1 ? "attempt" : "attempts")}).`;
        changeHTML("p", attemptsTxt);
        clearField();

        let restart = document.getElementById("reiniciar");
        restart.removeAttribute("disabled");
        //restart.disabled = false;
    }
    else{

        if(answer > secretNumber){
            changeHTML("p", "The secret number is lower.");
        }
        else{
            changeHTML("p", "The secret number is higher.");
        }

        attempts++;
    }

}

function generateRandomNumber(){

    if(listOfRandomNumbers.length == maxNumber){
        listOfRandomNumbers = [];
    }

    let randomNumber = Math.floor((Math.random() * maxNumber) + 1);

    if(listOfRandomNumbers.includes(randomNumber)){

        return generateRandomNumber();
    }
    else{
        listOfRandomNumbers.push(randomNumber);
        return randomNumber;
    } 
}

function clearField(){
    answer = document.querySelector("input");
    answer.value = "";
}

function restartGame(){

    secretNumber = generateRandomNumber();
    initialMessage();
    attempts = 1;

    let restart = document.getElementById("reiniciar");
    restart.setAttribute("disabled", true);
    //restart.disabled = true;
}

function initialMessage(){

    changeHTML("h1", "Random Number Game");
    changeHTML("p", `Choose a number between 1 and ${maxNumber}: `);

}
