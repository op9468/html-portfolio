let gamePattern = [];
let randomChosenColour = null;
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
const buttons = document.querySelectorAll(".btn");
let lvl = 0;



const keyDown = (function () {
  var executed = false;

  return function () {

      if (!executed) {
          executed = true;
          nextSequence();
      }

  };
})();

document.addEventListener("keydown", keyDown);

const nextSequence = () => {

  document.addEventListener("keydown", keyDown);
  document.removeEventListener("keydown", startOver);

  const randomNum = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  lvl += 1;

  document.querySelector("h1").innerHTML = "Level " + lvl;
  
  playSound(gamePattern[gamePattern.length - 1])

  checkAnswer()

}

for (let i = 0;i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (evt) {
  userClickedPattern.push(buttons[i].id)

  playSound(buttons[i].id);

  checkAnswer()
  
})
}

const checkAnswer = () => {
  

  if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1] && userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(nextSequence, 700);
  } else if (gamePattern[userClickedPattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1]) {
    gameOver();
  }
}

const gameOver = () => {
  document.querySelector("body").classList.add("game-over");

  const changeBackground = () => {
    document.querySelector("body").classList.remove("game-over")
  }
  setTimeout(changeBackground, 350);
 
  document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";

  var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

  document.removeEventListener("keydown", keyDown);
  document.addEventListener("keydown", startOver);
  executed = false;
}

const startOver = () => {
  lvl = 0;
  gamePattern = [];
  userClickedPattern = [];
  nextSequence();
}

const playSound = (randomChosenColour) => {
  
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);

  document.querySelector("." + randomChosenColour).classList.add("pressed");

  setTimeout(function() {
    document.querySelector("." + randomChosenColour).classList.remove("pressed");
  }, 100)

  switch (randomChosenColour) {
    case "red":
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
     
    case "green":
      var audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
      
    case "yellow":
      var audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;  

    
    default:
      break;
  }
  
}

