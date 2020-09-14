import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {COLORS} from '../consts.js';
import {isTaskRepeating} from '../utils/tasks.js';

// use here coz it's only for this mock module
const MAX_DAY_DEVIATION = 7;

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

function getDeadlineDate() {
  let newDate = new Date();
  const day = newDate.getDate() + getRandomInteger(-MAX_DAY_DEVIATION, MAX_DAY_DEVIATION);

  newDate.setDate(day);
  newDate.setHours(23, 59, 59, 999);

  return newDate;
}

export function generateId() {
  const a = getRandomInteger(Date.now()).toString(16);
  const b = getRandomInteger(Date.now()).toString(16);
  return `${a}${b}`;
}

export function getRandomTask() {
  const id = generateId();
  const description = getRandomArrayElement(descriptions);
  const color = getRandomArrayElement(COLORS);
  const isFavorite = Boolean(getRandomInteger(1));
  const isArchive = Boolean(getRandomInteger(1));
  const repeating = {
    'mo': Boolean(getRandomInteger(1)),
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false
  };

  const dueDate = isTaskRepeating(repeating) ?
    null :
    getDeadlineDate();

  return {
    id,
    description,
    color,
    isFavorite,
    isArchive,
    repeating,
    dueDate,
  };
}
