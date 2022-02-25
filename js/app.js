import { Repository } from "./repo/hockeyPlayerRepo.js";
import { populate } from "./modules/populateTable.js";

const URL = "https://hockeyplayers.systementor.se/fredde/player";

const repo = new Repository(URL);

window.onload = async () => {
  populate(await repo.get());
};
