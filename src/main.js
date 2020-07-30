'use strict';
const CARDS_TO_DISPLAY = 3;
const main = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

const createControlTemplate = window.control.createTemplate;
const createFiltersTemplate = window.filters.createTemplate;
const createBoardTemplate = window.board.createBoardTemplate;
const {createCardTemplate, createEditCardTemplate} = window.tasks;

controlContainer.insertAdjacentHTML(`beforeend`, createControlTemplate());
main.insertAdjacentHTML(`beforeend`, createFiltersTemplate());
main.insertAdjacentHTML(`beforeend`, createBoardTemplate());

const taskContainer = main.querySelector(`.board__tasks`);

taskContainer.insertAdjacentHTML(`beforeend`, createEditCardTemplate());

for (let i = 0; i < CARDS_TO_DISPLAY; i++) {
  taskContainer.insertAdjacentHTML(`beforeend`, createCardTemplate());
}
