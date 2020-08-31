import {
  CARDS_TO_DISPLAY,
  EMPTY_MESSAGE,
  SortType,
} from '../consts.js';

import MainBoardView from '../view/main-board.js';
import SortListView from '../view/sort-list.js';
import TasksBoardView from '../view/tasks-board.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import EmptyBoardNotificationView from '../view/empty-board-message.js';
import TaskPresenter from './task.js';
import {renderLastPlaceElement} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {sortTasksAscOrder, sortTasksDescOrder} from '../utils/tasks.js';

export default class BoardPresenter {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;
    this._tasks = null;
    this._sourcedTasks = null; // immutable tasks instance
    this._mainBoard = new MainBoardView();
    this._sortList = new SortListView();
    this._taskBoard = new TasksBoardView();
    this._loadMoreBtn = null;
    this._emptyBoardNotification = new EmptyBoardNotificationView(EMPTY_MESSAGE);
    this._lastTaskIndex = 0;

    // {id: presenter}
    this._taskPresenter = {};

<<<<<<< HEAD
    // Bind Handlers
=======
    // TaskChangeHandlers
    this._loadMoreBtnClickHandler = this._renderTaskSlice.bind(this);
>>>>>>> 9f73f3562b85cecb59ed6134a8d217cca5852c1a
    this._taskChangeHandler = this._taskChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._loadMoreBtnClickHandler = this._renderTaskSlice.bind(this);
    this._sortByTypeClickHandler = this._sortByTypeClickHandler.bind(this);
  }

  init(tasks) {
    this._tasks = tasks;
    this._sourcedTasks = tasks;

    this._renderMainBoard();

    if (this._tasks.length === 0) {
      this._renderNotification();
      return;
    }

    this._renderSortList();
    this._renderTaskSlice();
    this._renderTaskBoard();

    if (this._tasks.length > this._lastTaskIndex) {
      this._renderLoadMoreButton();
    }
  }

  _renderSortList() {
    renderLastPlaceElement(this._mainBoard, this._sortList);
    this._sortList.setSortClickHandler(this._sortByTypeClickHandler);
  }

  _sortByTypeClickHandler(sortType) {
    this._sortTasksList(sortType);
    this._renderSortedTaskSlice();
  }

  _renderSortedTaskSlice() {
    const lastIndex = this._lastTaskIndex;
    this._clearTaskBoard();
    this._tasks
      .slice(0, lastIndex)
      .forEach((task) => this._renderTask(task));
  }

  _sortTasksList(order) {
    switch (order) {
      case SortType.ASC:
        this._tasks.sort(sortTasksAscOrder);
        break;
      case SortType.DESC:
        this._tasks.sort(sortTasksDescOrder);
        break;
      default:
        this._tasks = this._sourcedTasks.slice();
    }
  }

  _modeChangeHandler() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderMainBoard() {
    renderLastPlaceElement(this._mainContainer, this._mainBoard);
  }

  _renderTaskBoard() {
    renderLastPlaceElement(this._mainBoard, this._taskBoard);
  }

  _renderNotification() {
    renderLastPlaceElement(this._mainBoard, this._emptyBoardNotification);
  }

  _renderLoadMoreButton() {
    this._loadMoreBtn = new LoadMoreButtonView();
    this._loadMoreBtn.setClickHandler(this._loadMoreBtnClickHandler);
    renderLastPlaceElement(this._mainBoard, this._loadMoreBtn);
  }

  _removeLoadMoreButton() {
    if (this._loadMoreBtn) {
      this._loadMoreBtn.removeClickHandler();
      this._loadMoreBtn.getElement().remove();
      this._loadMoreBtn.resetElement();
    }
  }

  _renderTaskSlice() {
    const sliceStep = this._lastTaskIndex + CARDS_TO_DISPLAY;
    this._tasks
      .slice(this._lastTaskIndex, sliceStep)
      .forEach((task) => this._renderTask(task));

    if (this._lastTaskIndex === this._tasks.length) {
      this._removeLoadMoreButton();
    }
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(
        this._taskBoard,
        this._taskChangeHandler,
        this._modeChangeHandler
    );
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
    this._lastTaskIndex++;
  }

  _taskChangeHandler(updatedTask) {
    this._tasks = updateItem(this._tasks, updatedTask);
    this._sourcedTasks = updateItem(this._sourcedTasks, updatedTask);
    this._taskPresenter[updatedTask.id].init(updatedTask);
  }

  _clearTaskBoard() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetTask());
    this._taskPresenter = {};
    this._lastTaskIndex = 0;
  }
}
