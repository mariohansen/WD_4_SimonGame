var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;
var userClickedPattern = [];

$(document).keypress(function() {
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        $("h2").addClass("hidden");
        started = true;
    }
});


$(".btn").click(function() {
    if (started){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour); 
    checkAnswer(userClickedPattern.length - 1);
  }
});


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level " + level);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    $("h2").removeClass("hidden");
    started = false;
}

