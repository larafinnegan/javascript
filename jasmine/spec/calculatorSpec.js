
describe("calc#compute", function() {

  it('should add two numbers', function() {
    var array = ["3", "+", "4"];
    expect(calc.compute(array)).toEqual(7);
  });

  it('should subtract two numbers', function() {
    var array = ["5", "-", "12"];
    expect(calc.compute(array)).toEqual(-7);
  });

  it('should multiply two numbers', function() {
    var array = ["6", "*", "4"];
    expect(calc.compute(array)).toEqual(24);
  });

  it('should divide two numbers', function() {
    var array = ["8", "/", "4"];
    expect(calc.compute(array)).toEqual(2);
  });

  it('should return infinity when dividing by 0', function() {
    var array = ["8", "/", "0"];
    expect(calc.compute(array)).toEqual(Infinity);
  });

  it('returns floats when necessary', function() {
    var array = ["3", "/", "4"];
    expect(calc.compute(array)).toEqual(0.75);
  });

  it('parses floats correctly', function() {
    var array = ["3.2", "+", "5.365"];
    expect(parseFloat(calc.compute(array).toPrecision(12))).toEqual(8.565);
  });

   it('calculates exponents', function() {
    var array = ["2", "^", "3"];
    expect(calc.compute(array)).toEqual(8);
  });
 });

describe('box#populateCurrent', function() {

  beforeEach(function() {
    box.current = "0";
    box.result = false;
    box.history = [];
  });

  it('sets the current input string to the user input', function() {
    box.populateCurrent("3");
    expect(box.current).toEqual("3");
  });

  it('does not concatenate the input string when multiple 0s are entered and value is 0', function() {
    box.populateCurrent("0");
    box.populateCurrent("0");
    box.populateCurrent("0");
    expect(box.current).toEqual("0");
  });

 it('does concatenate the input string when multiple 0s are entered and value is not 0', function() {
    box.current = "2";
    box.populateCurrent("0");
    box.populateCurrent("0");
    box.populateCurrent("0");
    expect(box.current).toEqual("2000");
  });

 it('concatenates non-zero inputs', function() {
    box.current = "0";
    box.populateCurrent("1");
    box.populateCurrent("2");
    box.populateCurrent("3");
    expect(box.current).toEqual("123");
  });

 it('overwrites the current string when the current string is a calculation result', function() {
    box.current = "2295";
    box.result = true;
    box.populateCurrent("3");
    box.populateCurrent("2");
    expect(box.current).toEqual("32");
  });

  it('sets the result flag to false if true', function() {
    box.current = "2295";
    box.result = true;
    box.populateCurrent("3");
    expect(box.result).toBe(false);
  });

});

describe('box#memset', function() {

  it('should set the stored memory value to the current string', function() {
    box.current = "12345";
    box.memset();
    expect(box.m).toEqual("12345");
  });
});

describe('box#memrecall', function() {

  it('should set current string to the stored memory value', function() {
    box.m = "54321";
    box.memrecall();
    expect(box.current).toEqual("54321");
  });
});