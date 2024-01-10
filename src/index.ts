const rootElement = document.querySelector<HTMLDivElement>('#root')!;
const createBtn = document.querySelector<HTMLButtonElement>('#create-btn')!;
const resetBtn = document.querySelector<HTMLButtonElement>('#reset-btn')!;
const elementsForm = document.querySelector<HTMLFormElement>('#elements-form')!;
let createdElements: NaiveReactElement[] = [];

type NaiveReactElement = {
  type: string;
  props: Record<string, string>;
  children: string;
};
type InputNames = 'type' | 'class' | 'text';

createBtn.addEventListener('click', handleCreate);
resetBtn.addEventListener('click', handleReset);

function createNewElementFieldset() {
  const newElement = createNewElement();
  const fieldsetEl = document.createElement('fieldset');
  const typeSelect = createNewInput('Type', 'type');
  const classInput = createNewInput('Class', 'class');
  const textInput = createNewInput('Text', 'text');

  textInput.classList.add('col-span-full');

  fieldsetEl.addEventListener('keyup', (event) =>
    handleKeyup(event, newElement),
  );
  fieldsetEl.classList.add(
    'grid',
    'grid-cols-2',
    'gap-4',
    'mt-6',
    'p-4',
    'bg-gray-200',
    'rounded-md',
  );
  fieldsetEl.append(typeSelect, classInput, textInput);

  return fieldsetEl;
}

function createNewInput(
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

  return newInputLabel;
}

function createNewElement() {
  const newElement: NaiveReactElement = {
    type: '',
    props: {},
    children: '',
  };

  createdElements.push(newElement);

  return newElement;
}

function render(
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

function handleKeyup(event: KeyboardEvent, element: NaiveReactElement) {
  if (!(event.target instanceof HTMLInputElement)) {
    throw new Error('This element should be of type "input".');
  }

  const inputName = event.target.name as InputNames;
  const inputValue = event.target.value;

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

function handleCreate() {
  const fieldsetEl = createNewElementFieldset();
  elementsForm.append(fieldsetEl);
}

function handleReset() {
  createdElements = [];
  elementsForm.textContent = '';
  rootElement.textContent = '';
}
