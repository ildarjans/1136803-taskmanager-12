import {getDeadlineDateString, getDeadlineTimeString} from '../utilities.js';
import {dateFormatOptions, timeFormatOptions} from '../consts.js';
import AbstractView from './Abstract.js';

export default class TaskView extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callbacks.click();
  }

  setClickHandler(cb) {
    this._callbacks.click = cb;
    this.getElement().addEventListener(`click`, this._clickHandler);
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

    const dueDateString = dueDate ? getDeadlineDateString(dueDate, dateFormatOptions) : ``;

    const dueTimeString = dueDate ? getDeadlineTimeString(dueDate, timeFormatOptions) : ``;

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
                    <span class="card__time">${dueTimeString}</span>
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


