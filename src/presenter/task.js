import TaskView from '../view/task.js';
import TaskEditView from '../view/task-edit.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement
} from '../utils/render.js';

import {TaskMode as Mode} from '../consts.js';

export default class TaskPresenter {
  constructor(taskListContainer, changeData, changeMode) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;
    this._task = null;

    this._taskComponent = null;
    this._taskFormComponent = null;

    this._bindInnerHandlers();

  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskFormComponent = this._taskFormComponent;

    this._taskComponent = new TaskView(task);
    this._taskFormComponent = new TaskEditView(task);

    this._setInnerHandlers();

    if (!prevTaskComponent || !prevTaskFormComponent) {
      renderLastPlaceElement(this._taskListContainer, this._taskComponent);
      return;
    }

    switch (this._mode) {
      case Mode.DEFAULT:
        replaceDOMElement(this._taskComponent, prevTaskComponent);
        break;
      case Mode.EDIT:
        replaceDOMElement(this._taskFormComponent, prevTaskFormComponent);
        break;
    }

    removeElement(prevTaskComponent);
    removeElement(prevTaskFormComponent);

  }

  _setInnerHandlers() {
    this._taskComponent.setArchiveClickHandler(this._archiveClickHandler);
    this._taskComponent.setEditClickHandler(this._editClickHandler);
    this._taskComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._taskFormComponent.setFormSubmitHandler(this._formSubmitClickHandler);
  }

  _bindInnerHandlers() {
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitClickHandler = this._formSubmitClickHandler.bind(this);
    this._documentEscapeHandler = this._documentEscapeHandler.bind(this);
  }

  _archiveClickHandler() {
    this._changeData(
        Object.assign(
            this._task,
            {
              isArchive: !this._task.isArchive
            }
        )
    );
  }

  _favoriteClickHandler() {
    this._changeData(
        Object.assign(
            this._task,
            {
              isFavorite: !this._task.isFavorite
            }
        )
    );
  }

  _editClickHandler() {
    this._replaceCardToForm();
  }

  _documentEscapeHandler(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._taskFormComponent.reset(this._task);
      this._replaceFormToCard();
    }
  }

  _formSubmitClickHandler(task) {
    this._changeData(task);
    this._replaceFormToCard();
  }

  _replaceCardToForm() {
    replaceDOMElement(this._taskFormComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._documentEscapeHandler);
    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _replaceFormToCard() {
    replaceDOMElement(this._taskComponent, this._taskFormComponent);
    document.removeEventListener(`keydown`, this._documentEscapeHandler);
    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode === Mode.EDIT) {
      this._replaceFormToCard();
    }
  }

  resetTask() {
    removeElement(this._taskComponent);
    removeElement(this._taskFormComponent);
  }

}
