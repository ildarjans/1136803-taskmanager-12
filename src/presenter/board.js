import {
  CARDS_TO_DISPLAY,
  EMPTY_MESSAGE,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
} from '../consts.js';

import MainBoardView from '../view/main-board.js';
import SortListView from '../view/sort-list.js';
import TasksBoardView from '../view/tasks-board.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import EmptyBoardNotificationView from '../view/empty-board-message.js';
import TaskPresenter from './task.js';
import FilterPresenter from './filter.js';
import NewTaskPresenter from './new-task.js';
import {renderLastPlaceElement, removeElement, renderFirstPlaceElement} from '../utils/render.js';

import {sortTasksAscOrder, sortTasksDescOrder} from '../utils/tasks.js';

export default class BoardPresenter {
  constructor(mainContainer, filterModel, tasksModel) {
    this._mainContainer = mainContainer;
    this._tasksModel = tasksModel;
    this._filterModel = filterModel;
    this._tasks = null;
    this._sourcedTasks = null; // immutable tasks instance
    this._mainBoard = new MainBoardView();
    this._sortList = null;
    this._taskBoard = new TasksBoardView();
    this._loadMoreBtn = null;
    this._emptyBoardNotification = null;
    this._lastTaskIndex = 0;
    this._currentSortType = SortType.DEFAULT;
    this._renderStep = CARDS_TO_DISPLAY;

    this._taskPresenter = {};

    this._bindInnerHandlers();

    this._tasksModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

    this._newTaskPresenter = new NewTaskPresenter(this._taskBoard, this._actionViewHandler);
  }

  init() {
    this._renderMainBoard();
    this._renderTaskBoard();

    this._renderBoard();
  }

  createTask() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(FilterType.ALL);
    this._newTaskPresenter.init();
  }

  _actionViewHandler(userAction, updateType, update) {
    switch (userAction) {
      case UserAction.UPDATE_TASK:
        this._tasksModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._tasksModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._tasksModel.deleteTask(updateType, update);
        break;
    }
  }

  _bindInnerHandlers() {
    this.createTask = this.createTask.bind(this);
    this._actionViewHandler = this._actionViewHandler.bind(this);
    this._clearTasksBoard = this._clearTasksBoard.bind(this);
    this._loadMoreBtnClickHandler = this._loadMoreBtnClickHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortByTypeClickHandler = this._sortByTypeClickHandler.bind(this);
  }

  _clearTasksBoard(resetLastTaskIndex, resetSortType) {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetTask());
    this._taskPresenter = {};

    removeElement(this._sortList);
    removeElement(this._emptyBoardNotification);
    removeElement(this._loadMoreBtn);

    if (resetLastTaskIndex) {
      this._lastTaskIndex = 0;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _getTasks() {
    const filterType = this._filterModel.getFilter();
    const tasks = this._tasksModel.getTasks();
    const filteredTasks = FilterPresenter.getFilteredTasks(tasks, filterType);
    switch (this._currentSortType) {
      case SortType.ASC:
        return filteredTasks.sort(sortTasksAscOrder);
      case SortType.DESC:
        return filteredTasks.sort(sortTasksDescOrder);
    }
    return filteredTasks;
  }

  _loadMoreBtnClickHandler() {
    const tasksCount = this._getTasks().length;
    const nextTasksSliceLength = Math.min(tasksCount, this._lastTaskIndex + CARDS_TO_DISPLAY);
    const tasks = this._getTasks().slice(this._lastTaskIndex, nextTasksSliceLength);

    this._renderTasks(tasks);

    if (nextTasksSliceLength >= tasksCount) {
      removeElement(this._loadMoreBtn);
    }
  }

  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTasksBoard(true);
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTasksBoard(true, true);
        this._renderBoard();
        break;
    }
  }

  _modeChangeHandler() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderBoard() {
    const tasks = this._getTasks();
    const tasksCount = tasks.length;

    if (tasksCount === 0) {
      this._renderNotification();
      return;
    }

    this._renderSortList();

    this._renderTasks(tasks.slice(0, Math.min(tasksCount, this._renderStep)));

    if (tasksCount > this._lastTaskIndex) {
      this._renderLoadMoreButton();
    }
  }

  _renderMainBoard() {
    renderLastPlaceElement(this._mainContainer, this._mainBoard);
  }

  _renderTaskBoard() {
    renderLastPlaceElement(this._mainBoard, this._taskBoard);
  }

  _renderNotification() {
    this._emptyBoardNotification = new EmptyBoardNotificationView(EMPTY_MESSAGE);
    renderLastPlaceElement(this._mainBoard, this._emptyBoardNotification);
  }

  _renderLoadMoreButton() {
    this._loadMoreBtn = new LoadMoreButtonView();
    this._loadMoreBtn.setClickHandler(this._loadMoreBtnClickHandler);
    renderLastPlaceElement(this._mainBoard, this._loadMoreBtn);
  }

  _renderSortList() {
    this._sortList = null;
    this._sortList = new SortListView(this._currentSortType);
    this._sortList.setSortClickHandler(this._sortByTypeClickHandler);
    renderFirstPlaceElement(this._mainBoard, this._sortList);
  }

  _removeLoadMoreButton() {
    if (this._loadMoreBtn) {
      this._loadMoreBtn.removeClickHandler();
      this._loadMoreBtn.getElement().remove();
      this._loadMoreBtn.resetElement();
    }
  }

  _renderTasks(tasks) {
    tasks.forEach((task) => this._renderTask(task));
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(
        this._taskBoard,
        this._actionViewHandler,
        this._modeChangeHandler
    );
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
    this._lastTaskIndex++;
  }

  _sortByTypeClickHandler(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTasksBoard(true);
    this._renderBoard();
  }

}
