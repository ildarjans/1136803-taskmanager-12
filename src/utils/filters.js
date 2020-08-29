import {isSameDay} from './common.js';
import {isTaskRepeating} from './tasks.js';

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
    const {isFavorite, isArchive, repeating, dueDate} = task;
    counter[`favorite`] += isFavorite;
    counter[`archive`] += isArchive;
    counter[`all`] += 1;
    counter[`repeating`] += isTaskRepeating(repeating);
    counter[`overdue`] += today > dueDate;
    counter[`today`] += dueDate ? isSameDay(dueDate, today) : 0;
  });

  return counter;
}

export function getFilterTitlesArray(tasks) {
  let tasksFilter = [];
  const titlesCounter = countTasksFilterProperties(tasks);
  filterTitles.forEach((title) => {
    const count = titlesCounter[title];
    tasksFilter.push({title, count});
  });
  return tasksFilter;
}
