import TaskView from '../view/task-card.js';
import TaskEditView from '../view/task-edit-card.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement,
  isParentContainElement
} from '../utils/render.js';

export default class TaskPresenter {
  constructor(taskListContainer) {
    this._taskListContainer = taskListContainer;

    this._taskComponent = null;
    this._taskFormComponent = null;

    // handlers [edit, submit, escape(close)]
    this._editClickHandler = null;
    this._formSubmitClickHandler = null;
    this._windowEscapeHandler = null;
  }

  init(task) {
    const prevTaskComponent = this._taskComponent;
    const prevTaskFormComponent = this._taskFormComponent;

    this._taskComponent = new TaskView(task);
    this._taskFormComponent = new TaskEditView(task);

    this._taskComponent.setClickHandler(this._replaceCardToForm);
    this._taskFormComponent.setEscapeHandler(this._replaceFormToCard);

    if (!prevTaskComponent || !prevTaskFormComponent) {
      renderLastPlaceElement(this._taskListContainer, this._taskComponent);
      return;
    }

    if (isParentContainElement(this._taskListContainer, this._taskComponent)) {
      replaceDOMElement(this._taskComponent, prevTaskComponent);
    }

    if (isParentContainElement(this._taskListContainer, this._taskFormComponent)) {
      replaceDOMElement(this._taskFormComponent, prevTaskFormComponent);
    }

    removeElement(prevTaskComponent);
    removeElement(prevTaskFormComponent);

  }

  _replaceCardToForm(evt) {
    evt.preventDefault();
    replaceDOMElement(this._taskFormComponent, this._taskComponent);
    window.addEventListener(`keydown`, this._windowEscapeHandler);
  }

  _replaceFormToCard(evt) {
    evt.preventDefault();
    replaceDOMElement(this._taskComponent, this._taskFormComponent);
    window.removeEventListener(`keydown`, this._windowEscapeHandler);
  }

  _windowEscapeHandler(evt) {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      this._replaceFormToCard();
    }
  }

  resetComponent() {
    removeElement(this._taskComponent);
    removeElement(this._taskFormComponent);
  }

}
