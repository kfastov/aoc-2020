const star1 = (numbers, numberSet) => {
  // Star 1: find 2 numbers that add to 2020 and multiply them

  for (let num of numbers) {
    // Find complement to 2020
    const complement = 2020 - num;
    // Search it in set
    if (numberSet.has(complement)) {
      return num * complement;
    }
  }
};

// Star 2: find 3 numbers and do the same
const star2 = (numbers, numberSet) => {
  for (let i = 0; i < numbers.length; i++) {
    const num1 = numbers[i];
    // iterate all numbers that left
    for (let num2 of numbers.slice(i + 1)) {
      // Find complement
      const complement = 2020 - num1 - num2;
      // Search it in set
      if (numberSet.has(complement)) {
        return num1 * num2 * complement;
      }
    }
  }
};

module.exports = async (input) => {
  const numbers = input
    .split("\n")
    .map(Number)
    .filter((x) => x);
  const numberSet = new Set(numbers);
  return [star1, star2].map((star) => star(numbers, numberSet));
};
