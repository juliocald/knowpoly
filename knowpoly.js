
var players = new Array();

function createPlayer(newName, newId) {
	var newPlayer = {
		id: newId,
		name: newName,
		money: 1000,
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
		document.getElementById("player" + newId).innerHTML = player;
		players.push(createPlayer(player, newId));
		console.log(players);
	}
};

var properties = new Array();

"use strict";

function buttonFunc() {
    printNum(dice.roll());
}

function printNum(num) {
    document
        .getElementById('diceBox')
        .innerHTML = num;
}

// Trying out an object with paremeters and methods
var dice = {
    sides: 6,
    roll: function () {
        return Math.floor(Math.random() * this.sides) + 1;
    }
};



