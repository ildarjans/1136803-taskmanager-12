import {getTaskDateFormatString} from '../utils/tasks.js';
import AbstractView from './Abstract.js';

export default class TaskView extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.editClick();
  }

  _archiveClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.archiveClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.favoriteClick();
  }

  setEditClickHandler(cb) {
    this._callbacks.editClick = cb;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  setArchiveClickHandler(cb) {
    this._callbacks.archiveClick = cb;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._archiveClickHandler);
  }

  setFavoriteClickHandler(cb) {
    this._callbacks.favoriteClick = cb;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _getTemplate() {
    const {
      description,
      color,
      isFavorite,
      isArchive,
      dueDate
    } = this._task;

    const isRepeat = dueDate === null ? `card--repeat` : ``;

    const dueDateString = dueDate ? getTaskDateFormatString(dueDate) : ``;

    const deadlineClass = dueDate && dueDate < new Date() ? `card--deadline` : ``;

    const archiveClass = !isArchive ? `card__btn--disabled` : ``;

    const favoriteClass = !isFavorite ? `card__btn--disabled` : ``;

    return (
      `<article class="card card--${color} ${isRepeat} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button"
              class="card__btn card__btn--archive ${archiveClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${favoriteClass}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}.</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${dueDateString}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
    );
  }

}


