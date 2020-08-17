import {
  CARDS_TO_DISPLAY
} from './consts.js';

export function renderContent(
    container,
    content,
    place = `beforeend`
) {
  container.insertAdjacentHTML(place, content);
}

export function renderCardTemplates(
    container,
    tasks,
    template,
    place = `beforeend`
) {
  let lastIndex = 0;
  return (manualStep = 0, manualTemplate = template) => {

    if (lastIndex < tasks.length) {

      const sliceStep = manualStep || CARDS_TO_DISPLAY;

      tasks
      .slice(lastIndex, lastIndex + sliceStep)
      .forEach((task) => {
        renderContent(container, manualTemplate(task, place));
      });

      lastIndex = lastIndex + sliceStep;
    }
  };
}
