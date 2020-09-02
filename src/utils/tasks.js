import moment from 'moment';
export function isTaskRepeating(schedule) {
  return Object.values(schedule).some((day) => day);
}

export function isSameDay(date1, date2) {
  return (
    date1 && date2 &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  );
}
export function getTaskDateFormatString(dueDate) {
  if (dueDate instanceof Date) {
    return moment(dueDate).format(`D MMMM`);
  }
  return ``;
}

export function updateItem(items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  items.splice(index, 1, update);

  return items;
}
