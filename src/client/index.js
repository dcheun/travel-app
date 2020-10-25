import { handleSubmit, setUp } from "./js/app";
import { checkForLocation } from "./js/locationChecker";
import { checkForDate } from "./js/dateChecker";

import "./styles/resets.scss";
import "./styles/styles.scss";
import "./styles/modal.scss";
import "./styles/grid.scss";
import "./styles/header.scss";
import "./styles/detail.scss";
import "./styles/input.scss";
import "./styles/footer.scss";

setUp();

export { handleSubmit, checkForLocation, checkForDate };
