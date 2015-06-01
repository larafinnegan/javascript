// performs the standard add/subtract/multiply/divide/exponential functions
var calc = {
	
	compute: function(array) {
		array[0] = parseFloat(array[0]);
		array[2] = parseFloat(array[2]);
		switch(array[1]) {
			case "+": return array[0] + array[2];
			case "-": return array[0] - array[2];
			case "/": return array[0] / array[2];
			case "*": return array[0] * array[2];
			case "^": return Math.pow(array[0], array[2]);
		}
	}
};


var box = {
	current: "",
	inputs: [null, null, null],
	result: false,
	m: 0,
	
	strip: function(number) {
		return (parseFloat(number.toPrecision(12)));
	},
	
	populateCurrent: function(input) {
		if (this.result || !this.current || this.current === "0") {
			this.current = input;
			this.result = false;
		}
		else if (this.current === "0" && input === "0") {
			this.current = "0";
		}
		else {
			this.current += input;
		}
	},
	
	showHistory: function() {
		document.getElementById("history").innerHTML = this.inputs.join(" ");
	},

	hideHistory: function() {
		document.getElementById("history").innerHTML = "";
	},
	
	showCurrent: function() {
		document.getElementById("current").innerHTML = this.current;
	},

	memset: function() {
		this.m = this.current;
	},
	
	memrecall: function() {
		this.current = this.m;
	},
	
	populateOperators: function(operator) {
		if (!this.inputs[0]) {
			this.inputs[0] = (this.current ? this.current : 0);
			this.inputs[1] = operator;
		}
		else if (!this.inputs[2] && !this.current) {
			this.inputs[1] = operator;
		}
		else {
			this.inputs[2] = this.current;
			this.equals();
			this.inputs[1] = operator;
		}
		this.current = "";
},

	pi: function() {
		this.current = "3.14159265359";
		this.result = true;
	},

	sqroot: function() {
		this.current = Math.sqrt(this.current);
		this.result = true;
	},

	negate: function() {
		if (this.current !== "0") this.current *= (-1);
	},

	inverse: function() {
		this.current = 1 / this.current;
	},
	
	dot: function() {
		if (!this.current) {
			this.current = "0.";
		}
		else if (this.current % 1 === 0)  {
			this.current += ".";
		}
	},
	
	clear: function() {
		this.current = "";
		this.inputs = [null, null, null];
		this.result = false;
	},
	
	back: function() {
		if (this.result === false) {
			this.current = (this.current.length === 1 ? "0" : this.current.substring(0, this.current.length - 1));
		}
	},
	
	calcResult: function() {
		if (this.inputs[0] && this.inputs[2]) {
			this.current = calc.compute(this.inputs);
		}
		else if (this.inputs[0]) {
			this.current = this.inputs[0];
		}
	},
	
	equals: function() {
		if (this.current && !this.inputs[0]) {
			this.inputs[0] = this.current;
		}
		else if (this.current && !this.inputs[2]) {
			this.inputs[2] = this.current;
		}
		this.calcResult();
		this.inputs = [this.current, null, null];
		this.result = true;
		this.showHistory();
	}
};

$(document).ready(function() {
	input.getInput();
});

// parses the input from the HTML
var input = {

	getInput: function() {
		$('button').click(function() {
			if (this.className === 'num') {
				box.populateCurrent(this.innerHTML);
			}
			else if (this.className === "operator") {
				box.populateOperators(this.innerHTML);
			}
			else {
				box[this.id]();
			}
			box.showCurrent();
			console.log("result : " + box.result);
			console.log("current : " + box.current);
			console.log("inputs : " + box.inputs);
		});
	}
};