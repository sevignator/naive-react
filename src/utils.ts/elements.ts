import { NaiveReactElement } from "./types";

export const rootElement = document.querySelector<HTMLDivElement>('#root')!;

export const createBtn = document.querySelector<HTMLButtonElement>('#create-btn')!;

export const resetBtn = document.querySelector<HTMLButtonElement>('#reset-btn')!;

export const elementsForm = document.querySelector<HTMLFormElement>('#elements-form')!;

export const createdElements: NaiveReactElement[] = [];

export function createNewElement() {
  const newElement: NaiveReactElement = {
    type: 'p',
    props: {},
    children: '',
  };

  createdElements.push(newElement);

  return newElement;
}

export function clearCreatedElements() {
  createdElements.length = 0;
  elementsForm.textContent = '';
  rootElement.textContent = '';
}

export function render(
  reactElement: NaiveReactElement,
  containerDOMElement: HTMLElement,
) {
  const el = document.createElement(reactElement.type);

  for (const key in reactElement.props) {
    const value = reactElement.props[key];
    el.setAttribute(key, value);
  }

  el.append(reactElement.children);

  containerDOMElement.append(el);
}
