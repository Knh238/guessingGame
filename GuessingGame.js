function Game(){
   this.playersGuess=null;
   this.pastGuesses=[];
   this.winningNumber=generateWinningNumber();
    
};

Game.prototype.difference=function(){
    //not Math.abs = absolute value.
    //meaning not a negative result or a psotive that would indicate direction of difference but the raw number of diff
    return Math.abs(this.winningNumber-this.playersGuess);
};

Game.prototype.isLower=function(){
    return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission=function(val){
 if(typeof val !== 'number'|| val < 1 || val > 100 ){
    return "That is an invalid guess.";
 }
else{
    if(this.pastGuesses.indexOf(val) > -1 ){
       return "You have already guessed that number."
       }else{
        this.playersGuess=val;
        this.pastGuesses.push(val);
     $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
        return this.checkGuess();
         } 
    }
};

Game.prototype.checkGuess=function(){
if(this.playersGuess === this.winningNumber){
      $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
}

if(this.pastGuesses.length >= 5){
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
 
}else {
  
}
if(this.difference() < 10){
    return "You're burning up!";
}
if(this.difference() < 25){
    return "You're lukewarm.";
}
if(this.difference() < 50){
    return "You're a bit chilly.";
}
if(this.difference() < 100){
    return "You're ice cold!";
}
};

var newGame=function(){
   return new Game();
};

Game.prototype.provideHint=function(){
    var arr=[];
    var fakeNum1=generateWinningNumber();
    arr.push(fakeNum1);
    var fakeNum2=generateWinningNumber();
    arr.push(fakeNum2);
    arr.push(this.winningNumber);
    
    return shuffle(arr); 
};

var generateWinningNumber=function(){
    //format math floor-matth random times
    //max minus min + min
    return Math.floor(Math.random()*(100-0)+1);
    };

var shuffle=function(arr){
 var rem=arr.length,curr;ran;
 while(rem){
   var ran=Math.floor(Math.random()*rem--);
   var curr=arr[rem];
   arr[rem]=arr[ran];
   arr[ran]=curr;
 }  
 return arr;
}

function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

 $(document).ready(function (){
     var game= new Game();
        
    $('#submit').click(function(e) {
       //console.log('Submit button has been clicked')
        makeAGuess(game);
    })
      $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })
     
      $('#hint').click(function() {
       console.log('hint clicked')
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
          //Game.provideHint();
    })
      $('#reset').click(function(e) {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.attempt').text('--');
        $('#hint, #submit').prop("disabled",false);
    })
      })
