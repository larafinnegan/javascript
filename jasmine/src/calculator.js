var calc = {

	
	compute: function(array) {
		array[0] = parseFloat(array[0]);
		array[2] = parseFloat(array[2]);
		switch(array[1]) {
			case "+":
				return array[0] + array[2];
			case "-":
				return array[0] - array[2];
			case "/":
				return array[0] / array[2];
			case "*":
				return array[0] * array[2];
			case "^":
				return Math.pow(array[0], array[2]);
		}
	},
};

$(document).ready(function() {
	input.getInput();
});


var box = {
	current: "0",
	inputs: [],
	result: false,
	m: 0,
	
	strip: function(number) {
		return (parseFloat(number.toPrecision(12)));
	},
	
	populateCurrent: function(input) {
		if (this.result || this.current === "0") {
			this.current = input;
			this.result = false;
		}
		else if (this.current === "0" && input === "0") {
			this.current = "0";
		}
		else {
			this.current += input;
		}
		this.showCurrent();
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
		this.inputs.push(this.current);
		if (this.inputs.length < 2) {
			this.inputs.push(operator);
			this.current = "0";
		}
		else if (this.inputs.length === 2) {
			this.inputs[this.inputs.length - 1] = operator;
		}
		else {
			this.equals();
			this.inputs.push(operator);
		}
		this.showHistory();
	},

	pi: function() {
		this.current = Math.PI;
		this.result = true;
	},

	sqroot: function() {
		this.current = Math.sqrt(this.current);
		this.result = true;
	},

	negate: function() {
		this.current *= (-1);
	},

	inverse: function() {
		this.current = 1 / this.current;
	},
	
	dot: function() {
		if (this.current === "0") {
			this.current = "0.";
		}
		else if (this.current % 1 === 0) {
			this.current += ".";
		}
	},
	
	clear: function() {
		this.current = "0";
		this.inputs = [];
		this.result = false;
	},
	
	back: function() {
		if (this.current !== "0") this.current = this.current.substring(0, this.current.length - 1);
	},
	
	calcResult: function() {
		this.inputs.length <= 2 ? this.current = this.inputs[0] : this.current = calc.compute(this.inputs);
	},
	
	equals: function() {
		this.inputs.push(this.current);
		this.calcResult();
		this.inputs = [this.current];
		this.result = true;
		this.showCurrent();
		this.hideHistory();
	}
};

var input = {

	getInput: function() {
		$('button').click(function() {
			if (this.className === 'num') {
				box.populateCurrent(this.innerHTML);
			}
			else if (containsID(["dot", "back", "clear", "equals", "memset", "memrecall"], this.id)) {
				box[this.id]();
			}
			else {
				box.populateOperators(this.innerHTML);
			}
			console.log("result : " + box.result);
			console.log("current : " + box.current);
			console.log("inputs : " + box.inputs);
		});
	}
};

function containsID(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === id) return true;
    }
    return false;
}