/* Global Variables */
const BASE_URL =
  "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

// Create a new date instance dynamically with JS
function getDate() {
  const d = new Date();
  const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  return newDate;
}

/* Function called by event listener */
function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getAPIData(BASE_URL, API_KEY, zip, feelings)
    // Post to data
    .then((data) => {
      data.date = getDate();
      data.userResponse = feelings;
      postData("/addData", data);
    })
    // Retrieve data and update DOM elements with content
    .then(() => {
      updateUI();
    });
}

/* Function to GET Web API Data*/

const getAPIData = async (BASE_URL, key, zip, feelings) => {
  // Assume USA zip code.
  // Wait for API call to return.
  const res = await fetch(`${BASE_URL}${zip},us&appid=${key}`);
  try {
    const data = await res.json();
    return {
      temperature: data.main.temp,
    };
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */

const getData = async (url = "") => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const data = await getData("/data");
  try {
    // Update text of UI elements:
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${data.temperature} C`;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings: ${data.userResponse}`;
  } catch (error) {
    console.log("error", error);
  }
};

function handleSubmit(event) {
  event.preventDefault();
}

export { handleSubmit };
