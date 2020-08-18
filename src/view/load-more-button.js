import {createDOMElement} from '../render.js';
function createLoadMoreButton() {
  return (
    `<button
        class="load-more"
        type="button"
      >
      load more
    </button>`
  );
}

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createLoadMoreButton();
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
