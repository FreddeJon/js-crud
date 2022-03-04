import { ApiHandler } from "./modules/apiHandler.js";
import { run } from "./modules/tableHandler.js";
import { runFormHandler } from "./modules/formHandler.js";
import { extractKeys } from "./modules/utils.js";

const body = document.querySelector("body");

// URL = "https://hockeyplayers.systementor.se/fredde/player";
URL = "http://localhost:3000/players";

const api = new ApiHandler(window.URL);
const data = await api.get();

run(data);

runFormHandler(api, extractKeys(data[0]));

body.addEventListener("click", (e) => {
  const modal = document.querySelector(".form-modal");
  if (modal && e.target.className === "form-modal") {
    modal.parentNode.removeChild(modal);
  }
});
