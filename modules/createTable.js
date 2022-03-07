import { createElement, capitalizeFirstLetter, extractKeys } from "./utils.js";
import { setHeaderEvent } from "./tableHandler.js";
import { loadEditForm } from "./formHandler.js";
import { validation as vl } from "./validation.js";

const initizalizeTable = (table, data) => {
  // Create headers if not found
  table.tHead.childElementCount <= 0 ? createHeaders(table, extractKeys(data[0])) : "";

  // Empty tbody if there is elements inside
  table.tBodies[0] ? table.tBodies[0].remove() : "";

  createTBodyAndInsertData(table, data);
};

const createTBodyAndInsertData = (table, data) => {
  const tbody = table.createTBody();
  if (!vl.validateArray(data)) return tbody;

  data.forEach((player) => {
    const row = tbody.insertRow();
    row.insertCell().append(createEditLink(player));

    for (const key in player) {
      if (Object.hasOwnProperty.call(player, key) && key !== "id") {
        row.insertCell().innerText = player[key];
      }
    }
  });
  return tbody;
};

const createEditLink = (player) => {
  const iconHtml = "<i class='bx bx-edit'></i>";
  const edit = createElement("a");
  edit.innerHTML = iconHtml;
  edit.dataset.id = player.id;
  edit.id = "edit";
  edit.addEventListener("click", () => {
    loadEditForm(player);
  });
  return edit;
};

const createHeaders = (table, keys) => {
  const row = table.tHead.insertRow();
  row.append(createElement("th", "Edit"));
  keys.forEach((key) => {
    if (key !== "id") {
      const th = createElement("th", capitalizeFirstLetter(key));
      th.dataset.key = key;
      setHeaderEvent(th);
      row.append(th);
    }
  });
};

export { initizalizeTable };
