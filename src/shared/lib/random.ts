const number = 0.5;

export function getRandomNumber([min, max]: number[]) {
  return Math.round(min - number + Math.random() * (max - min + 1));
}
