'use strict';


function createBoardTemplate() {
  return (
    `<section class="board container">
      ${createBoardSortTemplate()}
      ${createTaskContainer()}
      ${createLoadMoreButton()}
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

function createLoadMoreButton() {
  return (
    `<button
     class="load-more"
     type="button"
     >
     load more
     </button>
    `
  );
}


export {createBoardTemplate};

