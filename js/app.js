import { ApiHandler } from "./modules/apiHandler.js";
import { populate, search } from "./modules/populateTable.js";

// const URL = "https://hockeyplayers.systementor.se/fredde/player";
const URL = "http://localhost:3000/players";

const hockeyApi = new ApiHandler(URL);

let data = await hockeyApi.get();
populate(data);

const searchBtn = document.querySelector("#search");

searchBtn.addEventListener("keyup", (e) => {
  search(e.target.value, data);
});
