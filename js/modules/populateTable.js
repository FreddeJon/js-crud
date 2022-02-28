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
  if (tableHead.childNodes.length < 1) {
    createHeaders(Object.keys(arrayOfPlayers[0]));
  }
  createPlayerRow(arrayOfPlayers);
};

const removeRows = () => {
  while (playerTable.firstChild) {
    playerTable.removeChild(playerTable.firstChild);
  }
};

const search = (query, data) => {
  const filtredData = [];
  removeRows();
  if (!query) {
    populate(data);
    return;
  }
  data.forEach((element) => {
    const { namn, born } = element;
    if (
      namn.toLowerCase().includes(query.toLowerCase()) ||
      born.toLowerCase().includes(query.toLowerCase())
    ) {
      filtredData.push(element);
    }
  });
  populate(filtredData);
};

const createHeaders = (keys) => {
  const headerRow = createEl("tr");
  headerRow.append(createEl("th", "Edit"));
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== "id") {
      const th = createEl("th", capitalizeFirstLetter(keys[i]));
      th.addEventListener("click", () => {
        orderTable(i);
      });
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

const orderTable = (headerNumber) => {
  let i,
    x,
    y,
    shouldSwitch,
    switchcount = 0;
  let switching = true;
  let dir = "asc";
  while (switching) {
    switching = false;
    let rows = playerTable.rows;
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].querySelectorAll("td")[headerNumber];
      y = rows[i + 1].querySelectorAll("td")[headerNumber];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};

export { populate, search };
