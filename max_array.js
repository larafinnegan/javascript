function myMax(array) {
    var max = array[0];
    for (i in array) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

myMax([1,4,2,6,7,3,2]);
