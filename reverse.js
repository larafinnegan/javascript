function reverse(input) {
  var string = "";
  
  for (var i = input.length - 1; i >= 0; i--) {
      string += input[i];
  }
  return string;
};

reverse("Hello how are you today?");
