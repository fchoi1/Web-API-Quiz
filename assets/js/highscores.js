var highScoreListEl = document.querySelector(".highscore-list");
var backButtonEl = document.querySelector(".back-btn");
var clearScoreButtonEl = document.querySelector(".clear-scores-btn");
var scoreListArray = []; // Keep in array [  [initals, score], [initial, score]]

var loadScoresArray = function(){ // Load scores into different array for sorting
    var loadedScores = localStorage.getItem("scores");
    var arrayScores = [];
    if (!loadedScores){
        return false;
    }
    loadedScores = JSON.parse(loadedScores);

    for (scoreInfo of loadedScores){
        arrayScores.push([scoreInfo.Initial, scoreInfo.score]);
    }

    // Sort array by score 
    arrayScores.sort(function(a, b) {
        return b[1] - a[1];
    })
    return arrayScores;
}

var displayScores = function(scoreArray){
    // If no scores, remove everything
    if (!scoreArray || scoreArray.length === 0){
        let highScoreListChildEl = document.querySelector(".highscore-list").childNodes;
        highScoreListChildEl.forEach(function(children){
            highScoreListEl.remove(children);
        });
        return;
    }
    var i = 1;
    for(scoreInfo of scoreArray){
        var highscoreListItemEl = document.createElement("li");
        var highscoreSpanEl = document.createElement("span");
        highscoreListItemEl.className = "highscore-list-item";
        highscoreSpanEl.textContent = i + ". " + scoreInfo[0] + " : " + scoreInfo[1];
        highscoreListItemEl.append(highscoreSpanEl);
        highScoreListEl.append(highscoreListItemEl);
        i++;

    }
}

var clearScores = function(){
    var empty = [];
    displayScores(empty);
    localStorage.removeItem("scores");
}

// Return to main page
backButtonEl.addEventListener("click", function(){
    window.location.href="index.html";
});

clearScoreButtonEl.addEventListener("click", function(){
    clearScores();
});


scoreListArray = loadScoresArray();
console.log(scoreListArray);

displayScores(scoreListArray);

