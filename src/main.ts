import {
  clearCreatedElements,
  createBtn,
  elementsForm,
  resetBtn,
} from './utils.ts/elements';
import { createNewElementFieldset } from './utils.ts/forms';

createBtn.addEventListener('click', handleCreate);
resetBtn.addEventListener('click', clearCreatedElements);

function handleCreate() {
  const fieldsetEl = createNewElementFieldset();
  elementsForm.append(fieldsetEl);
}
