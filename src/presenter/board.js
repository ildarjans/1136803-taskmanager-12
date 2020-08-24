import {
  CARDS_TO_DISPLAY,
  EMPTY_MESSAGE
} from '../consts.js';

import SiteMenuView from '../view/site-menu.js';
import MainBoardView from '../view/main-board.js';
import SortListView from '../view/sort-list.js';
import TasksBoardView from '../view/tasks-board.js';
import FiltersView from '../view/tasks-filter.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import TaskView from '../view/task-card.js';
import TaskEditView from '../view/task-edit-card.js';
import EmptyBoardNotificationView from '../view/empty-board-message.js';
import {
  getFilterTitlesArray
} from '../mock/filters.js';
import {
  renderLastPlaceElement,
  getAbstractClassDOMElement
} from '../render.js';

export default class BoardPresenter {
  constructor(mainContainer, menuContainer) {
    this._mainContainer = mainContainer;
    this._menuContainer = menuContainer;
    this._tasks = null;
    this._filters = null;
    this._siteMenu = new SiteMenuView();
    this._mainBoard = new MainBoardView();
    this._sortList = new SortListView();
    this._taskBoard = new TasksBoardView();
    this._loadMoreBtn = null;
    this._emptyBoardNotification = new EmptyBoardNotificationView(EMPTY_MESSAGE);
    this._loadMoreBtnClickHandler = this._renderTaskSlice.bind(this);
    this._lastTaskIndex = 0;
  }

  init(tasks) {
    this._tasks = tasks;
    this._renderSiteMenu();
    this._renderFilters();
    this._renderMainBoard();

    if (this._tasks.length === 0) {
      this._renderNotification();
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

  _renderSiteMenu() {
    renderLastPlaceElement(this._menuContainer, this._siteMenu);
  }

  _renderFilters() {
    const filterTitles = getFilterTitlesArray(this._tasks);
    this._filters = new FiltersView(filterTitles);
    renderLastPlaceElement(this._mainContainer, this._filters);
  }

  _renderNotification() {
    renderLastPlaceElement(this._mainBoard, this._emptyBoardNotification);
  }

  _renderTaskComponent(container, task) {
    const taskCard = new TaskView(task);
    const taskEditCard = new TaskEditView(task);

    container = getAbstractClassDOMElement(container);

    renderLastPlaceElement(container, taskCard);

    function switchToEditForm() {
      container
        .getElement()
        .replaceChild(
            taskEditCard.getElement(),
            taskCard.getElement()
        );
      window.addEventListener(`keydown`, windowEscapeHandler);
    }

    function switchToCard() {
      container
        .getElement()
        .replaceChild(
            taskCard.getElement(),
            taskEditCard.getElement()
        );
      window.removeEventListener(`keydown`, windowEscapeHandler);
    }

    function windowEscapeHandler(evt) {
      if (evt.key === `Escape`) {
        switchToCard();
      }
    }

    taskCard.setClickHandler(switchToEditForm);
    taskEditCard.setEscapeHandler(switchToCard);

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
        this._renderTaskComponent(this._taskBoard, task);
        this._lastTaskIndex++;
      });
s
    if (this._lastTaskIndex === this._tasks.length) {
      this._removeLoadMoreButton();
    }
  }
}
