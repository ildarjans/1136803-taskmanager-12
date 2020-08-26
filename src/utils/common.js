export function getRandomInteger(max, min = 0) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function getRandomArrayElement(arr) {
  return arr[getRandomInteger(arr.length - 1)];
}

export function getDeadlineDateString(date, options, locals = `en-Us`) {
  return `${date.getDate()} ${date.toLocaleDateString(locals, options)}`;
}

export function getDeadlineTimeString(date, options, locals = `en-Us`) {
  return date.toLocaleTimeString(locals, options);
}

export function isSameDay(date1, date2) {
  return (
    date1 && date2 &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  );
}

export function updateItem(items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
}
