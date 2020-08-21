import {createDOMElement} from '../render.js';

export default class LoadMoreButtonView {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<button
        class="load-more"
        type="button"
      >
        load more
      </button>`
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
