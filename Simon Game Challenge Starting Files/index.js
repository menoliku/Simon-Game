$(document).ready(function(){
  var buttonColors = ["green", "red", "yellow", "blue"];
  var gamePattern = [];
  var userClickedPattern = [];
  var started = false;
  var level = 0;

  // Start game on "a" key
  $(document).keydown(function(event){
    if(event.key === "a" && !started){
      started = true;
      level = 0;
      gamePattern = [];
      nextSequence();
    }
  });

  // Handle user clicks
  $(".btn").click(function(){
    var userChosenColor = $(this).attr("id"); // button id = color
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });

  function checkAnswer(currentIndex){
    if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
      // correct so far
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    } else {
      // wrong answer
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(()=> $("body").removeClass("game-over"), 200);
      $("h1").text("Game Over, Press A to Restart");
      started = false;
    }
  }

  function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }

  function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
  }
});
