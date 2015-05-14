
function Calculator() {

	this.display = [0];
	this.m = 0;
	this.temp = "0";
	this.result = 0;
	
	this.compute = function() {
		this.temp = "0";
		switch(this.display[1]) {
			case "+":
				return this.display = this.result = [this.display[0] + this.display[2]];
			case "-":
				return this.display = this.result = [this.display[0] - this.display[2]];
			case "/":
				return this.display = this.result = [this.display[0] / this.display[2]];
			case "*":
				return this.display = this.result = [this.display[0] * this.display[2]];
			case "^":
				return this.display = this.result = [Math.pow(this.display[0], this.display[2])];
		}
	};
	
	this.equals = function() {
		console.log(this.display);
		if (this.display.length === 2) {
			this.display[2] = this.display[0];
			this.compute();
		}
		if (this.display.length === 3) {
			this.compute();
		}
	};
	
	this.num = function(id) {
		this.temp += id;
		if (isNaN(this.display[this.display.length - 1])) {
			this.display[this.display.length] = parseFloat(this.temp);
			console.log(this.result + "res");
		}
		else if (this.result !== 0) {
			this.temp = id;
			this.display = [parseFloat(this.temp)];
		}
		else {
			this.display[this.display.length - 1] = parseFloat(this.temp);
		}
		this.result = 0;
	};
	
	this.dot = function() {
		if (this.display[this.display.length - 1] % 1 === 0) {
			this.temp += ".";
			this.display[this.display.length - 1] = parseFloat(this.temp);
		}
	};
	
	this.pi = function() {
		if (isNaN(this.display[this.display.length - 1])) {
			this.display[this.display.length] = Math.PI;
		}
		else {
			this.display[this.display.length - 1] = Math.PI;
		}
	};
	
	this.back = function() {
		if (this.result === 0) {
			if (this.temp.length <= 1) {
				this.temp = "0";
			}
			else {
				this.temp = this.temp.substring(0, this.temp.length - 1);
			}
			this.display[this.display.length - 1] = parseFloat(this.temp);
		}
	};
	
	this.populateOperators = function(code) {
		this.temp = "0";
		if (this.display.length === 1) {
			this.display[this.display.length] = code;
		}
		else if (this.display.length === 2) {
			this.display[this.display.length - 1] = code;
		}
		else {
			this.compute();
			this.display[this.display.length] = code;
		}
	};
	
	
	this.clear = function() {
		this.temp = "0";
		this.display = [0];
		this.result = 0;
	};

	this.sqroot = function() {
		this.display[this.display.length - 1] = this.result = Math.sqrt(this.display[this.display.length - 1]);
	};

	this.negate = function() {
		this.display[this.display.length -1] *= (-1);
		this.temp = this.display[this.display.length -1].toString();
	};

	this.inverse = function() {
		if (this.display[this.display.length -1] === 0) {
			alert("Cannot divide by 0.");
		}
		else {
			this.display[this.display.length -1] = this.result = (1 / (this.display[this.display.length -1]));
		}
	};
}

var calc = new Calculator();


function input(element) {
	if (/^[0-9]$/.test(element.innerHTML)) {
		calc.num(element.innerHTML);
	}
	else if (containsID(["add", "subtract", "multiply", "divide", "power"], element.id)) {
		calc.populateOperators(element.innerHTML);
	}
	else {
		calc[element.id]();
	}
	document.getElementById("display").innerHTML = calc.display.join(" ");
}


function containsID(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === id) {
            return true;
        }
    }
    return false;
}
