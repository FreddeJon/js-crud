import { ApiHandler } from "./apiHandler.js";
import { createNewFormModal } from "./createModalHandler.js";
import { extractKeys } from "./utils.js";

const body = document.querySelector("body");

const loadNewForm = () => {
  const api = new ApiHandler(window.URL);
  const formModal = createNewFormModal(extractKeys(window.firstObj), "Create New");
  const form = formModal.querySelector("form");
  body.append(formModal);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newObject = getFormValues(form);
    api.create(newObject).then(() => window.location.replace("/"));
  });
};

const loadEditForm = async (id) => {
  const api = new ApiHandler(window.URL);
  const editObject = await api.getById(id);
  const formModal = createNewFormModal(extractKeys(window.firstObj), `Edit ${editObject.namn}`);
  const form = formModal.querySelector("form");
  insertValueInForm(form, editObject);
  body.append(formModal);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const editObject = getFormValues(form);
    api
      .update(id, editObject)
      .then(() => window.location.replace("/"))
      .catch((err) => console.log(err));
  });
};

const insertValueInForm = (form, obj) => {
  const elements = [...form.elements].filter((a) => a.localName !== "button");
  elements.forEach((inp) => {
    inp.value = obj[inp.name];
  });
};

const getFormValues = (form) => {
  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());
  return value;
};

export { loadEditForm, loadNewForm };
