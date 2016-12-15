
var players = new Array();
var properties = new Array(16);		// Se incluyen las celdas con funciones del tablero
var finished_turn = true;				// No permite a un nuevo jugador continuar si el anterior no termina su turno

// *************************************************************

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

function movePlayer(){

    var wrap1 = document.getElementById('wrap1');
    var imgWidth = 40;
    var imgHeight = 40;
    var dimensions = getOffset(document.getElementById("casillaInicio"));

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

 playerIcons[0].style.top = 5 + 'vh';
 playerIcons[1].style.top = 5 + 'vh';
 playerIcons[2].style.top = 5 + 'vh';
 playerIcons[3].style.top = 5 + 'vh';

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
		} else {
			positionY += 20;
			actualPlayer.cycle = 2;
			spacesLeft -= 1;
		}
		break;
		case 2:
		if (positionY + 20 < 80) {
			positionY += 20;
			spacesLeft -= 1;
		} else {
			positionX -= 20;
			actualPlayer.cycle = 3;
			spacesLeft -= 1;
		}
		break;

		case 3:
		if (positionX - 20 >= 0) {
			positionX -= 20;
			spacesLeft -= 1;
		}else {
			positionY -= 20;
			actualPlayer.cycle = 4;
			spacesLeft -= 1;
		}
		break;

		case 4:
		if (positionY - 20 >= 0) {
			positionY -= 20;
			spacesLeft -= 1;
		} else {
			positionX += 20;
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
		asset_liquid_money : 1000,
		cycle: 1,
		active_player : true,
		current_position_board : 0,
	};
	return newPlayer;
};

function createProperty(newName, newValue, newId,sale,b_buy,b_sale,morgages,number) {
	var newProperty = {
		name : newName,
		value: newValue,
		owner: newId,
		buildings: 0,
		sale_value: sale,
		building_buy: b_buy,
		building_sale: b_sale,
		morgage_prices: morgages,
		property_number: number,
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
	document.getElementById("dice").style.pointerEvents = "auto";
	if(stopped) {
		stopped = false;
		t = setInterval(change, 100);
	} else {
		clearInterval(t);
		stopped = true;
		console.log(chosenRandom);
	}
}

// ********* Funciones controladoras estado del juego **************

function sell_property(id_property){
	owner_id = 0;
	for(var i=0; i<properties.length; ++i)	{
		if(properties[i].property_number == id_property){
			owner_id = properties[i].owner;
			for(var j=0; j<players.length; ++j){
				if(players[j].id == owner_id){
					players[j].liquid_money += properties[i].sale_value;			// Se aumenta el dinero del dueno
				}
			}
			properties[i].owner = 666;																		// Se modifica el dueno al banco
		}
	}
}

function build_house(id_property){
	owner_id = 0;
	for(var i=0; i<properties.length; ++i){
		if(properties[i].property_number == id_property){
			properties[i].buildings += 1;																// Se agrega una casa
			owner_id = properties[i].owner;
			for(var j=0; j<players.length; ++j){												// Se aumenta el valor de activos del dueno y reduce efectivo
				if(players[j].id == owner_id){
					players[j].liquid_money -= properties[i].building_buy;
					players[j].asset_liquid_money -= properties[i].building_buy;
					players[j].asset_liquid_money += properties[i].building_sale;
				}
			}
		}
	}
}

function demolish(id_property){
	for(var i=0; i<properties.length; ++i){
		if(properties[i].property_number == id_property && properties[i].buildings > 0){
			properties[i].buildings -= 1;
			owner_id = properties[i].owner;
			for(var j=0; j<players.length; ++j){												// Se aumenta el efectivo, el valor de activos sigue igual
				if(players[j].id == owner_id){
					players[j].liquid_money += properties[i].building_sale;
				}
			}
		}
	}
}

function pay_morgage(paying_player_id,player_position){
	owner_id = properties[player_position].owner;
	built_houses = properties[player_position].buildings;
	if(owner_id == paying_player_id){
		alert(" ¡¡ Se encuentra de visita en su propiedad !!");
	}else{
		alert("Bienvenido, debe pagar "+properties[player_position].morgage_prices[built_houses]+" de renta en esta propiedad.");
	}

	for(var i=0; i<players.length;++i){
		if(players[i].id == paying_player_id){
			players[i].liquid_money -= properties[player_position].morgage_prices[built_houses];
			players[i].asset_liquid_money -= properties[player_position].morgage_prices[built_houses];
		}
	}
	for(var j=0; j<players.length;++j){
		if(players[j].id == owner_id){
			players[j].liquid_money += properties[player_position].morgage_prices[built_houses];
			players[j].asset_liquid_money += properties[player_position].morgage_prices[built_houses];
		}
	}
}

function refresh_player_money(player_id){
	for(var i=0; i<players.length;++i){
			var innerdiv = document.getElementById("player_"+players[i].id+"_points");
			innerdiv.innerHTML = players[i].liquid_money+"/"+players[i].asset_liquid_money;
			var outerdiv = document.getElementById("player" + players[i].id);
			outerdiv.innerHTML = players[i].name;
			outerdiv.appendChild(innerdiv);
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
	properties[0] = createProperty("Entrada",0,333,0,0,0,0,13);
	properties[1] = createProperty("Propiedad 1",50,666,45,50,25,[5,15,45,125,250,400],1);
	properties[2] = createProperty("Propiedad 2",60,666,55,50,25,[6,20,55,150,300,480],2);
	properties[3] = createProperty("Propiedad 3",75,666,70,75,40,[8,25,70,200,400,640],3);
	properties[4] = createProperty("Propiedad 4",85,666,75,75,40,[9,25,80,225,450,720],4);
	properties[5] = createProperty("Silla 1",0,333,0,0,0,0,14);
	properties[6] = createProperty("Propiedad 5",105,666,95,100,50,[11,35,100,275,550,880],5);
	properties[7] = createProperty("Propiedad 6",115,666,105,100,50,[12,35,110,300,600,960],6);
	properties[8] = createProperty("Cueva",0,333,0,0,0,0,15);
	properties[9] = createProperty("Propiedad 7",135,666,120,150,75,[15,45,135,375,750,1200],7);
	properties[10] = createProperty("Propiedad 8",145,666,130,150,75,[16,50,145,400,800,1280],8);
	properties[11] = createProperty("Propiedad 9",160,666,145,175,90,[18,55,160,450,900,1440],9);
	properties[12] = createProperty("Propiedad 10",170,666,155,175,90,[20,60,180,500,1000,1600],10);
	properties[13] = createProperty("Silla 2",0,333,0,0,0,0,16);
	properties[14] = createProperty("Propiedad 11",190,666,170,200,100,[23,70,205,575,1150,1840],11);
	properties[15] = createProperty("Propiedad 12",200,666,180,200,100,[25,75,225,625,1250,2000],12);
}

// ** Funciones celdas del tablero

function entrance_cell(player_id){									// Se le acreditan 100 unidades al jugador
	for(var i=0; i < players.length; ++i){
		if(players[i].id == player_id){
			players[i].liquid_money += 100;
			players[i].asset_liquid_money += 100;
		}
	}
}

function hot_chair_cell(player_id){
	var dummy = 0;
}

function cave_cell(player_id){
	var dummy = 0;
}

function properties_manager(player_id, player_position){
	for(var i=0; i < players.length; ++i){
		if(players[i].id == player_id){
			if(properties[player_position].owner == 666){
				if(players[i].liquid_money >= properties[player_position].value){
					if( confirm("¿ Le gustaría comprar la "+properties[player_position].name+" ?") ){
						properties[player_position].owner = player_id;
						players[i].liquid_money -= properties[player_position].value;
						players[i].asset_liquid_money -= properties[player_position].value;
						players[i].asset_liquid_money += properties[player_position].sale_value;
						//alert("El costo de la propiedad es de: "+properties[player_position].value);
						alert(players[i].name+" ha adquirido la "+properties[player_position].name+"!! SU IMPERIO CRECE!!");
					}
				}else{
					alert("No posee dinero suficiente para comprar la "+properties[player_position].name);
					// debe habilitarse la opcion de construir
				}
			}else{
				pay_morgage(players[i].id,player_position);
			}
		}
	}
}

var currentPlayer;
var currentIndex;
var pastPlayer;
var new_position = 0;
var currentQuestion = -1;
var hotChair;
var arr = [];

for (var prop in questions) {
    arr.push(questions[prop]);
}

console.log(arr[0]);

function showQuestion(){
		currentQuestion++;

	if (currentQuestion == 63) {
		currentQuestion = 0;
	}

	if (arr[0][currentQuestion].options[4] != undefined) {
		document.getElementById("respuesta5").style.visibility = "visible";
	}

	document.getElementById("textoPregunta").innerHTML = arr[0][currentQuestion].text;
	document.getElementById("respuesta1").innerHTML = "1. " + arr[0][currentQuestion].options[0];
	document.getElementById("respuesta2").innerHTML = "2. " + arr[0][currentQuestion].options[1];
	document.getElementById("respuesta3").innerHTML = "3. " + arr[0][currentQuestion].options[2];
	document.getElementById("respuesta4").innerHTML = "4. " + arr[0][currentQuestion].options[3];

	if (arr[0][currentQuestion].options[4] != undefined) {
		document.getElementById("respuesta5").innerHTML = "5. " + arr[0][currentQuestion].options[4];
	} else {
		document.getElementById("respuesta5").style.visibility = "hidden";
	}
}

function validateAnswer(playerAnswer){
	if (playerAnswer == arr[0][currentQuestion].answer) {
		alert("¡Respuesta correcta! Ganas dinero!!!");
	} else {
	alert("Respuesta incorrecta :( Pierdes la mitad de dinero");
	}

	if (hotChair) {
		players[currentPlayer].liquid_money += 50;
	} else {
		players[currentPlayer].liquid_money -= 25;
		if (players[currentPlayer].liquid_money < 0) {
			players[currentPlayer].liquid_money = 0;
		}
	}
}

function player_finished(){
	finished_turn = true;
	demark_player_turn(pastPlayer);
	mark_player_turn(currentPlayer);
}

function gameOn(){
	if(finished_turn){
		pastPlayer = currentPlayer;
		stopstart();
		movePlayerRight(chosenRandom,currentPlayer);
		document.getElementById("dice").style.pointerEvents = "none";
		window.setTimeout(function () {

			new_position = position_manager(chosenRandom,players[currentIndex].current_position_board);
			if(new_position < players[currentIndex].current_position_board && new_position != 0){					// Si el jugador pasa por la entrada y no cae en ella
				entrance_cell(players[currentIndex].id);																										// se suman los puntos a su cuenta de igual forma
			}
			players[currentIndex].current_position_board = new_position;

			// 					Posiciones del tablero
			// 					0 = entrada
			// 					1 - 4 = propiedades
			// 					5 = silla caliente
			// 					6 - 7 = propiedades
			// 					8 = cueva
			// 					9 - 12 = propiedades
			// 					13 = silla caliente
			// 					14 - 15 = propiedades

			switch (new_position) {
				case 0:
				entrance_cell(players[currentIndex].id);
				break;
				case 5:
				hot_chair_cell(players[currentIndex].id);
				hotChair = true;
				showQuestion();
				break;
				case 8:
				cave_cell(players[currentIndex].id);
				hotChair = false;
				showQuestion();
				break;
				case 13:
				hot_chair_cell(players[currentIndex].id);
				hotChair = true;
				showQuestion();
				break;
				default:
				properties_manager(players[currentIndex].id,new_position);
				break;
			}

			refresh_player_money();

			currentIndex += 1;

			if (currentIndex == players.length) {
				currentIndex = 0;
			}
			currentPlayer = players[currentIndex].id;

			stopstart();
			finished_turn = false;
			//demark_player_turn(pastPlayer);
			//mark_player_turn(currentPlayer);
		}, 1500);
	}else{
		alert("El jugador debe terminar su turno !!! ");
	}

};

function start_play(){
	if(players.length >= 2){													// Juego activo
		document.getElementById("start_game_button").hidden = true;
		document.getElementById("finish_turn").disabled = false;
		dice = document.getElementById("dice");
		stopstart();
		movePlayer();
  	properties_creator();
  	currentPlayer = players[0].id;
  	currentIndex = 0;
  	mark_player_turn(players[currentIndex].id);
  	stopstart();
	}else{
		alert("Son necesarios dos o más jugadores para iniciar la partida.");
	}
}
