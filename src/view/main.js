import {
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
  SINGLE_CARD_TO_DISPLAY,
} from './constants.js';
import {getRandomTask} from './task-mock.js';
import {getTasksFilterArray} from './filter-mock.js';
import {renderCardTemplates, render} from './render.js';
import {createControlTemplate} from './control.js';
import {createFiltersTemplate} from './filter.js';
import {createBoardTemplate} from './board.js';
import {createCardTemplate} from './task.js';
import {createEditCardTemplate} from './task-edit.js';

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
    createCardTemplate,
    CARDS_TO_DISPLAY,
    removeLoadMoreButton
);

if (isBoardOverflow) {
  loadMoreBtn = document.querySelector(`button.load-more`);
  loadMoreBtn.addEventListener(`click`, moreButtonClickHandler);
}

function moreButtonClickHandler() {
  renderTaskCardTemplates();
}

function removeLoadMoreButton() {
  loadMoreBtn.removeEventListener(`click`, moreButtonClickHandler);
  loadMoreBtn.remove();
}

renderTaskCardTemplates(SINGLE_CARD_TO_DISPLAY, createEditCardTemplate);
renderTaskCardTemplates(CARDS_TO_DISPLAY - SINGLE_CARD_TO_DISPLAY);

