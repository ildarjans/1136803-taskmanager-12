import TaskEditView from '../view/task-edit.js';
import {generateId} from '../mock/tasks.js';
import {UserAction, UpdateType} from '../consts.js';
import {
  removeElement,
  renderFirstPlaceElement,
} from '../utils/render.js';

export default class NewTaskPresenter {
  constructor(tasksContainer, changeData) {
    this._tasksContainer = tasksContainer;
    this._changeData = changeData;

    this._taskEditComponent = null;
    this._destroyCallback = null;
    this._setInnerHandlers();

  }

  init(cb) {
    this._destroyCallback = cb;
    if (this._taskEditComponent) {
      return;
    }

    this._taskEditComponent = new TaskEditView();
    this._taskEditComponent.setFormSubmitHandler(this._submitClickHandler);
    this._taskEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    renderFirstPlaceElement(this._tasksContainer, this._taskEditComponent);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (!this._taskEditComponent) {
      return;
    }

    if (this._destroyCallback) {
      this._destroyCallback();
    }

    removeElement(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener(`keyddown`, this._escKeyDownHandler);

  }

  _deleteClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _setInnerHandlers() {
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  _submitClickHandler(task) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MAJOR,
        Object.assign(task, {id: generateId()})
    );

    this.destroy();
  }

}
