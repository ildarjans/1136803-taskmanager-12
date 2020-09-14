import Observer from "../utils/observer.js";

export default class TasksModel extends Observer {
  constructor() {
    super();
    this._tasks = [];
  }

  addTask(updateType, update) {
    this._tasks = [
      update,
      ...this._tasks
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this._tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._tasks.splice(index, 1);

    this._notify(updateType);
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = tasks.slice();
  }

  updateTask(updateType, update) {
    const index = this._tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexicting task`);
    }

    this._tasks.splice(index, 1, update);

    this._notify(updateType, update);
  }

}
