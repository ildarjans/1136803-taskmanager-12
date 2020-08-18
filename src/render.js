export function renderContent(
    container,
    content,
    place = `beforeend`
) {
  container.insertAdjacentHTML(place, content);
}

export function renderElement(container, element, place = `beforeend`) {
  if (place === `beforeend`) {
    container.append(element);
    return;
  }
  if (place === `afterbegin`) {
    container.prepend(element);
    return;
  }
}

export function createDOMElement(content) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = content;

  return wrapper.firstChild;
}
