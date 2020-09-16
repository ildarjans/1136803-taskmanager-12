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

export const SortType = {
  DEFAULT: `default`,
  DESC: `date-down`,
  ASC: `date-up`,
};

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
};

export const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`,
  FAVORITE: `favorite`,
};

export const BLANK_TASK = {
  id: ``,
  description: ``,
  color: `black`,
  isFavorite: false,
  isArchive: false,
  dueDate: null,
  repeating: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false
  }
};
