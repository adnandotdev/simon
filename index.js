
var gamePattern=[];

var buttonColors=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var level=0;

var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        started = true;
        nextSequence();
        
        
    }
});

 $(".btn").click(function(event){

    var userChoosenColor=$(event.target).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(indexOfPressedColor){

    if(gamePattern[indexOfPressedColor]===userClickedPattern[indexOfPressedColor]){

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },800);
            
        }
    } else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      
      startOver();
    }

}






function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber =Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+ randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    animatePress(userChoosenColor);

    
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)  
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function startOver() {

   
    level = 0;
    gamePattern = [];
    started = false;
  }
