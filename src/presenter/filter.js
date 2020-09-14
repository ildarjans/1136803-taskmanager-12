import FiltersView from '../view/tasks-filter.js';
import {FilterType, UpdateType} from '../consts.js';
import {isTaskExpired, isTaskExpiredToday, isTaskRepeating} from '../utils/tasks.js';
import {renderLastPlaceElement, removeElement, replaceDOMElement} from '../utils/render.js';

export default class FilterPresenter {
  constructor(filterContainer, filterModel, tasksModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;

    this._filterView = null;
    this._activeFilter = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._tasksModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);
  }

  init() {
    this._activeFilter = this._filterModel.getFilter();
    const filters = this._getFilters();

    const prevFilters = this._filterView;
    this._filterView = new FiltersView(filters, this._activeFilter);
    this._filterView.setFilterClickHandler(this._filterChangeHandler);

    if (prevFilters === null) {
      renderLastPlaceElement(this._filterContainer, this._filterView);
      return;
    }

    replaceDOMElement(this._filterView, prevFilters);
    removeElement(prevFilters);
  }

  _filterChangeHandler(filterType) {
    if (filterType === this._activeFilter) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const tasks = this._tasksModel.getTasks();
    return Object.values(FilterType).map((type) => {
      return {
        type,
        name: type,
        count: FilterPresenter.getFilteredTasks(tasks, type).length
      };
    });
  }

  _modelEventHandler() {
    this.init();
  }

  static getFilteredTasks(tasks, type) {
    switch (type) {
      case FilterType.ALL:
        return tasks.filter((task) => !task.isArchive);
      case FilterType.ARCHIVE:
        return tasks.filter((task) => task.isArchive);
      case FilterType.FAVORITE:
        return tasks.filter((task) => task.isFavorite);
      case FilterType.OVERDUE:
        return tasks.filter((task) => isTaskExpired(task.dueDate));
      case FilterType.TODAY:
        return tasks.filter((task) => isTaskExpiredToday(task.dueDate));
      case FilterType.REPEATING:
        return tasks.filter((task) => isTaskRepeating(task.repeating));
      default:
        return tasks;
    }
  }
}
