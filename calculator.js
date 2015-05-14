
function Calculator() {

	this.display = [0];
	this.m = 0;
	this.temp = "0";
	
	this.compute = function() {
		this.temp = "0";
		switch(this.display[1]) {
			case "+":
				return this.display = [this.display[0] + this.display[2]];
			case "-":
				return this.display = [this.display[0] - this.display[2]];
			case "/":
				return this.display = [this.display[0] / this.display[2]];
			case "*":
				return this.display = [this.display[0] * this.display[2]];
			case "^":
				return this.display = [Math.pow(this.display[0], this.display[2])];
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
		}
		else {
			this.display[this.display.length - 1] = parseFloat(this.temp);
		}
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
		this.temp = this.temp.substring(0, this.temp.length - 1);
		this.display[this.display.length - 1] = parseFloat(this.temp);
	};
	
	this.populateOperators = function(code) {
		this.temp = "0";
		this.display[this.display.length] = code;
	};
	
	
	this.clear = function() {
		this.temp = "0";
		this.display = [0];
	};

	this.sqroot = function() {
		this.display = Math.sqrt(this.display[this.display.length - 1]);
	};

	this.negate = function() {
		this.display[this.display.length -1] *= (-1);
		this.temp = this.display[this.display.length -1].toString();
	};

	this.inverse = function() {
		console.log(this.display);
		if (this.display[this.display.length -1] === 0) {
			console.log(this.display + "first");
			alert("Cannot divide by 0.");
		}
		else {
			console.log(this.display + "second");
			this.display[this.display.length -1] = (1 / (this.display[this.display.length -1]));
			console.log(this.display + "secondafter");
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
