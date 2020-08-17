import {getDeadlineDateString} from '../utilities.js';

import {extendedDateFormatOptions, COLORS} from '../consts.js';

export function createEditCardTemplate(task) {
  const {
    description,
    color,
    repeatingDays,
    dueDate,
  } = task;

  const deadlineDate = dueDate ? getDeadlineDateString(dueDate, extendedDateFormatOptions) : ``;
  const isRepeatTask = dueDate ? `no` : `yes`;
  const hasDeadline = dueDate ? `yes` : `no`;
  const deadlineFieldsStatus = dueDate ? `` : `disabled`;
  const daysRepeatFieldsStatus = dueDate ? `disabled` : ``;

  return (
    `<article class="card card--edit card--${color}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg width="100%" height="10">
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
                date: <span class="card__date-status">${hasDeadline}</span>
              </button>

              <fieldset class="card__date-deadline" ${deadlineFieldsStatus}>
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
                repeat:<span class="card__repeat-status">${isRepeatTask}</span>
              </button>

              <fieldset class="card__repeat-days" ${daysRepeatFieldsStatus}>
                <div class="card__repeat-days-inner">
                  ${createDayRepeatingTemplate(repeatingDays)}
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

function createDayRepeatingTemplate(repeatingDays) {
  return Object.entries(repeatingDays).map((day) => {
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
