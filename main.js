"use strict";

let singlePlayer = true;
document.querySelectorAll("div.rows div").forEach(x => {
  x.addEventListener("click", clicked);
});
var messagediv = document.getElementsByClassName("message")[0];
var playerABoxes = [];
var playerBBoxes = [];
var playerA = true;
let box;
let takenBoxes = [];
let gameCompleted = false;
let timeout = null;
let round = 1;
let playerAWon = 0;
let playerBWon = 0;
var winner = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9]
];
function clicked(event, number) {
  if (!gameCompleted) {
    if (number) {
      document.getElementById(number).innerHTML = "O";
      playerBBoxes.push(number);
      takenBoxes.push(number);
      box = playerBBoxes;
      checkGame();
    } else if (event.target.innerHTML.trim() == "") {
      event.target.innerHTML = playerA ? "X" : "0";
      box = playerA ? playerABoxes : playerBBoxes;
      var id = parseInt(event.target.attributes.id.value);
      box.push(id);
      takenBoxes.push(id);
      checkGame();
      if (singlePlayer && !playerA) {
        setTimeout(computer,500)

      }
    }
  }
}
function checkGame() {
  winner.forEach(i => {
    if (box.includes(i[0]) && box.includes(i[1]) && box.includes(i[2])) {
      gameCompleted = true;
      if (playerA) {
        playerAWon += 1;
        document.querySelector("#x span").innerHTML = playerAWon;
      } else {
        playerBWon += 1;
        document.querySelector("#o span").innerHTML = playerBWon;
      }
      if (round <5) {
        showWinner();
      } else {
        document.querySelector(".restart").innerHTML = "Restart";
        if (playerAWon < playerBWon) {
          showWinner("O");
        } else {
          showWinner("X");
        }
      }

      return false;
    }
  });
  playerA = playerA ? false : true;
}
function showWinner(winnerr) {
  messagediv.style.display = "flex";
  if (winnerr) {
      let msg;
    if(singlePlayer && winnerr=="X"){
         msg="Congratulations!!! You Won";
    }
    else if(singlePlayer && winnerr=="O"){
         msg="Sorry! Better Luck Next Time";
    }
    else{
         msg=`Congratulations!!! Player ${winnerr}`;
    }
    messagediv.innerText = msg;
  } else {
    messagediv.innerText = ` Player X  ${playerAWon} : ${playerBWon} Player O`;
  }

  round += 1;
}
function restart() {


document.querySelector(".restart").innerHTML = "Next";
gameCompleted = false;
  messagediv.style.display = "none";
  document.querySelectorAll("div.rows div").forEach(x => {
    x.innerHTML = "";
  });
  playerABoxes = [];
  playerBBoxes = [];
  playerA = true;
  takenBoxes = [];
  if(round>5) {
    document.querySelector("#x span").innerHTML = " 0 ";
    document.querySelector("#o span").innerHTML = " 0 ";
    round = 1;
    playerAWon = 0;
    playerBWon = 0;
  }
  document.querySelector(".round span").innerHTML = round;

}
function getNumber() {
  let number = parseInt(Math.random() * 10);
  if (number != 0 && !takenBoxes.includes(number)) {
    return number;
  } else {
    getNumber();
  }
}

async function computer() {
  let number = await getNumber();
  while (number == undefined) {
    number = getNumber();
  }
  let last = playerABoxes[playerABoxes.length - 1];
  let secondLast = playerABoxes[playerABoxes.length - 2];
  let mylast = playerBBoxes[playerBBoxes.length - 1];
  let mysecondLast = playerBBoxes[playerBBoxes.length - 2];
  let val = computerLogic(last, secondLast, mylast, mysecondLast);
  if (val != 0) {
    number = val;
  }

  clicked(null, number);
}
function singlePlayerMode(truth) {
  round = 6;
  restart();
  singlePlayer = truth ? true : false;
  localStorage.setItem("single", singlePlayer.toString());
}
function computerLogic(last, secondLast, mylast, mysecondLast) {
  let number = 0;
  winner.forEach(x => {
    if (x.includes(last) && x.includes(secondLast)) {
      for (let i = 0; i < 3; i++) {
        if (x[i] != last && x[i] != secondLast) {
          if (!takenBoxes.includes(x[i])) {
            number = x[i];
          }
        }
      }
    }
  });
  winner.forEach(x => {
    if (x.includes(mylast) && x.includes(mysecondLast)) {
      for (let i = 0; i < 3; i++) {
        if (x[i] != last && x[i] != secondLast) {
          if (!takenBoxes.includes(x[i])) {
            number = x[i];
          }
        }
      }
    }
  });
  return number;
}
function toggle(toggleValue) {
  var knob = document.getElementsByClassName("knob")[0];
  var bar = document.getElementsByClassName("bar")[0];
  if (toggleValue == "true") {
    singlePlayerMode();
    knob.style.backgroundColor = "rgb(26, 115, 232)";
    knob.style.transform = "translate3d(13px,0,0)";
    bar.style.backgroundColor = "rgb(141, 185, 244)";
    knob.attributes.checked.value = "false";
  } else {
    knob.style.backgroundColor = "white";
    knob.style.transform = "translate3d(0,0,0)";
    bar.style.backgroundColor = "#bdc1c6";
    knob.attributes.checked.value = "true";
    singlePlayerMode(true);
  }
}
function toggleMenu(element) {
  let menu = element.parentElement.children[0];
  if (menu.attributes.opened.value == "false") {
    menu.style.display = "flex";
    menu.attributes.opened.value = "true";
  } else {
    menu.style.display = "none";
    menu.attributes.opened.value = "false";
  }
}

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker
    .register('sw.js')
    .then(reg=>console.log("Tick Tac Toe ready for install and play offline."))
    .catch(err=>`Service Error ${err}`)
    // register("service.js");
  })
  
}