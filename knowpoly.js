
var players = new Array();

function createPlayer(newName, newId) {
	var newPlayer = {
		id: newId,
		name: newName,
		liquid_money: 1000,
		asset_liquid_money : 2000,
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

// ***********************

function start_play(){
	if(players.length >= 2){
		document.getElementById("start_game_button").hidden = true;
		document.getElementById("finish_turn").disabled = false;
	}else{
		alert("Son necesarios dos o más jugadores para iniciar la partida.");
	}
}
