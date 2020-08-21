import {createDOMElement} from '../render.js';

export default class TasksBoardView {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<div class="board__tasks">
      </div>`
    );
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
