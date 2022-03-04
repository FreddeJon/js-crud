import { ApiHandler } from "./modules/apiHandler.js";
import { run } from "./modules/tableHandler.js";
import { runFormHandler } from "./modules/formHandler.js";
import { extractKeys } from "./modules/utils.js";

const body = document.querySelector("body");

// URL = "https://hockeyplayers.systementor.se/fredde/player";
URL = "http://localhost:3000/players";

const api = new ApiHandler(URL);
const data = await api.get();

run(data);
runFormHandler(api, extractKeys(data[0]));

body.addEventListener("click", (e) => {
  const modal = document.querySelector(".form-modal");
  if (modal && e.target.className === "form-modal") {
    modal.parentNode.removeChild(modal);
  }
});

// const sortData = (key) => {
//   let switches = 0;
//   let order = "asc";
//   let sorting = true;
//   while (sorting) {
//     sorting = false;
//     if (order === "desc") {
//       data.sort((a, b) => {
//         if (a[key] > b[key]) {
//           switches++;
//           return -1;
//         }
//         if (a[key] < b[key]) {
//           switches++;
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//       data.sort((a, b) => {
//         if (a[key] > b[key]) {
//           switches++;
//           return 1;
//         }
//         if (a[key] < b[key]) {
//           switches++;
//           return -1;
//         }
//         return 0;
//       });
//     }
//     if (switches == 0 && order == "asc") {
//       order = "desc";
//       sorting = true;
//     }
//   }
//   console.log("number of switches", switches);
//   console.log("Order", order);
//   console.log(data);
// };

// sortData("namn");
