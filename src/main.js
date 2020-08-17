import {
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
  SINGLE_CARD_TO_DISPLAY,
} from './consts.js';

import SiteMenu from './view/site-menu.js';
import MainBoard from './view/main-board.js';
import SortList from './view/sort-list.js';
import TasksBoard from './view/tasks-board.js';
import LoadMoreButton from './view/load-more-button.js';
import Filters from './view/filter.js';
import {getRandomTask} from './mock/tasks.js';
import {getFilterTitlesArray} from './mock/filters.js';
import {renderCardTemplates, renderContent, renderElement} from './render.js';
import {createCardTemplate} from './view/task-card.js';
import {createEditCardTemplate} from './view/task-edit-card.js';

const main = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);
const filterTitles = getFilterTitlesArray(tasks);
// const isNeedLoadMoreBtn = tasks.length > CARDS_TO_DISPLAY;
let loadMoreBtn;
let loadMoreBtnClickCounter = 0; // count CARD_TO_DISPLAY pool of cards

renderElement(controlContainer, new SiteMenu().getElement());
renderElement(main, new Filters(filterTitles).getElement());
renderElement(main, new MainBoard().getElement());

const mainBoardContainer = main.querySelector(`.board.container`);
renderElement(mainBoardContainer, new SortList().getElement());
renderElement(mainBoardContainer, new TasksBoard().getElement());
renderElement(mainBoardContainer, new LoadMoreButton().getElement());
const tasksBoardContainer = main.querySelector(`.board__tasks`);

const renderTaskCardTemplates = renderCardTemplates(
    tasksBoardContainer,
    tasks.slice(),
    createCardTemplate // as default fn
);

// if (isNeedLoadMoreBtn) {
//   loadMoreBtn = document.querySelector(`button.load-more`);
//   loadMoreBtn.addEventListener(`click`, moreButtonClickHandler);
// }

// ------------------------------------
// render 1st pool of cards
// args: 1) card quantity (single) 2) pass ManualTemplate Fn, for renderContent EditCard Template
renderTaskCardTemplates(SINGLE_CARD_TO_DISPLAY, createEditCardTemplate);

// args: 1) card quantity (8 - rendered before as 1 = 7)
renderTaskCardTemplates(CARDS_TO_DISPLAY - SINGLE_CARD_TO_DISPLAY);

loadMoreBtnClickCounter++;

// ------------------------------------

function moreButtonClickHandler() {
  renderTaskCardTemplates();
  loadMoreBtnClickCounter++;
  if (CARDS_TO_DISPLAY * loadMoreBtnClickCounter >= tasks.length) {
    removeLoadMoreButton();
  }
}

function removeLoadMoreButton() {
  loadMoreBtn.removeEventListener(`click`, moreButtonClickHandler);
  loadMoreBtn.remove();
}
