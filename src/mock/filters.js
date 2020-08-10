import {isSameDay} from '../utilities.js';

const filterTitles = [
  `all`,
  `overdue`,
  `today`,
  `favorite`,
  `repeating`,
  `archive`
];

function countTasksFilterProperties(tasks) {
  const counter = {
    'all': 0,
    'overdue': 0,
    'today': 0,
    'favorite': 0,
    'repeating': 0,
    'archive': 0
  };

  const today = new Date();

  tasks.forEach((task) => {
    const {isFavorite, isArchive, repeatingDays, dueDate} = task;
    counter[`favorite`] += isFavorite;
    counter[`archive`] += isArchive;
    counter[`all`] += 1;
    counter[`repeating`] += Object.keys(repeatingDays).some((key) => repeatingDays[key]);
    counter[`overdue`] += today > dueDate;
    counter[`today`] += dueDate ? isSameDay(dueDate, today) : 0;
  });

  return counter;
}

export function getTasksFilterArray(tasks) {
  let tasksFilter = [];
  const titlesCounter = countTasksFilterProperties(tasks);
  filterTitles.forEach((title) => {
    const count = titlesCounter[title];
    tasksFilter.push({title, count});
  });
  return tasksFilter;
}
