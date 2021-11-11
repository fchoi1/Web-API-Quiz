var startEl = document.querySelector(".start-section");
var quizEl = document.querySelector(".quiz-section");
var endEl = document.querySelector(".end-section");
var endFormEl = document.querySelector(".initials-form");

var quizTimer = 100; // Time for quiz in seconds

var questionCounter = 0;
var numQuestions = questionInfo.length; // know the number of questions
var score = 0;
var scoreList = []; // [ {Initial: , score: }]

var startQuizHandler = function(event){
    let element = event.target
    score = 0;
    if (element.matches(".start-btn")){
        quizCounter();
        createQuizQuestion(questionCounter);
        startEl.setAttribute('style', 'display: none');
    }
};

// Handles timer
var quizCounter = function(){
    let timeEl = document.querySelector(".timer-text");

    let timeInterval = setInterval(function(){
        timeEl.textContent = "Time: " +quizTimer;
        quizTimer -= 1;

        // End timer when time ends or no more questions
        if (quizTimer < 0 || questionCounter > numQuestions-1){
            clearInterval(timeInterval); //stop the function from running when time ends
            endQuiz();
        }
    }, 1000); //display every second
}

var createQuizQuestion = function(questionNumber){
    //Remove any questions previous
    quizEl.innerHTML = '';
    
    // Check if any questions remain
    if(questionNumber < numQuestions){
        //Create question
        let questionEl = document.createElement("h2");
        questionEl.className = "quiz-section-question heading-title";
        questionEl.textContent = questionInfo[questionNumber].question; // From other file (questionInfo.js)
        quizEl.append(questionEl);

        // Create options and append to list
        var i = 1;
        for(option of questionInfo[questionNumber].options){ // From other file (questionInfo.js)
            let optionButton = document.createElement("button");
            optionButton.className = "answer-btn btn";
            optionButton.setAttribute("data-option-number", i); // not used but may be important some point on
            optionButton.textContent = i + ". " + option;
            i++;
            quizEl.append(optionButton);
        }
    }
}

// Check correct answer
var quizAnswerHandler = function(event){
    event.preventDefault(); // Stops the page from reloading when submit
    let element = event.target
    if (element.matches(".answer-btn")){
        checkAnswer(questionCounter, element);

        // Check if any questions left
        if(questionCounter > numQuestions-1){ // This means it is the last question
            console.log(score, quizTimer);
            setTimeout(endQuiz(), 3000); // Delay 3 sec, end quiz
            return;
        }    

        let allButtonEl = document.querySelectorAll(".btn");
        // disable all buttons
        allButtonEl.forEach(function(buttonEl){
            buttonEl.disabled = true;
        })
    
        // Enables button after 3 secs and creates next question
        setTimeout(function(){
            allButtonEl.forEach(function(buttonEl){
                buttonEl.disabled = false;
            })
            questionCounter++; // Update to next question
            createQuizQuestion(questionCounter) // diplay next question
        }, 1000); // Delay 1 sec, move to next question
    }
}

var checkAnswer = function(questionNumber, optionButtonEl){
    
    let answerEl = document.createElement("h3");
    answerEl.className = "answer";

    let optionNumber = optionButtonEl.dataset.optionNumber; 
    console.log(typeof(optionNumber), optionNumber, typeof( questionInfo[questionNumber].answer,questionInfo[questionNumber].answer))
    if(optionNumber == questionInfo[questionNumber].answer){
        score += 100; // Add 100 points for each correct answer
        answerEl.textContent = "This is the correct answer";
    }else{
        answerEl.textContent = "This is the wrong answer";
        quizTimer -= 10;
    }
    quizEl.append(answerEl);
}

var endQuiz = function(){
    score += quizTimer; // Add time remaing for final score

    // Remove quiz section (faster method)
    let quizChildEL = document.querySelector(".quiz-section").childNodes;
    quizChildEL.forEach(function(children){
        quizEl.remove(children);
    });

    // Display final score
    let endPEl = document.querySelector('.end-section-info');

    endPEl.textContent = "Your final score is " + score + ".";
    endEl.setAttribute('style', 'display: flex; ');
}

var submitQuizHandler = function(event){
    event.preventDefault(); // Stops the page from reloading when submit

    let initials = document.querySelector('.initials-input').value;

    if(!initials){
        alert("Initials cannot be Blank!");
        return;
    }
    let scoreListObj = {Initial: initials , score: score}
    scoreList.push(scoreListObj);

    saveScores(); // Save to local
    endFormEl.reset();  // Reset Form
}

var restartHandler = function(event){
    let element = event.target
    if (element.matches(".main-menu-btn")){
        window.location.href="index.html";
    }
};

var saveScores = function(){
    console.log("saving scores")
    localStorage.setItem("scores", JSON.stringify(scoreList));
}

var loadScores = function(){
    var loadedScores = localStorage.getItem("scores");
    if (!loadedScores){
        return false;
    }
    scoreList = JSON.parse(loadedScores);
}

// Hide End Section First
endEl.setAttribute('style', 'display: none');

endFormEl.addEventListener("submit", submitQuizHandler);
startEl.addEventListener("click", startQuizHandler);
quizEl.addEventListener("click", quizAnswerHandler); // Check for which option is pressed
endEl.addEventListener("click", restartHandler);
loadScores();
