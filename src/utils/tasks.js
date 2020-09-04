
export function isTaskRepeating(schedule) {
  return Object.values(schedule).some((day) => day);
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
