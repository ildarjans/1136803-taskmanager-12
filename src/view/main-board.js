import {createDOMElement} from '../render.js';

function createBoardTemplate() {
  return (
    `<section class="board container">
    </section>`
  );
}

export default class MainBoard {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createBoardTemplate();
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
