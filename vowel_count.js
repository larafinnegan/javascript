function vowelCount(input) {
    var string = input.toLowerCase();
    var vowels = ["a", "e", "i", "o", "u"];
    var count = 0;
    
    for (i in string) {
        for (j in vowels) {
            if (vowels[j] === string[i]) {
            count += 1;
            }
        }
    }
    return count;
}

vowelCount("My Awesome name is LARA");
