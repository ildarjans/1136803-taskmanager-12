import AbstractView from './Abstract.js';
import {SortType} from '../consts.js';

export default class SortListView extends AbstractView {
  constructor() {
    super();
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  _getTemplate() {
    return (
      `<div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="${SortType.ASC}">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="${SortType.DESC}">SORT BY DATE down</a>
      </div>`
    );
  }

  _sortClickHandler(evt) {
    const sortType = evt.target.dataset.sortType;
    if (sortType) {
      evt.preventDefault();
      this._callbacks.click(sortType);
    }
  }

  setSortClickHandler(cb) {
    this._callbacks.click = cb;
    this.getElement()
      .addEventListener(`click`, this._sortClickHandler);
  }
}
