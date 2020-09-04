export const CARDS_TO_DISPLAY = 8;
export const TASKS_LENGTH = 21;
export const EMPTY_MESSAGE = `Click «ADD NEW TASK» in menu to create your first task`;
export const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];
export const TaskMode = {
  DEFAULT: `DEFAULT`,
  EDIT: `EDIT`
};

export const dateFormatOptions = {
  month: `long`,
};

export const timeFormatOptions = {
  hour: `2-digit`,
  minute: `2-digit`,
  hour12: false,
};

export const extendedDateFormatOptions =
  Object.assign({}, dateFormatOptions, timeFormatOptions);

export const SortType = {
  DEFAULT: `default`,
  DESC: `date-down`,
  ASC: `date-up`,
};
