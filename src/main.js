'use strict';
const CARDS_TO_DISPLAY = 3;
const main = document.querySelector('.main');

import {createNavTemplate} from './nav.js';

import {createBoardTemplate} from './board.js';

import {createTaskCard, createTaskEditCard} from './tasks.js';

main.insertAdjacentHTML('beforeend', createNavTemplate());
main.insertAdjacentHTML('beforeend', createBoardTemplate());

const taskContainer = main.querySelector('.board__tasks');

taskContainer.insertAdjacentHTML('beforeend', createTaskEditCard());

for (let i = 0; i < CARDS_TO_DISPLAY; i++) {
  taskContainer.insertAdjacentHTML('beforeend', createTaskCard());
}

