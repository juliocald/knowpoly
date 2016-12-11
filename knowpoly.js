
var players = new Array();

function createPlayer(newName, newId) {
	var newPlayer = {
		id: newId,
		name: newName,
		liquid_money: 1000,
		asset_liquid_money : 2000,
		cycle: 1,
	};
	return newPlayer;
};

function createProperty(newValue, newId) {
	var newProperty = {
		value: newValue,
		owner: newId,
	};
	return newProperty;
};

function newPlayer(newId){
	var player = prompt("Ingrese nuevo jugador:","Nuevo jugador...");
	if (player != null) {
		var baby_player = createPlayer(player, newId);
		players.push(baby_player);
		var innerdiv = document.getElementById("player_"+newId+"_points");
		innerdiv.innerHTML = baby_player.liquid_money+"/"+baby_player.asset_liquid_money;
		var outerdiv = document.getElementById("player" + newId);
		outerdiv.innerHTML = player;
		outerdiv.appendChild(innerdiv);
	}
};

var properties = new Array();

"use strict";

 // Funciones del dado

// function dice_buttonFunc() {
//     printNum(dice.roll());
// }

// function printNum(num) {
//     document
//         .getElementById('diceBox')
//         .innerHTML = num;
// }

// var dice = {
//     sides: 6,
//     roll: function () {
//         return Math.floor(Math.random() * this.sides) + 1;
//     }
// };

var dice;
var dices = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;' ];
var stopped = true;
var t;
var chosenRandom;

function change() {
  var random = Math.floor(Math.random()*6);
  dice.innerHTML = dices[random]; 
  chosenRandom = random;
}

function stopstart() {
  if(stopped) {
    stopped = false;
    t = setInterval(change, 100); 
  } else {
    clearInterval(t);
    stopped = true;
    console.log(chosenRandom);
  }
  
}

// window.onload = function() {
//   dice = document.getElementById("dice");
//   stopstart(); 
// }
// ***********************

function getOffset(el) {
  el = el.getBoundingClientRect();
  
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY,
	height: el.height,
	width: el.width
  }
}

var playerIcons = new Array(4);

playerIcons[0] = document.createElement('img');
playerIcons[1] = document.createElement('img');
playerIcons[2] = document.createElement('img');
playerIcons[3] = document.createElement('img');
// var player1 = document.createElement('img');
// var player2 = document.createElement('img');
// var player3 = document.createElement('img');
// var player4 = document.createElement('img');

function movePlayer(){
	// var wrap = document.getElementById('wrap1');
	// var img = document.createElement('img');
 //    img.src = 'images/ultraball.svg';
    // wrap.appendChild(img);

    var wrap1 = document.getElementById('wrap1');
    var wrap2 = document.getElementById('wrap2');
    var wrap3 = document.getElementById('wrap3');
    var wrap4 = document.getElementById('wrap4');
 
    // Assume the bubble image dimensions and area dimensions
    var imgWidth = 40;
    var imgHeight = 40;
	var dimensions = getOffset(document.getElementById("casillaInicio"));
	//var player = document.createElement('img');

	playerIcons[0].src = 'images/ultraball.svg';
	playerIcons[1].src = 'images/greatball.svg';
	playerIcons[2].src = 'images/pokeball.svg';
	playerIcons[3].src = 'images/masterball.svg';

	playerIcons[0].setAttribute("id", "player1");
	playerIcons[1].setAttribute("id", "player2");
	playerIcons[2].setAttribute("id", "player3");
	playerIcons[3].setAttribute("id", "player4");

	playerIcons[0].setAttribute("height",imgHeight);
	playerIcons[1].setAttribute("height",imgHeight);
	playerIcons[2].setAttribute("height",imgHeight);
	playerIcons[3].setAttribute("height",imgHeight);

    playerIcons[0].setAttribute("width",imgWidth);
    playerIcons[1].setAttribute("width",imgWidth);
    playerIcons[2].setAttribute("width",imgWidth);
    playerIcons[3].setAttribute("width",imgWidth);
	// player.style.top = (dimensions.top) + 'px';
 //    player.style.left = (imgWidth/2) + 'px';

 	playerIcons[0].style.top = 0 + 'vh';
 	playerIcons[1].style.top = 0 + 'vh';
 	playerIcons[2].style.top = 0 + 'vh';
 	playerIcons[3].style.top = 0 + 'vh';

    playerIcons[0].style.left = 0 + 'vh';
    playerIcons[1].style.left = 5 + 'vh';
    playerIcons[2].style.left = 10 + 'vh';
    playerIcons[3].style.left = 15 + 'vh';

	wrap1.appendChild(playerIcons[0]);
	wrap1.appendChild(playerIcons[1]);
	wrap1.appendChild(playerIcons[2]);
	wrap1.appendChild(playerIcons[3]);
}

var imgWidth = 80;

// function movePlayerRight(){
// 	var tmpLeft = player.style.left;
// 	var left = tmpLeft.replace("px", "");
// 	var tempTop = player.style.top;
// 	console.log(player.style.top);
// 	var top = tempTop.replace("px", "");

// 	player.style.left = (parseInt(left)+40) + 'vh';
// 	player.style.top = (parseInt(top)+40) + 'vh';
// 	switch(cycle){
// 		case 1:
// 			if (parseInt(left)+20 < 120) {
// 				player.style.left = (parseInt(left)+20) + 'vh'; 
// 			} else {
// 				player.style.top = (parseInt(top)+20) + 'vh';
// 				cycle = 2;
// 			}
// 		break;

// 		case 2:
// 			if (parseInt(top)+20 < 80) {
// 				player.style.top = (parseInt(top)+20) + 'vh';
// 			}
// 			else {
// 				player.style.left = (parseInt(left)-20) + 'vh';
// 				cycle = 3;
// 			}
// 		break;

// 		case 3:
// 				if (parseInt(left)-20 >= 0) {
// 				player.style.left = (parseInt(left)-20) + 'vh';
// 			}
// 			else {
// 				player.style.top = (parseInt(top)-20) + 'vh';
// 				cycle = 4;
// 			}
// 		break;

// 		case 4:
// 			if (parseInt(top)-20 >= 0) {
// 				player.style.top = (parseInt(top)-20) + 'vh';
// 			}
// 			else {
// 				player.style.left = (parseInt(left)+20) + 'vh';
// 				cycle = 1;
// 			}
// 		break;
// 	}
// 	if (cycle) {
// 		player.style.left = (parseInt(left)+20) + 'vh'; 
// 	}
// 	player.style.left = (parseInt(left)+20) + 'vh'; 
// 	console.log(player.style.left);
// }

var tempCycle = 1;

function movePlayerRight(spacesToMove, playerToMove){

	var actualPlayer;

	for(var i = 0; i < players.length; i++){
		if (players[i].id == playerToMove) {
			actualPlayer = players[i];
			break;
		}
	}

	var tmpLeft = playerIcons[playerToMove-1].style.left;
	var left = tmpLeft.replace("px", "");
	var tempTop = playerIcons[playerToMove-1].style.top;
	// console.log(player.style.top);
	var top = tempTop.replace("px", "");

	var spacesLeft = spacesToMove;

	positionX = parseInt(left);
	positionY = parseInt(top);

	while(spacesLeft != 0) {

		switch(actualPlayer.cycle){
			case 1:
				if (positionX + 20 < 120) {
					positionX += 20;
					spacesLeft -= 1;
			// player.style.left = (parseInt(left)+20) + 'vh'; 
				} else {
					positionY += 20;
			// player.style.top = (parseInt(top)+20) + 'vh';
					actualPlayer.cycle = 2;
					spacesLeft -= 1;
				}
			break;

			case 2:
				if (positionY + 20 < 80) {
					positionY += 20;
					spacesLeft -= 1;
			// player.style.top = (parseInt(top)+20) + 'vh';
				} else {
					positionX -= 20;
			// player.style.left = (parseInt(left)-20) + 'vh';
					actualPlayer.cycle = 3;
					spacesLeft -= 1;
				}
			break;

			case 3:
				if (positionX - 20 >= 0) {
				positionX -= 20;
				spacesLeft -= 1;
			// player.style.left = (parseInt(left)-20) + 'vh';
				}else {
					positionY -= 20;
			// player.style.top = (parseInt(top)-20) + 'vh';
					actualPlayer.cycle = 4;
					spacesLeft -= 1;
				}
			break;

			case 4:
				if (positionY - 20 >= 0) {
					positionY -= 20;
					spacesLeft -= 1;
			// player.style.top = (parseInt(top)-20) + 'vh';
				} else {
					positionX += 20
			// player.style.left = (parseInt(left)+20) + 'vh';
					actualPlayer.cycle = 1;
					spacesLeft -= 1;
				}
			break;
		}

		playerIcons[playerToMove-1].style.left = positionX + 'vh';
		playerIcons[playerToMove-1].style.top = positionY + 'vh';
	}
}

// function animateMovePlayerRight(){
	
// 	player.style.transform = "translateX("+imgWidth+")";
// 	player.style.transitionDuration = "1s";
// 	//document.getElementById("player1").style.transitionDelay = "1s";


// }

function start_play(){
	if(players.length >= 2){
		document.getElementById("start_game_button").hidden = true;
		document.getElementById("finish_turn").disabled = false;
		dice = document.getElementById("dice");
  		stopstart(); 
  		movePlayer();
  		// for(var i = 0; i < 52; i++){
  		// 	movePlayerRight();
  		// }
  		// animateMovePlayerRight();
  		// movePlayerRight();
	}else{
		alert("Son necesarios dos o más jugadores para iniciar la partida.");
	}
}


