const playerTable = document.querySelector("#playerTable");
const tableHead = document.querySelector("#tableHeader");

const createEl = (el, innerText = "") => {
  const newEl = document.createElement(el);
  newEl.innerText = innerText;
  return newEl;
};

const populate = (arrayOfPlayers) => {
  if (arrayOfPlayers.length < 1 || arrayOfPlayers === undefined) {
    return;
  }
  // createHeaders(Object.keys(arrayOfPlayers[0]));
  createPlayerRow(arrayOfPlayers);
};

const createHeaders = (keys) => {
  const headerRow = createEl("tr");
  headerRow.append(createEl("th", "Edit"));
  for (const key of keys) {
    if (key !== "id") {
      const th = createEl("th", capitalizeFirstLetter(key));
      headerRow.append(th);
    }
  }
  tableHead.append(headerRow);
};

const createPlayerRow = (arrayOfPlayers) => {
  for (let player of arrayOfPlayers) {
    const playerRow = createEl("tr");
    playerRow.append(createEditLink(player.id));
    const keys = Object.keys(player);
    for (let key of keys) {
      if (key !== "id") {
        const td = createEl("td", player[key]);
        playerRow.append(td);
      }
    }
    playerTable.append(playerRow);
  }
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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const orderTable = () => {};

export { populate };
