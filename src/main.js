import {TASKS_LENGTH} from './consts.js';
import {getRandomTask} from './mock/tasks.js';
import SiteMenuView from './view/site-menu.js';
import FiltersView from './view/tasks-filter.js';
import BoardPresenter from './presenter/board.js';
import {getFilterTitlesArray} from './utils/filters.js';
import {renderLastPlaceElement} from './utils/render.js';

const main = document.querySelector(`.main`);
const menu = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);

const presenter = new BoardPresenter(main);

const siteMenu = new SiteMenuView();
const filterTitles = getFilterTitlesArray(tasks);
const filters = new FiltersView(filterTitles);

renderLastPlaceElement(menu, siteMenu);
renderLastPlaceElement(main, filters);

presenter.init(tasks);
