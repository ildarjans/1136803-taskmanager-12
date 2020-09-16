import moment from 'moment';
import {DAY_IN_MS} from '../consts.js';

export function isTaskRepeating(schedule) {
  return Object.values(schedule).some((day) => day);
}

export function isTaskExpired(date) {
  if (!(date instanceof Date)) {
    return false;
  }
  return (date.getTime() - Date.now()) < 0 ? true : false;
}

export function isTaskExpiredToday(date) {
  if (!(date instanceof Date)) {
    return false;
  }
  return isSameDate(date, new Date());
}

export function getCurrentDate() {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
}

export function getDateWeekBefore(today) {
  const daysBeforeInMs = DAY_IN_MS * 6;
  return new Date(today.getTime() - daysBeforeInMs);
}

export function sortTasksAscOrder(a, b) {
  if (!a.dueDate && !b.dueDate) {
    return 0;
  }
  return a.dueDate > b.dueDate ? 1 : -1;
}

export function sortTasksDescOrder(a, b) {
  if (!a.dueDate && !b.dueDate) {
    return 0;
  }
  return a.dueDate < b.dueDate ? 1 : -1;
}

export function getTaskDateFormatString(dueDate) {
  if (dueDate instanceof Date) {
    return moment(dueDate).format(`D MMMM`);
  }
  return ``;
}

export function isSameDate(date1, date2) {
  if (!date1 && !date2) {
    return true;
  }
  return moment(date1).isSame(date2, `day`);
}
