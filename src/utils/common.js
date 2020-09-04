export function getRandomInteger(max, min = 0) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function getRandomArrayElement(arr) {
  return arr[getRandomInteger(arr.length - 1)];
}
