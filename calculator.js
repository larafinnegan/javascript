var calc = {

	m: 0,
	
	compute: function(array) {
		array[0] = parseFloat(array[0]);
		array[2] = parseFloat(array[2]);
		switch(array[1]) {
			case "+":
				return array[0] + array[2];
			case "-":
				return array[0] - array[2];
			case "/":
				if (array[2] === 0) {
					this.divZero();
					box.clear();
				}
				else {
					array[0] / array[2];
				}
			case "*":
				return array[0] * array[2];
			case "^":
				return Math.pow(array[0], array[2]);
		}
	},
	
	divZero: function() {
		alert("Cannot divide by 0.");
	},
	
	memset: function() {
		this.m = box.current;
	},
	
	memrecall: function() {
		box.current = this.m;
	},
		
	pi: function() {
		box.result = box.current = Math.PI;
	},

	sqroot: function() {
		box.result = box.current = Math.sqrt(box.current);
	},

	negate: function() {
		box.current *= (-1);
		box.result *= (-1);
	},

	inverse: function() {
		if (box.current === 0) {
			this.divZero();
		}
		else {
			box.current = 1 / box.current;
		}
	}
};

$(document).ready(function() {
	input.getInput();
});


var box = {
	current: "0",
	inputs: [],
	result: "",
	
	strip: function(number) {
		return (parseFloat(number.toPrecision(12)));
	},
	
	populateCurrent: function(input) {
		if (this.current === "0" || this.result !== "") {
			this.current = input;
			this.result = "";
		}
		else if (this.current === "0" && input === "0") {
			this.current = "0";
		}
		else {
			this.current += input;
			console.log(this.current.indexOf("."));
		}
		console.log(this.inputs);
	},
	
	showHistory: function() {
		document.getElementById("history").innerHTML = this.inputs.join(" ");
	},
	
	hideHistory: function() {
		document.getElementById("history").innerHTML = "";
	},
	
	show: function(input) {
		document.getElementById("current").innerHTML = input;
	},
	
	populateOperators: function(operator) {
		this.show(this.current);
		if (this.current !== "0") {
			this.inputs.push(this.current);
		}
		if (this.inputs.length === 0) {
			this.inputs = [0, operator];
		}
		else if (this.inputs.length === 2) {
			this.inputs[this.inputs.length - 1] = operator;
		}
		else if (this.inputs.length > 2) {
			this.equals();
			this.inputs.push(operator);
		}
		else {
			this.inputs.push(operator);
		}
		this.current = "0";
		console.log(this.inputs);
		this.showHistory();
	},
	
	dot: function() {
		if (this.current === "0") {
			this.current = "0."
		}
		else if (this.current % 1 === 0) {
			this.current += ".";
		}
		this.show(this.current);
	},
	
	clear: function() {
		this.current = "0";
		this.inputs = [];
		this.result = "";
	},
	
	back: function() {
		if (this.current !== "0") {
			this.current = this.current.substring(0, this.current.length - 1);
		}
		this.show(this.current);
	},
	
	calcResult: function() {
		if (this.inputs.length <= 2) {
			this.result = this.inputs[0];
		}
		else {
			this.result = calc.compute(this.inputs);
		}
	},
	
	equals: function() {
		if (this.current !== "") {
			this.inputs.push(this.current);
		}
		this.calcResult();
		this.inputs = [this.result];
		this.current = "0";
		this.hideHistory();
		this.show(this.result);
	}
};

var input = {

	getInput: function() {
		$('button').click(function() {
			if (this.className === 'num') {
				box.populateCurrent(this.innerHTML);
				box.show(box.current);
			}
			else if (containsID(["dot", "back"], this.id)) {
				box[this.id]();
				box.show(box.current);
			}
			else if (containsID(["add", "subtract", "multiply", "divide", "power"], this.id)) {
				box.populateOperators(this.innerHTML);
			}
			else if (containsID(["clear", "equals"], this.id)) {
				box[this.id]();
				box.show(box.result);
			}
			else {
				calc[this.id]();
				box.show(box.current);
			}
			console.log("result : " + box.result);
			console.log("current : " + box.current);
			console.log("inputs : " + box.inputs);
		});
	}
};

function containsID(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === id) {
            return true;
        }
    }
    return false;
}