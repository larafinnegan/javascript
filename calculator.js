

function Calculator() {
	this.pi = Math.PI;
	this.display = [0];
	this.m = 0;
	this.temp = "0";
	
	this.multiply = function(a, b) {
		return a * b;      
	};

	this.add = function(a, b) {
		return a + b;      
	};

	this.divide = function(a, b) {
		return a / b;      
	};

	this.subtract = function(a, b) {
		return a - b;      
	};

	this.squareRoot = function(a) {
		return Math.sqrt(a);
	};

	this.power = function(a, b) {
		return Math.pow(a, b);
	};

	this.negate = function(a) {
		return a * (-1);
	};

	this.inverse = function(a) {
		return 1 / a;
	};
}

var calc = new Calculator();


function input(element) {
	if (/\d/.test(element.id)) {
		calc.temp += element.id;
		console.log(calc.temp);
		calc.display[calc.display.length - 1] = parseFloat(calc.temp);
		document.getElementById("display").innerHTML = calc.display.join(" ");
	}
	else if (element.id === "clear") {
		calc.display = [0];
		document.getElementById("display").innerHTML = calc.display.join(" ");
	}
	else if (element.id === "negate") {
		calc.display[calc.display.length - 1] *= (-1);
		document.getElementById("display").innerHTML = calc.display.join(" ");
	}
	else if (element.id === "dot") {
		calc.temp += ".";
		console.log(calc.temp);
		calc.display[calc.display.length - 1] = parseFloat(calc.temp);
		document.getElementById("display").innerHTML = calc.display.join(" ");
	}
	else if (element.id === "m") {
		calc.m = calc.display[calc.display.length - 1];
	}
	else if (element.id == "back") {
		if (calc.display[calc.display.length - 1].length > 0) {
			console.log(parseFloat(calc.display[calc.display.length - 1].slice(0, -1)));
		}
	}
	else {
		calc.display[calc.display.length] = calc.pi;
		document.getElementById("display").innerHTML = calc.display.join(" ");
	}
}

