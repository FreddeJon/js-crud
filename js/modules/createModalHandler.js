import { createEl, capitalizeFirstLetter } from "./utils.js";

const createNewFormModal = (keys, header) => {
  const div = createEl("div");
  div.classList.add("create-form-modal");
  const container = createEl("div");
  container.append(createEl("h2", header));
  container.append(createForm(keys));
  container.classList.add("form-container");
  div.append(container);
  return div;
};

const createForm = (keys) => {
  const form = createEl("form");
  keys.forEach((key) => {
    if (key !== "id") {
      const inp = createEl("input");
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
  form.append(createEl("button", "Submit"));
  return form;
};

export { createNewFormModal };
