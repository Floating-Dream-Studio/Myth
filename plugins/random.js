PLAYGROUND.Application.prototype.randomIntToMax = function (max) {
    // return a value between 0 and max (excluded)
    return Math.floor(Math.random() * Math.floor(max));
}

PLAYGROUND.Application.prototype.randomIntExMax = function (max) {
    // return a value between 1 and max (included)
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}