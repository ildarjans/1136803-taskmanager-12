import AbstractView from './Abstract.js';
// import {FilterType} from '../consts.js';

function createFiltersTemplate(filters, currentType) {
  return (
    `<section class="main__filter filter container">
    ${createFilterContent(filters, currentType)}
  </section>`
  );
}

function createFilterContent(filters, currentType) {
  return filters.map((filter) => {
    const {type, name, count} = filter;
    return `
    <input
      type="radio"
      id="filter__${type}"
      class="filter__input visually-hidden"
      name="filter"
      value="${type}"
      ${type === currentType ? `checked` : ``}
      ${count ? `` : `disabled`}
    />
    <label for="filter__${type}" class="filter__label">
      ${name}
      <span class="filter__all-count">
        ${count}
      </span>
    </label>`;
  }).join(``);
}

export default class FiltersView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  setFilterClickHandler(cb) {
    this._callbacks.filterClick = cb;
    this.getElement().addEventListener(`change`, this._filterClickHandler);
  }

  _filterClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.filterClick(evt.target.value);
  }

  _getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

}
