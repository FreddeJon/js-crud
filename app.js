import { ApiHandler } from "./modules/apiHandler.js";
import { runTableHandler } from "./modules/tableHandler.js";
import { runFormHandler } from "./modules/formHandler.js";
import { extractKeys, addLoader } from "./modules/utils.js";

const body = document.querySelector("body");

// URL = "https://hockeyplayers.systementor.se/stefan/player";
URL = "http://localhost:3000/players";

const api = new ApiHandler(URL);
addLoader(document.querySelector(".table-container"));
const data = await api.get();
runTableHandler(data);
runFormHandler(api, extractKeys(data[0]));

body.addEventListener("click", (e) => {
  const modal = document.querySelector(".form-modal");
  if (modal && e.target.className === "form-modal") {
    modal.parentNode.removeChild(modal);
  }
});
