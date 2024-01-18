import { createNewElement, createdElements, render, rootElement } from "./elements";
import { InputNames, NaiveReactElement } from "./types";

export function createNewElementFieldset() {
  const newElement = createNewElement()
  const fieldsetEl = document.createElement('fieldset');
  const typeSelect2 = createNewSelect(newElement, 'Type', 'type', ['p', 'h1', 'h2', 'h3']);
  const classInput = createNewInput(newElement, 'Class', 'class');
  const textInput = createNewInput(newElement, 'Text', 'text');

  textInput.classList.add('col-span-full');

  fieldsetEl.classList.add(
    'grid',
    'grid-cols-2',
    'gap-4',
    'mt-6',
    'p-4',
    'bg-gray-200',
    'rounded-md',
  );
  fieldsetEl.append(typeSelect2, classInput, textInput);

  return fieldsetEl;
}

function createNewInput(
  newElement: NaiveReactElement,
  labelText: string,
  name: InputNames,
  type: string = 'input',
) {
  const newInputLabel = document.createElement('label');
  newInputLabel.classList.add('flex', 'flex-col', 'gap-1', 'text-gray-600');

  const newInputEl = document.createElement('input');
  newInputEl.classList.add('p-1', 'rounded-sm');
  newInputEl.name = name;
  newInputEl.type = type;

  newInputLabel.append(labelText, newInputEl);

  newInputEl.addEventListener('keyup', (event) =>
    updateElement(event, newElement),
  );

  return newInputLabel;
}

function createNewSelect(
  newElement: NaiveReactElement,
  labelText: string,
  name: InputNames,
  options: string[],
) {
  const newSelectLabel = document.createElement('label');
  newSelectLabel.classList.add('flex', 'flex-col', 'gap-1', 'text-gray-600');

  const newSelectEl = document.createElement('select');
  newSelectEl.classList.add('p-1', 'rounded-sm');
  newSelectEl.name = name;

  for (const optionText of options) {
    const newOptionEl = document.createElement('option');
    newOptionEl.textContent = optionText;
    newSelectEl.append(newOptionEl)
  }

  newSelectLabel.append(labelText, newSelectEl);

  newSelectEl.addEventListener('change', (event) =>
    updateElement(event, newElement),
  );

  return newSelectLabel;
}

function updateElement(event: Event, element: NaiveReactElement) {
  if (event.target === null) {
    throw new Error('No event target was found.')
  }

  const inputName: InputNames = event.target.name;
  const inputValue: string = event.target.value;

  switch (inputName) {
    case 'type':
      element.type = inputValue;
      break;
    case 'text':
      element.children = inputValue;
      break;
    case 'class':
      element.props.class = inputValue;
      break;
  }

  rootElement.textContent = '';

  for (const element of createdElements) {
    render(element, rootElement);
  }
}