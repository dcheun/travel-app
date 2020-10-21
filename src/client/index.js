import { handleSubmit, resetUI } from "./js/app";
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

export { handleSubmit, resetUI, checkForLocation, checkForDate };
