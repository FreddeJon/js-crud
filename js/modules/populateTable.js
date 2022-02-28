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

const orderTable = (n) => {
  var rows,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  const tbody = document.querySelector("#playerTable");
  let switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    console.log(tbody);
    rows = tbody.rows;
    /* Loop through all table rows (except the
      first, which contains table headers): */
    for (i = 0; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
        one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};

export { populate, orderTable };
