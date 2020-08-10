export function render(container, content, place = `beforeend`) {
  container.insertAdjacentHTML(place, content);
}

export function renderCardTemplates(container,
    tasks,
    template,
    step,
    exitFn,
    place = `beforeend`
) {
  let lastIndex = 0;
  return (manualStep = 0, manualTemplate = template) => {

    if (lastIndex < tasks.length) {

      const sliceStep = manualStep || step;
      const tasksSlice = tasks.slice(lastIndex, lastIndex + sliceStep);

      for (let i = 0; i < tasksSlice.length; i++) {
        render(container, manualTemplate(tasksSlice[i]), place);
      }

      lastIndex = lastIndex + sliceStep;

      if (lastIndex > tasks.length) {
        exitFn();
      }
    }
  };
}
