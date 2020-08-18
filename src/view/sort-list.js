import {createDOMElement} from '../render.js';

function createSortTemplate() {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
    </div>`
  );
}

export default class SortList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createSortTemplate();
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
