import AbstractView from './Abstract.js';
export default class LoadMoreButtonView extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callbacks.click();
  }

  setClickHandler(cb) {
    this._callbacks.click = cb;
    this
      .getElement()
      .addEventListener(`click`, this._clickHandler);
  }

  removeClickHandler() {
    this
    .getElement()
    .removeEventListener(`click`, this._clickHandler);
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
}
