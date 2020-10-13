// Selectors
const departing = document.getElementById("departing");

// Create a new date instance dynamically with JS
function getDate() {
  const d = new Date();
  const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  return newDate;
}

function setDepartingRange() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // Jan is 0
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const min = `${yyyy}-${mm}-${dd}`;
  const max = `${yyyy + 10}-${mm}-${dd}`;
  departing.setAttribute("min", min);
  departing.setAttribute("max", max);
}

function calculateCountdown(startTs, endTs) {
  const diff = endTs - startTs;
  return parseInt(Math.ceil(diff / 1000 / 60 / 60 / 24));
}

function handleSubmit(event) {
  event.preventDefault();

  let locationText = document.getElementById("placename").value;
  if (!Client.checkForLocation(locationText)) {
    return false;
  }
  let departingText = departing.value;
  if (!Client.checkForDate(departingText)) {
    return false;
  }

  console.log("handleSubmit:departing:", departing);

  // Caculate countdown.
  const departingTs = departing.valueAsNumber;
  const countdown = calculateCountdown(Date.now(), departingTs);
  console.log("countdown", countdown);

  const data = { placename: locationText };

  console.log("app.js:handleSubmit");

  postData("http://localhost:8081/geonames", data)
    .then((res) => {
      // Geonames returns data in an array. Select the first object.
      console.log("res:", res.postalCodes);
      const result = res.postalCodes[0];
      const { lat, lng } = result;
      console.log(`res: lat=${lat},lng=${lng}`);
      const d1 = new Date(departing.valueAsDate);
      const d2 = new Date(departing.valueAsDate);
      let type = "forecast";
      if (countdown > 7) {
        type = "normals";
        d1.setDate(d1.getDate() - 4);
        d2.setDate(d2.getDate() + 4);
      }
      const d1Month = d1.getMonth() + 1;
      const d2Month = d1.getMonth() + 1;
      const weatherbitData = {
        lat,
        lon: lng,
        type,
        start_day: `${d1Month < 10 ? "0" + d1Month : d1Month}-${
          d1.getDate() < 10 ? "0" + d1.getDate() : d1.getDate()
        }`,
        end_day: `${d2Month < 10 ? "0" + d2Month : d2Month}-${
          d2.getDate() < 10 ? "0" + d2.getDate() : d2.getDate()
        }`,
      };
      console.log(weatherbitData);
      renderResults(result);
      return postData("http://localhost:8081/weatherbit", weatherbitData);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}

function renderResults(results) {
  console.log(results);
  // document.getElementById("date").innerHTML = `Date: ${data.date}`;
  // document.getElementById(
  //   "temp"
  // ).innerHTML = `Temperature: ${data.temperature} C`;
  // document.getElementById(
  //   "content"
  // ).innerHTML = `Feelings: ${data.userResponse}`;
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

setDepartingRange();

export { handleSubmit };
