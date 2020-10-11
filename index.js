var player1 = prompt("Player One:  Enter your Name , You will be Blue!");
var player1Coler = 'rgb(20, 8, 196)';

var player2 = prompt('Player Two:  Enter your Name , You will be Red!');
var player2Coler = 'rgb(240, 7, 19)';

var game_on = true;
var table = $('table tr');

// it will give information from which index player has win
function reportWin(rowNum, colNum){
  console.log('You won starting at this row and col');
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(name, rowIndex, colIndex, color){
    table.eq(rowIndex).find('td').eq(colIndex).find('button').text(name);
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex); // initialization of variable
  for(var row=5; row>=0; row--){
    colorReport = returnColor(row, colIndex);
    if( colorReport === 'rgb(128, 128, 128)' ){
      return row;
    }
  }
}
// Here i'm checking the four red or four blue color which are adjecent (vertical,diagonal or horizontal)
function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck(){
  for(var row = 0; row < 6; row++){
    for(var col = 0; col < 4; col++){
      var one = returnColor(row, col);
      var two = returnColor(row, col+1);
      var three = returnColor(row, col+2);
      var four = returnColor(row, col+3);
      if(colorMatchCheck(one, two, three, four)){
        console.log('horizontal win occured!');
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var col = 0; col < 7; col++){
    for(var row = 0; row < 3; row++){
      var one = returnColor(row, col);
      var two = returnColor(row+1, col);
      var three = returnColor(row+2, col);
      var four = returnColor(row+3, col);
      if(colorMatchCheck(one, two, three, four)){
        console.log('vertical win occured!');
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for(var row = 0; row <6; row++){
    for(var col = 0; col < 7; col++){
      if(colorMatchCheck( returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2),returnColor(row+3, col+3))){
        console.log(' +ve diagonal win occured!');
        reportWin(row, col);
        return true;
      }
      else if(colorMatchCheck( returnColor(row, col), returnColor(row+1, col-1), returnColor(row+2, col-2), returnColor(row+3, col-3))){
        console.log(' -ve diagonal win occured!');
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

// START WITH PLAYER 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Coler;

$('.board button').on('mouseenter',function(){
  $(this).text(currentName);
})
$('.board button').on('mouseleave',function(){
  $(this).text(' ');
})

$('h3').text(player1 + " It is your turn. Pick a column to to drop in!");

$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(currentName ,bottomAvail, col, currentColor);

  if( $('board button').css('background-color') === 'rgb(128, 128, 128)'){
    $('.board button').on('mouseenter',function(){
      $(this).text(currentName);
    })
    $('.board button').on('mouseleave',function(){
      $(this).text(' ');
    })
  }

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
      $('h1').text(currentName + " Congrats!!! You have won the game!");
      $('h3').fadeOut(100);
      $('h2').text("Refresh the page to play again!");
  }

  if(currentPlayer === 1){
    currentPlayer = 2;
    currentName = player2;
    currentColor = player2Coler;
    $('h3').text(currentName + ": It is your turn!");
  }
  else{
    currentPlayer = 1;
    currentName = player1;
    currentColor = player1Coler;
    $('h3').text(currentName + " It is your turn!");
  }
  // alert(currentName + ": It is your turn");
})
