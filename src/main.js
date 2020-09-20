import {TASKS_LENGTH, SiteMenuItem, UpdateType, FilterType} from './consts.js';
import {getRandomTask} from './mock/tasks.js';
import SiteMenuView from './view/site-menu.js';
import StatsView from './view/stats.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import TasksModel from './model/task.js';
import FiltersModel from './model/filter.js';
import {renderLastPlaceElement, removeElement} from './utils/render.js';

const main = document.querySelector(`.main`);
const menu = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FiltersModel();

const boardPresenter = new BoardPresenter(main, filterModel, tasksModel);
const filterPresenter = new FilterPresenter(main, filterModel, tasksModel);
const siteMenu = new SiteMenuView();
const statsMenu = new StatsView(tasksModel.getTasks());
siteMenu.setMenuChangeHandler(siteMenuClickHandler);

renderLastPlaceElement(menu, siteMenu);

filterPresenter.init();
boardPresenter.init();

// Этот фарш предложили лекторы из Академии.
// По хорошуму нужно следать отдельный Претезнтер Меню
// Я это понимаю, но не нахожу время это реализовать
function siteMenuClickHandler(menuItem) {
  switch (menuItem) {
    case SiteMenuItem.ADD_NEW_TASK:
      boardPresenter.destroy();
      removeElement(statsMenu);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(closeAddNewTaskHandler);
      siteMenu
      .getElement()
      .querySelector(`[value=${SiteMenuItem.TASKS}]`).disabled = true;
      break;
    case SiteMenuItem.TASKS:
      removeElement(statsMenu);
      boardPresenter.init();
      break;
    case SiteMenuItem.STATISTICS:
      boardPresenter.destroy();
      statsMenu.init(tasksModel.getTasks());
      renderLastPlaceElement(main, statsMenu);
      break;
  }
}

function closeAddNewTaskHandler() {
  siteMenu
    .getElement()
    .querySelector(`[value=${SiteMenuItem.TASKS}]`).disabled = false;

  siteMenu.setMenuItem(SiteMenuItem.TASKS);
}
