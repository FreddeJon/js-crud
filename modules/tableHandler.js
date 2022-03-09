import { initizalizeTable } from "./createTable.js";
import { removeLoader } from "./utils.js";

const tableSearch = document.querySelector("#tableSearch");
const table = document.querySelector("#table");

const totalItems = document.querySelector("#totalItems");
const selectPages = document.querySelector("#selectPages");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const page = document.querySelector("#page");

next.addEventListener("click", () => {
  if (current_page < data.length / takePages) {
    current_page++;
    startPage += takePages;
    paginate(data);
  }
});

previous.addEventListener("click", () => {
  if (current_page > 1) {
    current_page--;
    startPage -= takePages;
    paginate(data);
  }
});

tableSearch.addEventListener("keyup", ({ target: { value } }) => {
  search(value);
});

selectPages.addEventListener("change", ({ target: { value } }) => {
  takePages = Number(value);
  startPage = 0;
  current_page = 1;
  paginate(data);
});

let current_page = 1;
let startPage = 0;
let takePages = 10;

tableSearch.value = "";
selectPages.value = takePages;

let data = [];

const runTableHandler = (loadedData) => {
  data = loadedData;
  sortData("namn");
  paginate(data);
};

const paginate = (data) => {
  removeLoader();
  totalItems.innerText = ` of ${data.length}`;
  setCurrentPage();
  let paginatedData = data.slice(startPage, current_page * takePages);
  initizalizeTable(table, paginatedData);
};

const search = (query) => {
  if (!query) {
    current_page = 1;
    startPage = 0;
    paginate(data);
    return;
  }

  const filtredData = data.filter(({ namn, born, age, jersey } )=> {
    if (
      namn.toLowerCase().includes(query.toLowerCase()) ||
      born.toLowerCase().includes(query.toLowerCase()) ||
      (age + "").includes(query) ||
      (jersey + "").includes(query)
    ){
      return true
    }
  })
  paginate(filtredData);
};

const setCurrentPage = (length = data.length) => {
  page.innerText = `${current_page} of ${Math.ceil(length / takePages)}`;
};

const setHeaderEvent = (el) => {
  el.addEventListener("click", ({ target: { dataset: {key} } }) => {
    sortData(key);
    paginate(data);
  });
};

const sortData = (key) => {
  let switches = 0;
  let order = "asc";
  let sorting = true;
  while (sorting) {
    sorting = false;
    switches = order === "asc" ? sortAsc(key) : sortDesc(key);
    if (switches == 0 && order == "asc") {
      order = "desc";
      sorting = true;
    }
  }
};

const sortAsc = (key) => {
  let switches = 0;
  data.sort((a, b) => {
    let shouldSwitch = ascendingAlgorithm(a[key], b[key]);
    if (shouldSwitch > 0) {
      switches++;
    }
    return shouldSwitch;
  });
  return switches;
};

const sortDesc = (key) => {
  let switches = 0;
  data.sort((a, b) => {
    
    let shouldSwitch = descendingAlgorithm(a[key], b[key]);
    
    if (shouldSwitch > 0) {
      switches++;
    }
    return shouldSwitch;
  });
  return switches;
};
const ascendingAlgorithm = (a, b) => {
  return a > b;
};

const descendingAlgorithm = (a, b) => {
  return a < b;
};

export { runTableHandler, setHeaderEvent };
