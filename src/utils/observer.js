export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter(
        (eachObserver) => eachObserver !== observer
    );
  }

  _notify(updateType, updateData) {
    this._observers.forEach((observer) => observer(updateType, updateData));
  }
}
