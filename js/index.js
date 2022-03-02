import { capitalizeFirstLetter, removeElement } from "./modules/utils.js";
import { createPlayerTbody, createHeaders } from "./modules/createTableHandler.js";

const tableSearch = document.querySelector("#tableSearch");
const table = document.querySelector("#table");
const tableHead = document.querySelector("#tableHeader");

const totalItems = document.querySelector("#totalItems");
const selectPages = document.querySelector("#selectPages");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const page = document.querySelector("#page");

next.addEventListener("click", () => {
  if (current_page < data.length / takePages) {
    current_page++;
    startPage += takePages;
    pagination(data);
  }
});

previous.addEventListener("click", () => {
  if (current_page > 1) {
    current_page--;
    startPage -= takePages;
    pagination(data);
  }
});

tableSearch.addEventListener("keyup", ({ target: { value } }) => {
  search(value);
});

selectPages.addEventListener("change", ({ target: { value } }) => {
  takePages = Number(value);
  startPage = 0;
  current_page = 1;
  pagination(data);
});

let current_page = 1;
let startPage = 0;
let takePages = 10;
let isLoaded = false;

tableSearch.value = "";
selectPages.value = takePages;

let data = [];

const run = (loadedData) => {
  if (!isLoaded) {
    data = loadedData;
    isLoaded = true;
  }
  pagination(data);
};

const pagination = (data) => {
  totalItems.innerText = `of ${data.length}`;
  setCurrentPage();
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
  removeElement("tbody");
  if (!query) {
    current_page = 1;
    startPage = 0;
    pagination(data);
    return;
  }
  data.forEach((element) => {
    const { namn, born, age, jersey } = element;
    if (
      namn.toLowerCase().includes(query.toLowerCase()) ||
      born.toLowerCase().includes(query.toLowerCase()) ||
      (age + "").includes(query) ||
      (born + "").includes(query)
    ) {
      filtredData.push(element);
    }
  });
  pagination(filtredData);
};

const setCurrentPage = (length = data.length) => {
  page.innerText = `${current_page} of ${Math.ceil(length / takePages)}`;
};

const setHeaderEvent = (el) => {
  el.addEventListener("click", ({ target: { dataset } }) => {
    sortTable(dataset.key);
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
