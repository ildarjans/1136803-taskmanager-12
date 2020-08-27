import {
  CARDS_TO_DISPLAY,
  EMPTY_MESSAGE
} from '../consts.js';

import MainBoardView from '../view/main-board.js';
import SortListView from '../view/sort-list.js';
import TasksBoardView from '../view/tasks-board.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import EmptyBoardNotificationView from '../view/empty-board-message.js';
import TaskPresenter from './task.js';
import {renderLastPlaceElement} from '../utils/render.js';
import {updateItem} from '../utils/common.js';


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
    this._loadMoreBtnClickHandler = this._renderTaskSlice.bind(this);
    this._lastTaskIndex = 0;

    // {id: presenter}
    this._taskPresenter = {};

    // TaskChangeHandlers
    this._taskChangeHandler = this._taskChangeHandler.bind(this);
  }

  init(tasks) {
    this._tasks = tasks;
    this._sourcedTasks = tasks;

    this._renderMainBoard();

    if (this._tasks.length === 0) {
      this._renderNotification();
      return;
    }

    this._renderTaskSlice();
    this._renderTaskBoard();

    if (this._tasks.length > this._lastTaskIndex) {
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
      .forEach((task) => {
        this._renderTask(task);
        this._lastTaskIndex++;
      });

    if (this._lastTaskIndex === this._tasks.length) {
      this._removeLoadMoreButton();
    }
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._taskBoard, this._taskChangeHandler);
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
  }

  _taskChangeHandler(updatedTask) {
    this._tasks = updateItem(this._tasks, updatedTask);
    this._sourcedTasks = updateItem(this._sourcedTasks, updatedTask);
    this._taskPresenter[updatedTask.id].init(updatedTask);
  }

  _clearTaskBoard() {
    Object
      .value(this._taskPresenter)
      .forEach(
          (presenter) => presenter.reset()
      );
    this._taskPresenter = {};
    this._lastTaskIndex = 0;
  }
}
