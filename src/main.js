import {TASKS_LENGTH} from './consts.js';
import {getRandomTask} from './mock/tasks.js';
import TaskPresenter from './presenter/presenter.js';
const main = document.querySelector(`.main`);
const menu = document.querySelector(`.main__control`);
const tasks = Array(TASKS_LENGTH).fill().map(getRandomTask);

const presenter = new TaskPresenter(main, menu);

presenter.init(tasks);
