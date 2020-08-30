const CARDS_TO_DISPLAY = 8;
const TASKS_LENGTH = 21;
const EMPTY_MESSAGE = `Click «ADD NEW TASK» in menu to create your first task`;
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
  Object.assign({}, dateFormatOptions, timeFormatOptions);

const SortType = {
  DEFAULT: `default`,
  DESC: `date-down`,
  ASC: `date-up`,
};

export {
  dateFormatOptions,
  timeFormatOptions,
  extendedDateFormatOptions,
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
  COLORS,
  EMPTY_MESSAGE,
  SortType
};
