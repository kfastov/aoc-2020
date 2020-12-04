const slope = (map, x, y) => {
  return map
    .map((line, i) => +(!(i % y) && line[((i * x) / y) % line.length] == "#"))
    .reduce((a, b) => a + b);
};

const star1 = (map) => slope(map, 3, 1);

const star2 = (map) => {
  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
    .map((pair) => slope(map, ...pair))
    .reduce((a, b) => a * b);
};

module.exports = async (input) => {
  const map = input.split("\n").filter((s) => s);
  return [star1, star2].map((star) => star(map));
};
