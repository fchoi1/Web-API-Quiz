var startEl = document.querySelector(".start-section");
var quizEl = document.querySelector(".quiz-section");
var endEl = document.querySelector(".end-section");

var quizTimer = 10; // Time for quiz in seconds

var questionInfoFile = "./questionInfo.json"

var startQuizHandler = function(event){
    event.preventDefault(); // Stops the page from reloading when submit
    let element = event.target
    if (element.matches(".start-btn")){
        quizCounter();
    }
};

var endQuiz = function(){
    console.log("quiz ended");
}

// Parse from text file of questions
var parseQuestion = function(questionfile){
    fetch(questionfile)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
       this.users = json;
       //console.log(this.users);
   })
   .catch(function () {
       this.dataError = true;
   })

};

// Handles timer
var quizCounter = function(){
    let timeEl = document.querySelector(".timer-text");

    let timeInterval = setInterval(function(){
        timeEl.textContent = "Time: " +quizTimer;
        quizTimer -= 1;

        if (quizTimer < 0){
            clearInterval(timeInterval); //stop the function from running when time ends
            endQuiz();
        }
    }, 1000); //display every second
}

// var questionInfo = {
//     question: "",
//     options: [];
//     anser: "";
// }

var createQuizQuestion = function(question){

    //Create question
    let questionEl = document.createElement("h2");
    questionEl.className("quiz-section-question heading-title");
    questionEl.textContent = questionInfo.question;
    quizEl.append(questionEl);

    // Create options and append to list
    for(option of options){
        let optionButton = document.createElement("button");
        optionButton.className("answer-btn btn");
        optionButton.textContent = option;
        quizEl.append(optionButton);
    }
}

startEl.addEventListener("click", startQuizHandler);
parseQuestion(questionInfoFile);

