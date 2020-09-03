
export function isTaskRepeating(schedule) {
  return Object.values(schedule).some((day) => day);
}
