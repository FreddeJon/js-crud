import { ApiHandler } from "./modules/apiHandler.js";
import { populate } from "./modules/populateTable.js";

// const URL = "https://hockeyplayers.systementor.se/fredde/player";
const URL = "http://localhost:3000/players";

const hockeyApi = new ApiHandler(URL);

window.onload = async () => {
  populate(await hockeyApi.get());
};
