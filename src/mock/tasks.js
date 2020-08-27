import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {COLORS} from '../consts.js';

// use here coz it's only for this mock module
const MAX_DAY_DEVIATION = 7;
const LOWER_HOUR = 7;
const HIGHER_HOUR = 23;
const MINS_IN_HOUR = 59;

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

function getDeadlineDate() {
  let newDate = new Date();
  const day = newDate.getUTCDate() + getRandomInteger(-MAX_DAY_DEVIATION, MAX_DAY_DEVIATION);
  const hour = getRandomInteger(HIGHER_HOUR, LOWER_HOUR);
  const minutes = getRandomInteger(MINS_IN_HOUR);

  newDate.setUTCDate(day);
  newDate.setUTCHours(hour, minutes);

  return newDate;
}

function isTaskRepeating(schedule) {
  return Object.keys(schedule).some((day) => schedule[day]);
}

export function getRandomTask() {
  const description = getRandomArrayElement(descriptions);
  const color = getRandomArrayElement(COLORS);
  const isFavorite = Boolean(getRandomInteger(1));
  const isArchive = Boolean(getRandomInteger(1));
  const repeatingDays = {
    'mo': Boolean(getRandomInteger(1)),
    'tu': false,
    'we': false,
    'th': Boolean(getRandomInteger(1)),
    'fr': false,
    'sa': false,
    'su': false
  };

  const dueDate = isTaskRepeating(repeatingDays) ?
    null :
    getDeadlineDate();

  return {
    description,
    color,
    isFavorite,
    isArchive,
    repeatingDays,
    dueDate,
  };
}

