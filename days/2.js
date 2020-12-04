const star1 = (input) => {
  return input.split('\n')
  .filter(s => s)
  .filter(s => {
    const [, min, max, letter, pass] = /^(\d+)-(\d+) (\w): (.+)$/.exec(s);
    const quantity = [...pass].filter(l => l === letter).length;
    return quantity >= min && quantity <= max
  }).length;
};

const star2 = (input) => {
  return input.split('\n')
    .filter(s => s)
    .filter(s => {
      const [, min, max, letter, pass] = /^(\d+)-(\d+) (\w): (.+)$/.exec(s);
      const quantity = +(pass[min - 1] === letter) + +(pass[max - 1] === letter);
      return quantity === 1;
    }).length;
};

module.exports = async (input) => {
  return [star1, star2].map((star) => star(input));
};
