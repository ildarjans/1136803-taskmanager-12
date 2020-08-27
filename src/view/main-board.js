import AbstractView from './Abstract.js';

export default class MainBoardView extends AbstractView {
  _getTemplate() {
    return (
      `<section class="board container">
      </section>`
    );
  }
}
