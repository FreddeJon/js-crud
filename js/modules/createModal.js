import { createElement, capitalizeFirstLetter } from "./utils.js";

const createModal = () => {
  const modal = createElement("div");
  modal.classList.add("form-modal");
  return modal;
};

const createFormContainer = (header) => {
  const container = createElement("div");
  container.append(createElement("h2", header));
  container.classList.add("form-container");
  return container;
};

const createFormModal = (keys, header) => {
  const modal = createModal();
  const formContainer = createFormContainer(header);
  const form = createForm(keys);
  formContainer.append(form);
  modal.append(formContainer);

  return modal;
};

const createForm = (keys) => {
  const form = createElement("form");
  keys.forEach((key) => {
    if (key !== "id") {
      const inp = createElement("input");
      inp.placeholder = capitalizeFirstLetter(key);
      inp.name = key;
      inp.required = true;
      if (key == "jersey" || key == "age") {
        inp.type = "number";
        inp.min = 0;
        inp.max = 100;
      }
      form.append(inp);
    }
  });
  form.append(createElement("button", "Submit"));
  return form;
};

export { createFormModal };
