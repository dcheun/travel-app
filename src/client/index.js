import { handleSubmit } from "./js/app";

import "./styles/styles.scss";

console.log("I EXIST");

// attach listener to generate.
document.getElementById("generate").addEventListener("click", handleSubmit);

export { handleSubmit };
