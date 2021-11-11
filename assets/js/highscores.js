var backButtonEl = document.querySelector(".back-btn");
var clearScoreButtonEl = document.querySelector(".clear-scores-btn");


var scoreList = []; // Keep in array [  [initals, score], [initial, score]]

var loadScores = function(){
    var loadedScores = localStorage.getItem("scores");
    if (!loadedScores){
        return false;
    }
    loadedScores = JSON.parse(loadedScores);
    return loadedScores;
}

scoreList = loadScores();
console.log(scoreList)

// Return to main page
backButtonEl.addEventListener("click", function(){
    window.location.href="index.html";
});