import AbstractView from './Abstract.js';

export default class SmartView extends AbstractView {
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

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`This class doesn't contains any handler`);
  }
}
