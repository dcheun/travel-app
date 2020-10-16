import { handleSubmit } from "./js/app";
import { checkForLocation } from "./js/locationChecker";
import { checkForDate } from "./js/dateChecker";

import "./styles/styles.scss";
import "./styles/grid.scss";
import "./styles/header.scss";
import "./styles/footer.scss";

// Attach listener to generate.
document.getElementById("generate").addEventListener("click", handleSubmit);

export { handleSubmit, checkForLocation, checkForDate };
