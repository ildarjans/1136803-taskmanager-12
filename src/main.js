import {TASKS_LENGTH} from './consts.js';
import {getRandomTask} from './mock/tasks.js';
import SiteMenuView from './view/site-menu.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import TasksModel from './model/task.js';
import FiltersModel from './model/filter.js';
import {renderLastPlaceElement} from './utils/render.js';

const main = document.querySelector(`.main`);
const menu = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FiltersModel();

const boardPresenter = new BoardPresenter(main, filterModel, tasksModel);
const filterPresenter = new FilterPresenter(main, filterModel, tasksModel);
const siteMenu = new SiteMenuView();

renderLastPlaceElement(menu, siteMenu);

filterPresenter.init();
boardPresenter.init();

document
  .querySelector(`.control__label--new-task`)
  .addEventListener(`click`, boardPresenter.createTask);
