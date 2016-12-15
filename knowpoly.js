
var players = new Array();
var properties = new Array(16);		// Se incluyen las celdas con funciones del tablero
var game_is_on = false;						// Indicador acerca de continuar o no el juego

// *************************************************************

// Funcion principal de corrida


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


    // Assume the bubble image dimensions and area dimensions
    var imgWidth = 40;
    var imgHeight = 40;
    var dimensions = getOffset(document.getElementById("casillaInicio"));
	//var player = document.createElement('img');

	playerIcons[0].src = 'images/ultraball.svg';
	playerIcons[1].src = 'images/greatball.svg';
	playerIcons[2].src = 'images/pokeball.svg';
	playerIcons[3].src = 'images/masterball.svg';

	playerIcons[0].setAttribute("id", "player1img");
	playerIcons[1].setAttribute("id", "player2img");
	playerIcons[2].setAttribute("id", "player3img");
	playerIcons[3].setAttribute("id", "player4img");

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

 playerIcons[0].style.visibility = "hidden";
 playerIcons[1].style.visibility = "hidden";
 playerIcons[2].style.visibility = "hidden";
 playerIcons[3].style.visibility = "hidden";

 for(var i = 0; i < players.length; i++){
 	var hideImg = document.getElementById("player" + (players[i].id) + "img");
 	hideImg.style.visibility = "visible";
 }
}

var imgWidth = 80;

movePlayer();

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


function createPlayer(newName, newId) {
	var newPlayer = {
		id: newId,
		name: newName,
		liquid_money: 1000,
		asset_liquid_money : 2000,

		cycle: 1,

		active_player : true,
		current_position_board : 0,

	};

	return newPlayer;
};

function createProperty(newName, newValue, newId) {
	var newProperty = {
		name : newName,
		value: newValue,
		owner: newId,
	};
	return newProperty;
};

function newPlayer(newId){
	notThere = true;
	console.log(players);
	for(var i=0;i<players.length;++i){
		if(players[i].id == newId){
			notThere = false;
		}
	}

	if(notThere){
		var player = prompt("Ingrese el nombre del nuevo jugador:","Nuevo jugador...");
		if (player != null) {
			var baby_player = createPlayer(player, newId);
			players.push(baby_player);
			var innerdiv = document.getElementById("player_"+newId+"_points");
			innerdiv.innerHTML = baby_player.liquid_money+"/"+baby_player.asset_liquid_money;
			var outerdiv = document.getElementById("player" + newId);
			outerdiv.innerHTML = player;
			outerdiv.appendChild(innerdiv);
		}
	}
};

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
	chosenRandom = random + 1;
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

// ********* Funciones controladoras estado del juego **************

function refresh_player_money(player_id){
	for(var i=0; i<players.length;++i){
		if(players[i].id == player_id){
			var innerdiv = document.getElementById("player_"+player_id+"_points");
			innerdiv.innerHTML = players[i].liquid_money+"/"+players[i].asset_liquid_money;
			var outerdiv = document.getElementById("player" + player_id);
			outerdiv.innerHTML = players[i].name;
			outerdiv.appendChild(innerdiv);
		}
	}
}

function counter_active_players(){
	var counter = 0;
	for(var i=0; i<players.length;++i){
		if(players[i].active_player == true){
			++counter;
		}
	}
	return counter;
}

function mark_player_turn(id_player){
	document.getElementById("player"+id_player).style.border = "thick solid #0000FF";
}

function demark_player_turn(id_player){
	document.getElementById("player"+id_player).style.border = "none";
}

function roll_dice(_callback){									// Espera a que el jugador toque el dado
	var lucky = Math.floor((Math.random() * 6) + 1);
	return lucky;

}

function position_manager(dice_number, player_pos){				// Encargado de asignar entre las 16 posiciones posibles
	while(dice_number > 0){
		if(player_pos == 15){
			player_pos = 0;
		}else{
			++player_pos;
		}
		dice_number -= 1;
	}
	return player_pos;
}

function properties_creator(){
	properties[0] = createProperty("Entrada",0,333);
	properties[1] = createProperty("Propiedad 1",50,666);
	properties[2] = createProperty("Propiedad 2",60,666);
	properties[3] = createProperty("Propiedad 3",75,666);
	properties[4] = createProperty("Propiedad 4",85,666);
	properties[5] = createProperty("Silla 1",0,333);
	properties[6] = createProperty("Propiedad 5",105,666);
	properties[7] = createProperty("Propiedad 6",115,666);
	properties[8] = createProperty("Cueva",0,333);
	properties[9] = createProperty("Propiedad 7",135,666);
	properties[10] = createProperty("Propiedad 8",145,666);
	properties[11] = createProperty("Propiedad 9",160,666);
	properties[12] = createProperty("Propiedad 10",170,666);
	properties[13] = createProperty("Silla 2",0,333);
	properties[14] = createProperty("Propiedad 11",190,666);
	properties[15] = createProperty("Propiedad 12",200,666);
}

// ** Funciones celdas del tablero

function entrance_cell(player_id){									// Se le acreditan 100 unidades al jugador
	for(var i=0; i < players.length; ++i){
		if(players[i].id == player_id){
			players[i].liquid_money += 100;
		}
	}
}

function hot_chair_cell(player_id){
	//alert("esta en silla caliente");
	var dummy = 0;
}

function cave_cell(player_id){
	//alert("esta en cueva");
	var dummy = 0;
}

function properties_manager(player_id, player_position){
	for(var i=0; i < players.length; ++i){
		if(players[i].id == player_id){
			if(properties[player_position].owner == 666){
				if(players[i].liquid_money >= properties[player_position].value){
					if( confirm("Le gustaría comprar la "+properties[player_position].name) ){
						alert("El jugador "+players[i].name+" tiene de dinero: "+players[i].liquid_money);
						properties[player_position].owner = player_id;
						players[i].liquid_money -= properties[player_position].value;
						alert("El costo de la propiedad es de: "+properties[player_position].value);
						alert("El jugador "+players[i].name+" ahora tiene de dinero: "+players[i].liquid_money);
						refresh_player_money(player_id);
					}
				}else{
					alert("No posee dinero suficiente para comprar la "+properties[player_position].name);
				}
			}else{
				alert("La propiedad tiene dueño, no puede comprarla");
			}
		}
	}
}

var currentPlayer;
var currentIndex;
var pastPlayer;
var new_position = 0;

function gameOn(){
	pastPlayer = currentPlayer;
	stopstart();
	movePlayerRight(chosenRandom,currentPlayer);

	window.setTimeout(function () {

		new_position = position_manager(chosenRandom,players[currentIndex].current_position_board);
		players[currentIndex].current_position_board = new_position;

		switch (new_position) {
			case 0:
			entrance_cell(players[currentIndex].id);
			break;
			case 5:
			hot_chair_cell(players[currentIndex].id);
			break;
			case 8:
			cave_cell(players[currentIndex].id);
			break;
			case 13:
			hot_chair_cell(players[currentIndex].id);
			break;
			default:
			properties_manager(players[currentIndex].id,new_position);
			break;
		}

		currentIndex += 1;

		if (currentIndex == players.length) {
			currentIndex = 0;
		}
		currentPlayer = players[currentIndex].id;







		alert("prueba");
		stopstart();

		demark_player_turn(pastPlayer);
		mark_player_turn(currentPlayer);
	}, 1500);
};



function start_play(){
	if(players.length >= 2){													// Juego activo

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

  		properties_creator();
  		//game_is_on = true;


  		currentPlayer = players[0].id;
  		currentIndex = 0;
  		mark_player_turn(players[currentIndex].id);
		// while(game_is_on){
		// 	var counter = counter_active_players();
		// 	if(counter == 1){
		// 		// hay ganador
		// 	}else{
		// 		for(var i=0;i<players.length;++i){
		// 			mark_player_turn(players[i].id);					// Se resalta el jugador activo


		// 			new_position = position_manager(roll_dice(),players[i].current_position_board);
		// 			players[i].current_position_board = new_position;

		// 			// Una vez obtenido el numero, se actualiza la variable de posicion del
		// 			// jugador sumando la cuenta del dado, existen 16 posiciones

		// 					Posiciones del tablero

		// 					0 = entrada
		// 					1 - 4 = propiedades
		// 					5 = silla caliente
		// 					6 - 7 = propiedades
		// 					8 = cueva
		// 					9 - 12 = propiedades
		// 					13 = silla caliente
		// 					14 - 15 = propiedades


		// 			switch (new_position) {
		// 				case 0:
		// 					entrance_cell(players[i].id);
		// 					break;
		// 				case 5:
		// 					hot_chair_cell(players[i].id);
		// 					break;
		// 				case 8:
		// 					cave_cell(players[i].id);
		// 					break;
		// 				case 13:
		// 					hot_chair_cell(players[i].id);
		// 					break;
		// 				default:
		// 					properties_manager(players[i].id,new_position);
		// 					break;
		// 			}


		// 			game_is_on = false;
		// 			document.getElementById("finish_turn").disabled = false;
		// 		}
		// 	}
		// }


	}else{
		alert("Son necesarios dos o más jugadores para iniciar la partida.");
	}
}
