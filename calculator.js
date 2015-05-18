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
				return array[0] / array[2];
			case "*":
				return array[0] * array[2];
			case "^":
				return Math.pow(array[0], array[2]);
		}
	},
	
	memset: function() {
		this.m = box.current;
	},
	
	memrecall: function() {
		box.current = this.m;
	},
		
	pi: function() {
		if (isNaN(box.inputs[box.inputs.length - 1])) {
			box.inputs[box.inputs.length] = box.current = Math.PI;
		}
		else {
			box.inputs[box.inputs.length - 1] = box.current = Math.PI;
		}
	},

	sqroot: function() {
		this.display[this.display.length - 1] = this.result = Math.sqrt(this.display[this.display.length - 1]);
	},

	negate: function() {
		box.current *= (-1);
	},

	inverse: function() {
		if (box.current === 0) {
			alert("Cannot divide by 0.");
		}
		else {
			this.display[this.display.length -1] = this.result = (1 / (this.display[this.display.length -1]));
		}
	}
};

$(document).ready(function() {
	input.getInput();
});


var box = {
	current: "",
	inputs: ["0"],
	result: "",
	
	populateCurrent: function(input) {
		if (this.inputs[0] === "0" && this.inputs.length === 1) {
			this.inputs = [input];
			this.current = input;
			console.log("a");
			console.log(this.inputs);
		}
		else if (this.inputs.length % 2 === 0) {
			this.current = input;
			this.inputs.push(input);
		}
		else {
			this.current += input;
			this.inputs[this.inputs.length - 1] = this.current;
		}
		console.log(this.inputs);
	},
	
	showHistory: function() {
		document.getElementById("history").innerHTML = this.inputs.join(" ");
	},

	showResult: function() {
		document.getElementById("current").innerHTML = this.result;
	},
	
	showCurrent: function() {
		document.getElementById("current").innerHTML = this.current;
	},
	
	populateOperators: function(operator) {
		if (this.inputs.length % 2 === 0) {
			this.inputs[this.inputs.length - 1] = operator;
		}
		else {
			this.inputs.push(operator);
		}
		this.calcResult();
		console.log(this.result);
		this.current = "0";
	},
	
	dot: function() {
		if (this.current % 1 === 0) {
			this.current += ".";
		}
	},
	
	clear: function() {
		this.current = "";
		this.inputs = ['0'];
		this.result = "";
	},
	
	back: function() {
		if (this.inputs.length % 2 !== 0) {
			this.current = this.current.substring(0, this.current.length - 1);
			this.inputs[this.inputs.length - 1] = this.current;
		}
		this.showCurrent();
	},
	
	calcResult: function() {
		if (this.inputs.length <= 2) {
			this.result = this.inputs[0];
			console.log("a");
		}
		else if (this.inputs.length === 3) {
			this.result = calc.compute(this.inputs);
			console.log("b");
		}
		else if (this.inputs.length === 4) {
			this.result = calc.compute(this.inputs.slice(0, this.inputs.length - 1));
		}
		else if (this.inputs.length % 2 === 0) {
			console.log(this.result);
			console.log([this.result, this.inputs[this.inputs.length - 3], this.inputs[this.inputs.length - 2]]);
			this.result = calc.compute([this.result, this.inputs[this.inputs.length - 3], this.inputs[this.inputs.length - 2]]);
			console.log("c");
		}
	},
	
	equals: function() {
		this.calcResult();
		this.inputs = [this.result];
		this.current = "";
	},
};

var input = {

	getInput: function() {
		$('button').click(function() {
			if (this.className === 'num') {
				box.populateCurrent(this.innerHTML);
				box.showCurrent();
			}
			else if (containsID(["dot", "back"], this.id)) {
				box[this.id]();
			}
			else if (containsID(["add", "subtract", "multiply", "divide", "power"], this.id)) {
				box.populateOperators(this.innerHTML);
				box.showResult();
			}
			else if (containsID(["clear", "equals"], this.id)) {
				box[this.id]();
				box.showResult();
			}
			else {
				calc[this.id]();
			}
			box.showHistory();
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