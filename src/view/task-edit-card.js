import Smart from './smart.js';
import {getDeadlineDateString} from '../utils/common.js';
import {extendedDateFormatOptions, COLORS} from '../consts.js';
import {isTaskRepeating} from '../utils/tasks.js';


export default class TaskEditView extends Smart {
  constructor(task) {
    super();
    this._data = TaskEditView.parseTaskToData(task);

    this._dueDateClickHandler = this._dueDateClickHandler.bind(this);
    this._repeatingClickHandler = this._repeatingClickHandler.bind(this);
    this._daysRepeatingHandler = this._daysRepeatingHandler.bind(this);
    this._colorChangeHandler = this._colorChangeHandler.bind(this);
    this._descriptionChangeHandler = this._descriptionChangeHandler.bind(this);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();

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


  setFormSubmitHandler(cb) {
    this._callbacks.formSubmit = cb;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callbacks.formSubmit);
  }

  reset(task) {
    this.updateData(TaskEditView.parseTaskToData(task));
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

  _colorChangeHandler(evt) {
    this.updateData({
      color: evt.target.value
    });
  }

  _dueDateClickHandler() {
    this.updateData({
      hasDateDue: !this._data.hasDateDue
    });
  }

  _repeatingClickHandler() {
    this.updateData({
      isRepeating: !this._data.isRepeating
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callbacks.formSubmit(TaskEditView.parseTaskToData(this._data));
  }

  _getTemplate() {
    return createEditCardTemplate(this._data);
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

  const deadlineDate = dueDate !== null ? getDeadlineDateString(dueDate, extendedDateFormatOptions) : ``;
  const repeatClass = isRepeating ? `card--repeat` : ``;
  return (
    `<article class="card card--edit ${repeatClass} card--${color}">
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
            >${description}
            </textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${hasDateDue ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${hasDateDue ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 SEPTEMBER 16:15"
                    name="date"
                    value="${deadlineDate}"
                  />
                </label>
              </fieldset>

              <button
                type="button"
                class="card__repeat-toggle"
              >
                repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${hasDateDue ? `disabled` : ``}>
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
          <button class="card__save" type="submit">save</button>
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
