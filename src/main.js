import {
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
  EMPTY_MESSAGE
} from './consts.js';

import SiteMenuView from './view/site-menu.js';
import MainBoardView from './view/main-board.js';
import SortListView from './view/sort-list.js';
import TasksBoardView from './view/tasks-board.js';
import LoadMoreButtonView from './view/load-more-button.js';
import FiltersView from './view/tasks-filter.js';
import EmptyBoardMessageView from './view/empty-board-message.js';
import {getRandomTask} from './mock/tasks.js';
import {getFilterTitlesArray} from './mock/filters.js';
import {renderElement} from './render.js';
import {renderTaskComponent} from './view/render-task-component.js';

const main = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);
const filterTitles = getFilterTitlesArray(tasks);

renderElement(controlContainer, new SiteMenuView().getElement());
renderElement(main, new FiltersView(filterTitles).getElement());
renderElement(main, new MainBoardView().getElement());

const mainBoardContainer = main.querySelector(`.board.container`);

// if tasks empty render empty message
if (tasks.length === 0) {
  const emptyMessage = new EmptyBoardMessageView(EMPTY_MESSAGE);
  renderElement(mainBoardContainer, emptyMessage.getElement());
} else {
  renderElement(mainBoardContainer, new SortListView().getElement());
  renderElement(mainBoardContainer, new TasksBoardView().getElement());
}

const tasksBoardContainer = main.querySelector(`.board__tasks`);
// render first pool of cards
let lastRenderedTaskIndex = 0;
tasks
  .slice(0, CARDS_TO_DISPLAY)
  .forEach((task) => {
    renderTaskComponent(tasksBoardContainer, task);
    lastRenderedTaskIndex++;
  });

// if necessary add loadMoreButton
if (tasks.length > CARDS_TO_DISPLAY) {
  const loadMoreBtn = new LoadMoreButtonView();
  renderElement(mainBoardContainer, loadMoreBtn.getElement());
  loadMoreBtn.getElement().addEventListener(`click`, () => {
    tasks
    .slice(lastRenderedTaskIndex, lastRenderedTaskIndex + CARDS_TO_DISPLAY)
    .forEach((task) => {
      renderTaskComponent(tasksBoardContainer, task);
      lastRenderedTaskIndex++;
    });

    // if all tasks displayed remove button
    if (lastRenderedTaskIndex === tasks.length) {
      loadMoreBtn.getElement().remove();
      loadMoreBtn.resetElement();
    }
  });
}
