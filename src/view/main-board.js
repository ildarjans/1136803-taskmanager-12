import {createDOMElement} from '../render.js';

export default class MainBoardView {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<section class="board container">
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this._getTemplate());
    }
    return this._element;
  }

  resetElement() {
    this._element = null;
  }
}
