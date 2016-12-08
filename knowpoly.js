
var players = new Array();
var properties = new Array(16);		// Se incluyen las celdas con funciones del tablero
var game_is_on = false;						// Indicador acerca de continuar o no el juego

function createPlayer(newName, newId) {
	var newPlayer = {
		id: newId,
		name: newName,
		liquid_money: 1000,
		asset_liquid_money : 2000,
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

function dice_buttonFunc() {
    printNum(dice.roll());
}

function printNum(num) {
    document
        .getElementById('diceBox')
        .innerHTML = num;
}

var dice = {
    sides: 6,
    roll: function () {
        return Math.floor(Math.random() * this.sides) + 1;
    }
};

// ********* Funciones controladoras estado del juego **************

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

function roll_dice(){									// Espera a que el jugador toque el dado
		//console.log("cantidad de activos:"+counter_active_players());
		var lucky = Math.floor((Math.random() * 6) + 1);
		alert("El dado tira: "+lucky);
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
	alert("esta en silla caliente");
}

function cave_cell(player_id){
	alert("esta en cueva");
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

// *************************************************************

// Funcion principal de corrida

function start_play(){
	if(players.length >= 2){													// Juego activo

		document.getElementById("start_game_button").hidden = true;
		properties_creator();
		game_is_on = true;
		new_position = 0;
		while(game_is_on){
			var counter = counter_active_players();
			if(counter == 1){
				// hay ganador
			}else{
				for(var i=0;i<players.length;++i){
					mark_player_turn(players[i].id);					// Se resalta el jugador activo
					new_position = position_manager(roll_dice(),players[i].current_position_board);
					players[i].current_position_board = new_position;
					alert("La nueva posicion de "+players[i].name+" "+new_position);

					// * Borrar comentarios, solo de guia *

					// Una vez obtenido el numero, se actualiza la variable de posicion del
					// jugador sumando la cuenta del dado, existen 16 posiciones

					/*		Posiciones del tablero

							0 = entrada
							1 - 4 = propiedades
							5 = silla caliente
							6 - 7 = propiedades
							8 = cueva
							9 - 12 = propiedades
							13 = silla caliente
							14 - 15 = propiedades
					*/

					switch (new_position) {
						case 0:
							entrance_cell(players[i].id);
							break;
						case 5:
							hot_chair_cell(players[i].id);
							break;
						case 8:
							cave_cell(players[i].id);
							break;
						case 13:
							hot_chair_cell(players[i].id);
							break;
						default:
							properties_manager(players[i].id,new_position);
							break;
					}


					//game_is_on = false;
					document.getElementById("finish_turn").disabled = false;
				}
			}
		}

	}else{
		alert("Son necesarios dos o más jugadores para iniciar la partida.");
	}

}
