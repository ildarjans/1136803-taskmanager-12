import AbstractView from './Abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.resetElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    prevElement = null; // is it nessesary?
    this.restoreHandlers();
  }

  updateData(update, justDataUpdate) {
    if (!update) {
      return;
    }

    Object.assign(this._data, update);

    if (justDataUpdate) {
      return;
    }

    window.console.log(this._data);
    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`This class doesn't contains any handler`);
  }
}
