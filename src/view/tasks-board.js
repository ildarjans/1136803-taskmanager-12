import AbstractView from './Abstract.js';

export default class TasksBoardView extends AbstractView {
  _getTemplate() {
    return (
      `<div class="board__tasks">
      </div>`
    );
  }
}
