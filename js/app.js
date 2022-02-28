import { ApiHandler } from "./modules/apiHandler.js";
import { populate } from "./modules/populateTable.js";
import { sortData } from "./modules/sortFunction.js";

const URL = "https://hockeyplayers.systementor.se/fredde/player";
// const URL = "http://localhost:3000/players";

const hockeyApi = new ApiHandler(URL);

let data = await hockeyApi.get();
populate(data);
console.log(data);
window.onload = async () => {
  // data = await hockeyApi.get();
  populate(data);
};
const button = document.querySelector("#sort");

button.addEventListener("click", () => {
  data = sortData(data);
  populate(data);
});
