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
  return (date instanceof Date) ? isSameDate(date, new Date()) : ``;
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
  return a.dueDate - b.dueDate;
}

export function sortTasksDescOrder(a, b) {
  if (!a.dueDate && !b.dueDate) {
    return 0;
  }
  return b.dueDate - a.dueDate;
}

export function getTaskDateFormatString(dueDate) {
  return dueDate instanceof Date ? moment(dueDate).format(`D MMMM`) : ``;
}

export function isSameDate(date1, date2) {
  return (!date1 && !date2) ? true : moment(date1).isSame(date2, `day`);
}
