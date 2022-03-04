import { createFormModal } from "./createModal.js";
import { addLoader, removeLoader } from "./utils.js";

const body = document.querySelector("body");
const create = document.querySelector("#new");

create.addEventListener("click", () => {
  loadNewForm();
});

let api, keys;

const runFormHandler = (usingApi, formKeys) => {
  api = usingApi;
  keys = formKeys;
};

const loadNewForm = () => {
  const modal = createFormModal(keys, "Create New");
  const form = modal.querySelector("form");
  body.append(modal);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newObject = getFormValues(form);
    api
      .create(newObject)
      .then(() => window.location.replace("/"))
      .catch((err) => console.log(err));
  });
};

const loadEditForm = (obj) => {
  const { id, namn } = obj;
  const modal = createFormModal(keys, `Edit ${namn}`);
  const form = modal.querySelector("form");
  body.append(modal);
  insertValueInForm(form, obj);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editObject = getFormValues(form);
    addLoader(modal);
    api
      .update(id, editObject)
      .then((res) => {
        removeLoader();
        window.location.replace("/");
      })
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

export { runFormHandler, loadEditForm, loadNewForm };
