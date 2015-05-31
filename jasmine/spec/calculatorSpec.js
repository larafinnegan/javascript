
describe("calc#compute", function() {

  it('should add two numbers', function() {
    var array = ["3", "+", "4"];
    expect(calc.compute(array)).toEqual(7);
    expect(calc.compute(array)).not.toEqual(6);
  });

  it('should subtract two numbers', function() {
    var array = ["5", "-", "12"];
    expect(calc.compute(array)).toEqual(-7);
    expect(calc.compute(array)).not.toEqual(-8);
  });

  it('should multiply two numbers', function() {
    var array = ["6", "*", "4"];
    expect(calc.compute(array)).toEqual(24);
    expect(calc.compute(array)).not.toEqual(25);
  });

  it('should divide two numbers', function() {
    var array = ["8", "/", "4"];
    expect(calc.compute(array)).toEqual(2);
    expect(calc.compute(array)).not.toEqual(3);
  });

  it('should return infinity when dividing by 0', function() {
    var array = ["8", "/", "0"];
    expect(calc.compute(array)).toEqual(Infinity);
  });

  it('returns floats when necessary', function() {
    var array = ["3", "/", "4"];
    expect(calc.compute(array)).toEqual(0.75);
    expect(calc.compute(array)).not.toEqual(1);
  });

  it('parses floats correctly', function() {
    var array = ["3.2", "+", "5.365"];
    expect(parseFloat(calc.compute(array).toPrecision(12))).toEqual(8.565);
    expect(parseFloat(calc.compute(array).toPrecision(12))).not.toEqual(8);
  });

   it('calculates exponents', function() {
    var array = ["2", "^", "3"];
    expect(calc.compute(array)).toEqual(8);
    expect(calc.compute(array)).not.toEqual(7);
  });
 });