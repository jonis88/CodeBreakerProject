let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }
    
    if(!validateInput(input.value)){
        return false;
    }
    else{
        attempt.value++;
    }

    let res = getResults(input.value);
    if(res){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }
    else if(!res && attempt.value >= 10){
        setMessage("You Lose! :(")
        showAnswer(false);
        showReplay();
    }
    else{
        setMessage("Incorrect, try again!")
    }
    
}

function setHiddenFields(){
    answer.value = Math.floor(Math.random()*9999).toString();
    while(answer.value.length < 4) {
        answer.value += 0 + answer.value;
    }
    attempt.value = 0;
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function validateInput(input){
    if(input.length == 4){
        return true;
    }
    else{
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input){
    let openDiv = '<div class="row"><span class="col-md-6">';
    let midDiv = '</span><div class="col-md-6">';
    let endDiv = '</div></div>';

    let right = '<span class="glyphicon glyphicon-ok"></span>';
    let close = '<span class="glyphicon glyphicon-transfer"></span>';
    let wrong = '<span class="glyphicon glyphicon-remove"></span>';

    let rightAnswer = answer.value;
    let codedAnswer = '';
    let countRight = 0;

    for (let i = 0; i < 4; i++) {
        let current = input.charAt(i);
        if (rightAnswer.charAt(i) == current) {
            codedAnswer += right;
            countRight++;
        } else if (rightAnswer.includes(current)) {
            codedAnswer += close;
        } else {
            codedAnswer += wrong;
        }
    }

    let result = document.getElementById('results');
    
    result.innerHTML += openDiv + input + midDiv + codedAnswer + endDiv;
        
    if (countRight == 4) {
        return true;
    } else {
        return false;
    }
}

function showAnswer(gotIt) {
    let answerLabel = document.getElementById('code');
    answerLabel.innerHTML = answer.value;

    if (gotIt) {
        answerLabel.className += " success";
    } else {
        answerLabel.className += " failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}
