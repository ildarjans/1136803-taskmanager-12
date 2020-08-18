import {
  CARDS_TO_DISPLAY,
  TASKS_LENGTH,
} from './consts.js';

import SiteMenu from './view/site-menu.js';
import MainBoard from './view/main-board.js';
import SortList from './view/sort-list.js';
import TasksBoard from './view/tasks-board.js';
import LoadMoreButton from './view/load-more-button.js';
import Task from './view/task-card.js';
import TaskEdit from './view/task-edit-card.js';
import Filters from './view/tasks-filter.js';
import {getRandomTask} from './mock/tasks.js';
import {getFilterTitlesArray} from './mock/filters.js';
import {renderElement} from './render.js';

const main = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);
const filterTitles = getFilterTitlesArray(tasks);

renderElement(controlContainer, new SiteMenu().getElement());
renderElement(main, new Filters(filterTitles).getElement());
renderElement(main, new MainBoard().getElement());

const mainBoardContainer = main.querySelector(`.board.container`);
renderElement(mainBoardContainer, new SortList().getElement());
renderElement(mainBoardContainer, new TasksBoard().getElement());
const tasksBoardContainer = main.querySelector(`.board__tasks`);


// render first pool of cards
let lastRenderedTaskIndex = 0;
tasks
  .slice(0, CARDS_TO_DISPLAY)
  .forEach((task) => {
    renderTask(tasksBoardContainer, task);
    lastRenderedTaskIndex++;
  });

// if necessary add loadMoreButton
if (tasks.length > CARDS_TO_DISPLAY) {
  const loadMoreBtn = new LoadMoreButton();
  renderElement(mainBoardContainer, loadMoreBtn.getElement());
  loadMoreBtn.getElement().addEventListener(`click`, () => {
    tasks
    .slice(lastRenderedTaskIndex, lastRenderedTaskIndex + CARDS_TO_DISPLAY)
    .forEach((task) => {
      renderTask(tasksBoardContainer, task);
      lastRenderedTaskIndex++;
    });

    if (lastRenderedTaskIndex === tasks.length) {
      loadMoreBtn.getElement().remove();
      loadMoreBtn.resetElement();
    }
  });
}

function renderTask(container, task) {
  const taskCard = new Task(task);
  const taskEditCard = new TaskEdit(task);
  renderElement(container, taskCard.getElement());

  function switchToEditForm() {
    container.replaceChild(taskEditCard.getElement(), taskCard.getElement());
  }
  function switchToCard() {
    container.replaceChild(taskCard.getElement(), taskEditCard.getElement());
  }

  taskCard
    .getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      switchToEditForm();
    });

  taskEditCard
    .getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      switchToCard();
    });

}
