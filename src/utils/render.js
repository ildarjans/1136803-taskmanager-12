import AbstractView from "../view/Abstract";

export function renderLastPlaceElement(container, element) {
  container = getAbstractClassDOMElement(container);
  element = getAbstractClassDOMElement(element);
  container.append(element);
}

export function renderFirstPlaceElement(container, element) {
  container = getAbstractClassDOMElement(container);
  element = getAbstractClassDOMElement(element);
  container.prepend(element);
}

export function createDOMElement(content) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = content;
  return wrapper.firstChild;
}

export function getAbstractClassDOMElement(element) {
  return element instanceof AbstractView ?
    element.getElement() :
    element;
}

export function replaceDOMElement(newChild, oldСhild) {
  newChild = getAbstractClassDOMElement(newChild);
  oldСhild = getAbstractClassDOMElement(oldСhild);
  const parent = oldСhild.parentElement;

  if (!parent || !newChild || !oldСhild) {
    throw new Error(`one of elements doesn't set`);
  }

  parent.replaceChild(newChild, oldСhild);
}

export function removeElement(element) {
  if (!element) {
    return;
  }

  if (!(element instanceof AbstractView)) {
    throw new Error(`u can remove only instance of Abstract class`);
  }

  element.getElement().remove();
  element.resetElement();
}

export function isParentContainElement(parent, element) {
  parent = getAbstractClassDOMElement(parent);
  element = getAbstractClassDOMElement(element);
  return parent.contains(element);
}
