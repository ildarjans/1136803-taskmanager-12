'use strict';
const CARDS_TO_DISPLAY = 3;
const main = document.querySelector(`.main`);

const createNavTemplate = window.nav.createNavTemplate;
const createBoardTemplate = window.board.createBoardTemplate;
const {createTaskCard, createTaskEditCard} = window.tasks;

main.insertAdjacentHTML(`beforeend`, createNavTemplate());
main.insertAdjacentHTML(`beforeend`, createBoardTemplate());

const taskContainer = main.querySelector(`.board__tasks`);

taskContainer.insertAdjacentHTML(`beforeend`, createTaskEditCard());

for (let i = 0; i < CARDS_TO_DISPLAY; i++) {
  taskContainer.insertAdjacentHTML(`beforeend`, createTaskCard());
}
