import { ApiHandler } from "./modules/apiHandler.js";
import { run } from "./index.js";
import { loadNewForm } from "./modules/formHandler.js";

const newButton = document.querySelector("#new");
const body = document.querySelector("body");
// window.URL = "https://hockeyplayers.systementor.se/fredde/player";

window.URL = "http://localhost:3000/players";

const api = new ApiHandler(window.URL);
const data = await api.get();

run(data);
window.firstObj = data[0];

newButton.addEventListener("click", () => {
  loadNewForm(data[0]);
});

body.addEventListener("click", (e) => {
  const modal = document.querySelector(".create-form-modal");
  if (modal && e.target.className === "create-form-modal") {
    modal.parentNode.removeChild(modal);
  }
});
