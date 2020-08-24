import {TASKS_LENGTH} from './consts.js';
import {getRandomTask} from './mock/tasks.js';
import BoardPresenter from './presenter/board.js';
const main = document.querySelector(`.main`);
const menu = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);

const presenter = new BoardPresenter(main, menu);

presenter.init(tasks);
