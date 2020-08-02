const CARDS_TO_DISPLAY = 3;
const main = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

import {createControlTemplate} from './control.js';
import {createFiltersTemplate} from './filter.js';
import {createBoardTemplate} from './board.js';
import {createCardTemplate, createEditCardTemplate} from './tasks.js';

controlContainer.insertAdjacentHTML(`beforeend`, createControlTemplate());
main.insertAdjacentHTML(`beforeend`, createFiltersTemplate());
main.insertAdjacentHTML(`beforeend`, createBoardTemplate());

const taskContainer = main.querySelector(`.board__tasks`);

taskContainer.insertAdjacentHTML(`beforeend`, createEditCardTemplate());


for (let i = 0; i < CARDS_TO_DISPLAY; i++) {
  taskContainer.insertAdjacentHTML(`beforeend`, createCardTemplate());
}
