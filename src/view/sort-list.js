import AbstractView from './Abstract.js';
import {SortType} from '../consts.js';

export default class SortListView extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  setSortClickHandler(cb) {
    this._callbacks.click = cb;
    this.getElement()
      .addEventListener(`click`, this._sortClickHandler);
  }

  _getTemplate() {
    return (
      `<div class="board__filter-list">
        <a 
          href="#"
          class="board__filter ${this._currentSortType === SortType.DEFAULT ? `board__filter--active` : ``}" 
          data-sort-type="${SortType.DEFAULT}"
        >
        SORT BY DEFAULT
        </a>
        <a  
          href="#" 
          class="board__filter ${this._currentSortType === SortType.ASC ? `board__filter--active` : ``}" 
          data-sort-type="${SortType.ASC}"
        >
        SORT BY DATE up
        </a>
        <a 
          href="#" 
          class="board__filter ${this._currentSortType === SortType.DESC ? `board__filter--active` : ``}" 
          data-sort-type="${SortType.DESC}"
        >
        SORT BY DATE down
        </a>
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


}
