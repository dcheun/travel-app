import {
  handleSubmit,
  resetUI,
  addExtraInfo,
  saveExtraInfo,
  closeModal,
} from "./js/app";
import { checkForLocation } from "./js/locationChecker";
import { checkForDate } from "./js/dateChecker";

import "./styles/resets.scss";
import "./styles/styles.scss";
import "./styles/grid.scss";
import "./styles/header.scss";
import "./styles/detail.scss";
import "./styles/input.scss";
import "./styles/footer.scss";

// Attach listener to buttons.
document.getElementById("save-trip").addEventListener("click", handleSubmit);
document.getElementById("remove-trip").addEventListener("click", resetUI);

const extraInfo = ["flight", "lodging", "packing", "notes"];
extraInfo.forEach((name) => {
  document
    .getElementById(`btn-add-${name}`)
    .addEventListener("click", addExtraInfo.bind(null, name));
  document
    .getElementById(`save-${name}-info`)
    .addEventListener("click", saveExtraInfo.bind(null, name));
  document
    .getElementById(`cancel-${name}-info`)
    .addEventListener("click", closeModal);
});

export {
  handleSubmit,
  resetUI,
  addExtraInfo,
  saveExtraInfo,
  checkForLocation,
  checkForDate,
};
