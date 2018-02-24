// return the distance between 2 points
PLAYGROUND.Application.prototype.dist = function (x, y, x1, y1) {
  var a = Math.pow(x1 - x, 2);
  var b = Math.pow(y1 - y, 2);

  return Math.sqrt(a + b);
}