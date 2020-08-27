import AbstractView from './Abstract.js';

function createFiltersTemplate(filterTitles) {
  return (
    `<section class="main__filter filter container">
    ${createFilterContent(filterTitles)}
  </section>`
  );
}

function createFilterContent(filters) {
  return filters.map((filter) => {
    return `
    <input
      type="radio"
      id="filter__${filter.title}"
      class="filter__input visually-hidden"
      name="filter"
      ${filter.title === `all` ? `checked` : ``}
      ${filter.count ? `` : `disabled`}
    />
    <label for="filter__all" class="filter__label">
      ${filter.title}
      <span class="filter__all-count">
        ${filter.count}
      </span>
    </label>`;
  }).join(``);
}

export default class FiltersView extends AbstractView {
  constructor(titles) {
    super();
    this._titles = titles;
  }

  _getTemplate() {
    return createFiltersTemplate(this._titles);
  }
}
