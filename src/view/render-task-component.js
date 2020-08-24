import TaskView from './task-card.js';
import TaskEditView from './task-edit-card.js';
import {renderElement} from '../render.js';

export function renderTaskComponent(container, task) {
  const taskCard = new TaskView(task);
  const taskEditCard = new TaskEditView(task);
  renderElement(container, taskCard.getElement());

  function switchToEditForm() {
    container.replaceChild(taskEditCard.getElement(), taskCard.getElement());
    window.addEventListener(`keydown`, windowEscapeHandler);
  }
  function switchToCard() {
    container.replaceChild(taskCard.getElement(), taskEditCard.getElement());
    window.removeEventListener(`keydown`, windowEscapeHandler);
  }

  function windowEscapeHandler(evt) {
    if (evt.key === `Escape`) {
      switchToCard();
    }
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
