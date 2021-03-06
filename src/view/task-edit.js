import SmartView from './smart.js';
import {getTaskDateFormatString} from '../utils/tasks.js';
import {COLORS, BLANK_TASK} from '../consts.js';
import {isTaskRepeating} from '../utils/tasks.js';
import flatpickr from 'flatpickr';
import he from 'he';

import "../../node_modules/flatpickr/dist/flatpickr.min.css";


export default class TaskEditView extends SmartView {
  constructor(task = BLANK_TASK) {
    super();
    this._data = TaskEditView.parseTaskToData(task);
    this._datepicker = null;

    this._bindInnerHandlers();
    this._setInnerHandlers();

  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  restoreHandlers() {
    this._setDatepicker();
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callbacks.formSubmit);
    this.setDeleteClickHandler(this._callbacks.delete);
  }

  reset(task) {
    this.updateData(TaskEditView.parseTaskToData(task));
  }

  setFormSubmitHandler(cb) {
    this._callbacks.formSubmit = cb;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setDeleteClickHandler(cb) {
    this._callbacks.delete = cb;
    this.getElement()
      .querySelector(`.card__delete`)
      .addEventListener(`click`, this._deleteClickHandler);
  }

  _bindInnerHandlers() {
    this._dueDateClickHandler = this._dueDateClickHandler.bind(this);
    this._repeatingClickHandler = this._repeatingClickHandler.bind(this);
    this._daysRepeatingHandler = this._daysRepeatingHandler.bind(this);
    this._colorChangeHandler = this._colorChangeHandler.bind(this);
    this._descriptionChangeHandler = this._descriptionChangeHandler.bind(this);
    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setDatepicker();
    this._setInnerHandlers();

  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.delete(TaskEditView.parseDataToTask(this._data));
  }

  _colorChangeHandler(evt) {
    this.updateData({
      color: evt.target.value
    });
  }

  _daysRepeatingHandler(evt) {
    const day = evt.target.value;
    const repeat = evt.target.checked;
    const repeating = Object.assign(
        {},
        this._data.repeating,
        {
          [day]: repeat
        }
    );
    this.updateData({repeating});
  }

  _descriptionChangeHandler(evt) {
    evt.preventDefault();
    const desc = evt.target.value;
    this.updateData({
      description: desc ? desc.trim() : desc
    }, true);
  }

  _dueDateClickHandler() {
    if (!this._data.isRepeating) {
      this.updateData({
        hasDateDue: !this._data.isRepeating ? !this._data.hasDateDue : false
      });
    }
  }

  _dueDateChangeHandler(selectedDate) {
    this.updateData({
      dueDate: selectedDate[0]
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callbacks.formSubmit(TaskEditView.parseDataToTask(this._data));
  }

  _getTemplate() {
    return createEditCardTemplate(this._data);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.hasDateDue) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`.card__date`),
          {
            dateFormat: `j F`,
            defaultDate: this._data.dueDate,
            onChange: this._dueDateChangeHandler
          }
      );
    }
  }

  _setInnerHandlers() {

    this.getElement()
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._dueDateClickHandler);

    this.getElement()
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._repeatingClickHandler);

    this.getElement()
      .querySelector(`.card__text`)
      .addEventListener(`change`, this._descriptionChangeHandler);

    this.getElement()
      .querySelector(`.card__colors-wrap`)
      .addEventListener(`change`, this._colorChangeHandler);

    this.getElement()
      .querySelector(`.card__repeat-days-inner`)
      .addEventListener(`change`, this._daysRepeatingHandler);

  }

  _repeatingClickHandler() {
    if (!this._data.hasDateDue) {
      this.updateData({
        isRepeating: !this._data.isRepeating
      });
    }
  }

  static parseTaskToData(task) {
    return Object.assign(
        {},
        task,
        {
          hasDateDue: task.dueDate !== null,
          isRepeating: isTaskRepeating(task.repeating)
        }
    );
  }

  static parseDataToTask(data) {

    if (!data.hasDateDue) {
      data.dueDate = null;
    }

    if (!data.isRepeating) {
      data.repeating = {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false
      };
    }

    delete data.hasDateDue;
    delete data.isRepeating;

    return data;

  }

}


function createEditCardTemplate(data) {
  const {
    description,
    color,
    repeating,
    isRepeating,
    hasDateDue,
    dueDate,
  } = data;

  const isValidDeadlineField = data.hasDateDue && data.dueDate;
  const isValidRepeatDaysField = data.isRepeating && isTaskRepeating(data.repeating);
  return (
    `<article class="card card--edit ${isRepeating ? `card--repeat` : ``} card--${color}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${he.encode(description)}
            </textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${!isRepeating && hasDateDue ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${!isRepeating && hasDateDue ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 SEPTEMBER"
                    name="date"
                    value="${getTaskDateFormatString(dueDate)}"
                  />
                </label>
              </fieldset>

              <button
                type="button"
                class="card__repeat-toggle"
              >
                repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${!isRepeating ? `disabled` : ``}>
                <div class="card__repeat-days-inner">
                  ${isRepeating ? createDayRepeatingTemplate(repeating) : ``}
                </div>
              </fieldset>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${createTaskMarkupColorTemplate(color)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit"${!isValidDeadlineField && !isValidRepeatDaysField ? `disabled` : ``}>save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );

}


function createDayRepeatingTemplate(repeating) {
  return Object.entries(repeating).map((day) => {
    return `\
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day[0]}-1"
      name="repeat"
      value="${day[0]}"
      ${day[1] ? `checked` : ``}
    />
    <label class="card__repeat-day"
      for="repeat-${day[0]}-1" >
      ${day[0]}
    </label>
    `;
  }).join(``);
}

function createTaskMarkupColorTemplate(selectedColor) {
  return COLORS.map((color) => {
    return `<input
    type="radio"
    id="color-${color}-1"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${color === selectedColor ? `checked` : ``}
  />
  <label
    for="color-${color}-1"
    class="card__color card__color--${color}"
    >${color}</label
  >`;
  }).join(``);
}
