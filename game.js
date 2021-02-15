var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function()
  {                                       
    if (!started)//started=false
      {
          $("#level-title").text("Level " + level);     //level 0;
          nextSequence();
          started = true;
      }
  });
$(".btn").click(function()
  {
    var userChosenColour = $(this).attr("id");          //"blue"
    userClickedPattern.push(userChosenColour);          //userClickedPattern = ["blue"];
    playSound(userChosenColour);                        //playSound("blue");
    animatePress(userChosenColour);                     //animatePress("blue");
    checkAnswer(userClickedPattern.length-1);           //checkAnswer(0);
  });
function checkAnswer(currentLevel)
  {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])							
      {
        if (userClickedPattern.length === gamePattern.length)
          {
            setTimeout(function ()
              {
                nextSequence();												//function nextSequence is called after 1000 milliseconds
              }, 1000);
          }
      }
    else
      {
        playSound("wrong");													//wrong.mp3
        $("body").addClass("game-over");									//game-over class added with a red background
        $("#level-title").text("Game Over, Press Any Key to Restart");		//shown at the heading
        setTimeout(function ()
          {
            $("body").removeClass("game-over");								//removing class game-over after 200 milliseconds
          }, 200);
        startOver();
      }
  }
function nextSequence()
  {
    userClickedPattern = [];
    level++;                                                          //1
    $("#level-title").text("Level " + level);                         //level 1;
    var randomNumber = Math.floor(Math.random() * 4);                 //1
    var randomChosenColour = buttonColours[randomNumber];             //"blue"
    gamePattern.push(randomChosenColour);                             //gamepattern = ["blue"];
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //select #blue, fadeIn, then fadeOut, again fadeIn
    playSound(randomChosenColour);                                    //playSound("blue");
  }
function animatePress(currentColor)
  {
    $("#" + currentColor).addClass("pressed");				
    setTimeout(function ()
      {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
  }
function playSound(name)
  {
    var audio = new Audio("Sound/" + name + ".mp3");
    audio.play();
  }
function startOver()
  {
    level = 0;
    gamePattern = [];
    started = false;
  }