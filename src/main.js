import {
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
  SINGLE_CARD_TO_DISPLAY,
} from './consts.js';
import {getRandomTask} from './mock/tasks.js';
import {getTasksFilterArray} from './mock/filters.js';
import {renderCardTemplates, render} from './render.js';
import {createControlTemplate} from './view/control.js';
import {createFiltersTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createCardTemplate} from './view/task.js';
import {createEditCardTemplate} from './view/task-edit.js';

const main = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);
const filterTitlesArray = getTasksFilterArray(tasks);
const isBoardOverflow = tasks.length > CARDS_TO_DISPLAY;
let loadMoreBtn;

render(controlContainer, createControlTemplate());
render(main, createFiltersTemplate(filterTitlesArray));
render(main, createBoardTemplate(isBoardOverflow));

const taskContainer = main.querySelector(`.board__tasks`);
const renderTaskCardTemplates = renderCardTemplates(
    taskContainer,
    tasks.slice(),
    createCardTemplate, // as default fn
    CARDS_TO_DISPLAY,
    removeLoadMoreButton // as exit fn
);

if (isBoardOverflow) {
  loadMoreBtn = document.querySelector(`button.load-more`);
  loadMoreBtn.addEventListener(`click`, moreButtonClickHandler);
}

// args: 1) card quantity (single) 2) pass ManualTemplate Fn, for render EditCard Template
renderTaskCardTemplates(SINGLE_CARD_TO_DISPLAY, createEditCardTemplate);

// args: 1) card quantity (8 - rendered before as 1 = 7)
renderTaskCardTemplates(CARDS_TO_DISPLAY - SINGLE_CARD_TO_DISPLAY);

function moreButtonClickHandler() {
  renderTaskCardTemplates();
}

function removeLoadMoreButton() {
  loadMoreBtn.removeEventListener(`click`, moreButtonClickHandler);
  loadMoreBtn.remove();
}

