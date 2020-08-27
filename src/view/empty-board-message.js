import {createDOMElement} from '../utils/render.js';

export default class EmptyBoardNotificationView {
  constructor(message) {
    this._element = null;
    this._message = message;
  }

  _getFiltersTemplate() {
    return (
      `<p class="board__no-tasks">
        ${this._message}
      </p>`);
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this._getFiltersTemplate());
    }
    return this._element;
  }

  resetElement() {
    this._element = null;
  }
}
