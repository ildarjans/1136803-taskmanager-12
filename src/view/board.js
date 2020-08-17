import {createLoadMoreButton} from './load-more-button.js';
export function createBoardTemplate(isOverflow) {
  return (
    `<section class="board container">
      ${createBoardSortTemplate()}
      ${createTaskContainer()}
      ${isOverflow ? createLoadMoreButton() : ``}
    </section>`
  );
}

function createBoardSortTemplate() {
  return (
    `<div class="board__filter-list">
    <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
    <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
    <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
  </div>`
  );
}

function createTaskContainer() {
  return (
    `<div class="board__tasks">
    </div>`
  );
}
