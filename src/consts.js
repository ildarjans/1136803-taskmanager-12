const CARDS_TO_DISPLAY = 8;
const TASKS_LENGTH = 30;
const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];
const dateFormatOptions = {
  month: `long`,
};
const timeFormatOptions = {
  hour: `2-digit`,
  minute: `2-digit`,
  hour12: false,
};

const extendedDateFormatOptions =
  Object.assign(dateFormatOptions, timeFormatOptions);

export {
  dateFormatOptions,
  timeFormatOptions,
  extendedDateFormatOptions,
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
  COLORS
};

