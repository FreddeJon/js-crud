import { capitalizeFirstLetter, createEl, removeElement } from "./utils.js";
import { createPlayerTbody, createHeaders } from "./createTableHelper.js";
const tableSearch = document.querySelector("#tableSearch");
const tableHead = document.querySelector("#tableHeader");
const table = document.querySelector("#table");

const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const page = document.querySelector("#page");

next.addEventListener("click", () => {
  if (current_page < data.length / takePages) {
    current_page++;
    startPage += takePages;
    page.innerText = current_page;
    pagination(data);
  }
});

previous.addEventListener("click", () => {
  if (current_page > 1) {
    current_page--;
    startPage -= takePages;
    page.innerText = current_page;
    pagination(data);
  }
});

tableSearch.addEventListener("keyup", (e) => {
  const { value } = e.target;
  search(value);
});
let current_page = 1;
let startPage = 0;
let takePages = 5;
let isLoaded = false;

let data = [];

const run = (loadedData) => {
  if (!isLoaded) {
    data = loadedData;
    isLoaded = true;
  }
  pagination(data);
};

const pagination = (data) => {
  let paginatedData = data.slice(startPage, current_page * takePages);
  populateTable(paginatedData);
};

const populateTable = (playerData) => {
  if (playerData.length < 1 || playerData === undefined) return;

  if (tableHead.childNodes.length < 1) {
    const header = createHeaders(Object.keys(playerData[0]));
    header.childNodes.forEach((el) => setHeaderEvent(el));
    tableHead.append(header);
  }
  removeElement("tbody");
  table.append(createPlayerTbody(playerData));
};

const search = (query) => {
  const filtredData = [];
  console.log(query);
  removeElement("tbody");
  if (!query) {
    current_page = 1;
    startPage = 0;
    pagination(data);
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
  pagination(filtredData);
};

const setHeaderEvent = (el) => {
  el.addEventListener("click", (e) => {
    let { key } = e.target.dataset;
    sortTable(key);
    pagination(data);
  });
};

const sortTable = (key) => {
  let i, firstItem, secondItem, needSwitch;
  let order = "asc";
  let unsorted = true;
  let switchcount = 0;
  while (unsorted) {
    unsorted = false;
    for (i = 0; i < data.length - 1; i++) {
      needSwitch = false;
      firstItem = data[i][key];
      secondItem = data[i + 1][key];
      if (order == "asc") {
        if (firstItem > secondItem) {
          needSwitch = true;
          break;
        }
      } else if (order == "desc") {
        if (firstItem < secondItem) {
          needSwitch = true;
          break;
        }
      }
    }
    if (needSwitch) {
      [data[i], data[i + 1]] = [data[i + 1], data[i]];
      unsorted = true;
      switchcount++;
    } else {
      if (switchcount == 0 && order == "asc") {
        order = "desc";
        unsorted = true;
      }
    }
  }
};

export { run };
