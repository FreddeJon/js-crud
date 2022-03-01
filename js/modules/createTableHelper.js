import { createEl, capitalizeFirstLetter } from "./utils.js";

const createPlayerTbody = (playerData) => {
  const tbody = createEl("tbody");

  if (!Array.isArray(playerData) && !(playerData.length > 0)) return tbody;

  playerData.forEach((player) => {
    const playerRow = createEl("tr");
    playerRow.append(createEditLink(player.id));

    Object.keys(player).forEach((key) => {
      if (key !== "id") playerRow.append(createEl("td", player[key]));
    });
    tbody.append(playerRow);
  });

  return tbody;
};

const createEditLink = (id) => {
  const editTd = createEl("td");
  const edit = createEl("a", "Edit");
  edit.href = `/${id}`;
  editTd.append(edit);
  edit.addEventListener("click", () => {
    window.location.replace(`?id=${id}`);
  });
  return editTd;
};

const createHeaders = (keys) => {
  const tr = createEl("tr");
  tr.append(createEl("th", "Edit"));
  keys.forEach((key) => {
    if (key !== "id") {
      const th = createEl("th", capitalizeFirstLetter(key));
      th.dataset.key = key;
      tr.append(th);
    }
  });
  return tr;
};

export { createPlayerTbody, createHeaders };
