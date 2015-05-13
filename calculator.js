

function Calculator() {
	this.pi = Math.PI;
	this.display = [0];
	this.m = 0;
	this.temp = "0";
	
	this.multiply = function() {
		var a = this.display[0] * this.display[2];
		return this.display = [a];
	};

	this.add = function() {
		var a = this.display[0] + this.display[2];
		return this.display = [a];   
	};

	this.divide = function() {
		var a = this.display[0] / this.display[2];
		return this.display = [a]; 
	};

	this.subtract = function(a, b) {
		var a = this.display[0] - this.display[2];
		return this.display = [a];     
	};

	this.squareRoot = function() {
		var a = Math.sqrt(this.display[0]);
		return this.display = [a];
	};

	this.power = function() {
		var a = Math.pow(this.display[0], this.display[2]);
		return this.display = [a];
	};

	this.negate = function() {
		return this.display[this.display.length -1] *= (-1);
	};

	this.inverse = function(a) {
		return 1 / a;
	};
}

var calc = new Calculator();


function input(element) {
	if (/\d/.test(element.id)) {
		calc.temp += element.id;
		calc.display[calc.display.length - 1] = parseFloat(calc.temp);
	}
	else if (element.id === "clear") {
		calc.display = [0];
	}
	else if (element.id === "negate") {
		calc.negate;
	}
	else if (element.id === "dot") {
		calc.temp += ".";
		calc.display[calc.display.length - 1] = parseFloat(calc.temp);
	}
	else if (element.id === "m") {
		calc.m = calc.display[calc.display.length - 1];
	}
	else if (element.id === "back") {
		if (calc.display[calc.display.length - 1].length > 0) {
			console.log(parseFloat(calc.display[calc.display.length - 1].slice(0, -1)));
		}
	}
	else {
		calc.display[calc.display.length] = calc.pi;
	}
	document.getElementById("display").innerHTML = calc.display.join(" ");
}

