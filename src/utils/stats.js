import moment from 'moment';
import {Color} from '../consts.js';

export const colorToHex = {
  [Color.BLACK]: `#000000`,
  [Color.BLUE]: `#0c5cdd`,
  [Color.GREEN]: `#31b55c`,
  [Color.PINK]: `#ff3cb9`,
  [Color.YELLOW]: `#ffe125`
};

export function countTasksInDateRange(tasks, dateFrom, dateTo) {
  return tasks.reduce((counter, task) => {
    const dueDate = task.dueDate;
    if (!dueDate) {
      return counter;
    }
    if (
      moment(dueDate).isSame(dateFrom, `day`) ||
      moment(dueDate).isBetween(dateFrom, dateTo) ||
      moment(dueDate).isSame(dateTo, `day`)
    ) {
      return ++counter;
    }

    return counter;
  }, 0);
}

export function getUniqItems(arr) {
  return [...new Set(arr)];
}

export function countTasksForEachColor(colors, tasks) {
  return colors.map((color) => tasks.filter((task) => task.color === color).length);
}

export function convertColorNamesToHEX(colors) {
  return colors.map((color) => colorToHex[color]);
}

export function getFormatedUniqTaskDates(dates) {
  const dueDateTasks = dates.map((date) => moment(date).format(`D MMM`));
  return getUniqItems(dueDateTasks);
}

export function parseFormatedDates(dates) {
  return dates.map((date) => moment(date, `D MMM`).toDate());
}

export function countTasksForEachDate(dates, tasks) {
  return dates
    .map((date) => {
      return tasks
        .filter((task) => {
          return moment(task.dueDate).isSame(date, `day`);
        }).length;
    });
}

export function filterTasksInDateRange(tasks, dateFrom, dateTo) {
  return tasks.filter((task) => {
    return (
      moment(task.dueDate).isSame(dateFrom, `day`) ||
      moment(task.dueDate).isBetween(dateFrom, dateTo) ||
      moment(task.dueDate).isSame(dateTo, `day`)
    );
  });
}
