import { ApiHandler } from "./modules/apiHandler.js";
import { run } from "./modules/index.js";

// const URL = "https://hockeyplayers.systementor.se/fredde/player";
const URL = "http://localhost:3000/players";

const hockeyApi = new ApiHandler(URL);
let data = await hockeyApi.get();
run(data);
