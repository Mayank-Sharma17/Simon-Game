var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false; // track if the game is started or not
var level = 0; // start at level 0

$(document).keypress(function () {
  // start the game if the key is pressed first time call next sequence
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// used jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); // play sound for user chosen colour

  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// checkAnswer(), it check the sequence is correct with the user input or not
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequenc()
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over"); // add css class - bg red for 200ms when wrong ans
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Change h1 to "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Call startOver() if the user gets the sequence wrong
    startOver();
  }
}

// generate random number btw o to 3
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++; // increment the level by 1 each time when the nextSequence() is called

  $("#level-title").text("Level " + level); // update the h1 with level

  var randomNumber = Math.floor(Math.random() * 4); // o to 3 included
  var randomChosenColour = buttonColours[randomNumber]; // randomly choose colors in the array
  gamePattern.push(randomChosenColour); // push the random color in game pattern

  // selecting random button using it's id which contains it's color and that color is also chosen randomly, add flash in it 100ms 1000ms->1sec
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 

  playSound(randomChosenColour); // play sound for random colour chosen
}

// function for playing sound when it got a random chosen colour or user chosen colour
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animation to user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    // remove the class after 100 ms
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// function for restarting the game
function startOver() {
  // reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
