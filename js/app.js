!function () {
window.addEventListener('DOMContentLoaded', () => {

  const board = document.getElementById('board');
  const span = document.createElement('span');
  const label = document.createElement('label');
  const secondPlayer = `<br><br><label><input type="checkbox" id="secondPlayer" value = "value">  2 Players</label>`;
  const start = document.getElementById('start');
  const startButton = document.getElementsByClassName('button')[0];
  const finish = document.getElementById('finish');
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const h1Start = document.getElementsByTagName('h1')[0];
  const h1Board = document.getElementsByTagName('h1')[1];
  let name;
  const boxes = document.getElementsByClassName('boxes')[0];
  const box = document.getElementsByClassName('boxes')[0].children;
  const o = 'box box-filled-1';
  const x = 'box box-filled-2';
  const playersActive = 'players active';
  const oWins = 'screen screen-win screen-win-one';
  const xWins = 'screen screen-win screen-win-two';
  const tie = 'screen screen-win screen-win-tie';
  let turnCounter = 0;
  const endButton = document.getElementsByClassName('button')[1];
  const endMessage = document.getElementsByClassName('message')[0];
  let checkbox = false;
  let randomNumber = 0;



                      // set up the game
              // hidding the board and finish screen on load
               // adding a 2nd player checkbox and name option

        board.className = 'hidden';
        finish.className = 'hidden';
        label.innerHTML = secondPlayer;
        startButton.after(label);

        // When you click the start button ask for name or names and start game

  startButton.addEventListener('click', (e) => {
    e.preventDefault();
    let name = prompt('WOULD YOU LIKE TO PLAY A GAME??  Please enter Player O\'s Name.');
    start.className = 'hidden';
    board.className = 'board';
    player1.className = playersActive;

    if (name !== '') {
      player1.textContent = name;
      player1.style.fontSize = '1.7em';
    }

    const second = document.getElementById('secondPlayer');

     if (second.checked == true) {
       checkbox = true;
       let name2 = prompt('Please enter Player X\'s Name');
       if (name2 !== '') {
         player2.textContent = name2;
         player2.style.fontSize = '1.7em';
       }
      }
  });


// Build the Mouseover function if its player one have one image player 2 another

    boxes.addEventListener('mouseover', (e) => {
      if (player1.className === playersActive && e.target.className !== o && e.target.className !== x) {
        e.target.style.backgroundImage = 'url("img/o.svg")';
      }else if (player2.className === playersActive && e.target.className !== o && e.target.className !== x){
        e.target.style.backgroundImage = 'url("img/x.svg")';
      }
    });

    // build the mouseout listener to take off the background image as you leave the box

    boxes.addEventListener('mouseout', (e) => {
      if (player1.className === playersActive) {
        e.target.style.backgroundImage = '';
      }else if (player2.className === playersActive){
        e.target.style.backgroundImage = '';
      }
    });

      // create a function that checks for the win.

  function winOrLose(box1, box2, box3) {

    if (box1.className === o && box2.className === o && box3.className === o) {
        board.className = 'hidden';
        finish.className = oWins;
        endMessage.textContent = player1.textContent + ' Winner';

    } else if (box1.className === x && box2.className === x && box3.className === x) {
        board.className = 'hidden';
        finish.className = xWins;
        endMessage.textContent = player2.textContent + ' Winner';
      }
    };

    // create a function that marks the boxes

function markBox(box1) {

  if (player2.className === playersActive && box1.className === 'box') {
      box1.className = x;
      turnCounter += 1;
      player2.className = 'players';
      player1.className = playersActive;
    }
}

    // create a computers AI that will put an x anywhere the game is thretened or just a random x

 function computerAI(box1, box2, box3) {

  if (box1.className == x && box2.className == x) {
   markBox(box3);

  }if (box1.className == x && box3.className == x) {
   markBox(box2);

  }if (box2.className == x && box3.className == x) {
   markBox(box1);

  }if (box1.className == o && box2.className == o) {
     markBox(box3);

  }if (box1.className == o && box3.className == o) {
     markBox(box2);

  }if (box2.className == o && box3.className == o) {
     markBox(box1);
  }

}
  function checkWin() {
    winOrLose(box[0], box[1], box[2]);
    winOrLose(box[0], box[3], box[6]);
    winOrLose(box[0], box[4], box[8]);
    winOrLose(box[1], box[4], box[7]);
    winOrLose(box[2], box[4], box[6]);
    winOrLose(box[2], box[5], box[8]);
    winOrLose(box[3], box[4], box[5]);
    winOrLose(box[6], box[7], box[8]);
  }

      // Build a click function to alternate players an mark boxes

boxes.addEventListener('click', (e) => {

  let randomNumber = Math.floor(Math.random() * box.length);
  console.log(randomNumber);
  console.log(turnCounter);

  if (player1.className === playersActive && e.target.className !== o && e.target.className !== x) {
       e.target.className = o;
       player1.className ='players';
       player2.className = playersActive;
       turnCounter += 1;
     } else if (player2.className === playersActive && e.target.className !== o && e.target.className !== x && checkbox === true) {
       e.target.className = x;
       player2.className = 'players';
       player1.className = playersActive;
       turnCounter += 1;
     }
     // if playing the computer run this code

   if (player2.className === playersActive && checkbox === false) {
         setInterval(function(){
           checkWin();
           computerAI(box[0], box[1], box[2]);
           computerAI(box[0], box[3], box[6]);
           computerAI(box[0], box[4], box[8]);
           computerAI(box[1], box[4], box[7]);
           computerAI(box[2], box[4], box[6]);
           computerAI(box[2], box[5], box[8]);
           computerAI(box[3], box[4], box[5]);
           computerAI(box[6], box[7], box[8]);
              markBox(box[randomNumber]);
      }, 500);
}
  // check for a win on each click

    checkWin();

// If no one wins in 9 turns its a tie game

 if (turnCounter == 9) {
   board.className = 'hidden';
   finish.className = tie;
   endMessage.textContent = 'It\'s a Tie!'
 }
});

    // When you click on the New Game Button it reloads the page

endButton.addEventListener('click', (e) => {
  e.preventDefault();
  board.className = 'board';
  finish.className = 'hidden';
  player1.className = 'players active';
  player2.className = 'players';
  turnCounter = 0;
  for (let i = 0; i < box.length; i++) {
    box[i].className = 'box';
  }
    });

  });
}();
