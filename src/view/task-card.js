import {getDeadlineDateString, getDeadlineTimeString} from '../utilities.js';
import {dateFormatOptions, timeFormatOptions} from '../consts.js';
import {createDOMElement} from '../render.js';

function createCardTemplate(task) {
  const {
    description,
    color,
    isFavorite,
    isArchive,
    dueDate
  } = task;

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

export default class Task {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  _getTemplate() {
    return createCardTemplate(this._task);
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


