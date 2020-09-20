import AbstractView from './Abstract.js';
import {SiteMenuItem} from '../consts.js';

export default class SiteMenuView extends AbstractView {
  constructor() {
    super();

    this._menuChangeHandler = this._menuChangeHandler.bind(this);
  }

  setMenuChangeHandler(cb) {
    this._callbacks.menuChange = cb;
    this.getElement().addEventListener(`change`, this._menuChangeHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item) {
      item.checked = true;
    }
  }

  _getTemplate() {
    return (
      `<section class="control__btn-wrap">
        <input
          type="radio"
          name="control"
          id="control__new-task"
          class="control__input visually-hidden"
          value="${SiteMenuItem.ADD_NEW_TASK}"
        />
        <label for="control__new-task" class="control__label control__label--new-task"
          >+ ADD NEW TASK</label
        >
        <input
          type="radio"
          name="control"
          id="control__task"
          class="control__input visually-hidden"
          value="${SiteMenuItem.TASKS}"
          checked
        />
        <label for="control__task" class="control__label">TASKS</label>
        <input
          type="radio"
          name="control"
          id="control__statistic"
          class="control__input visually-hidden"
          value="${SiteMenuItem.STATISTICS}"
        />
        <label for="control__statistic" class="control__label"
          >STATISTICS</label
        >
      </section>`
    );
  }

  _menuChangeHandler(evt) {
    evt.preventDefault();
    this._callbacks.menuChange(evt.target.value);
  }

}
