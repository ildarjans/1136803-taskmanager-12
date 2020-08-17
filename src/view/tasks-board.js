import {createDOMElement} from '../render.js';

function createTaskContainer() {
  return (
    `<div class="board__tasks">
    </div>`
  );
}

export default class TasksBoard {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTaskContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
