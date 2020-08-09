import {getRandomInteger, getRandomArrayElement} from './utilities.js';
import {COLORS} from './constants.js';

const MAX_DAY_DEVIATION = 7;

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];


function setDeadlineDate() {
  let newDate = new Date();
  const day = newDate.getUTCDate() + getRandomInteger(-MAX_DAY_DEVIATION, MAX_DAY_DEVIATION);
  const hour = getRandomInteger(23, 7);
  const minutes = getRandomInteger(59);

  newDate.setUTCDate(day);
  newDate.setUTCHours(hour, minutes);

  return newDate;
}

function isTaskRepeat(schedule) {
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
    'th': false,
    'fr': false,
    'sa': false,
    'su': false
  };
  const dueDate = isTaskRepeat(repeatingDays) ?
    null :
    setDeadlineDate();

  return {
    description,
    color,
    isFavorite,
    isArchive,
    repeatingDays,
    dueDate,
  };
}

