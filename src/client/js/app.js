// Globals
// Selectors
const departing = document.getElementById("departing");

const modal = document.getElementById("modal");
const flightModal = document.getElementById("flight-modal-content");
const lodgingModal = document.getElementById("lodging-modal-content");
const packingModal = document.getElementById("packing-modal-content");
const notesModal = document.getElementById("notes-modal-content");

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

  document.getElementById("detail-countdown").innerHTML =
    '<span class="loading">Loading... Please wait.</span>';

  // Caculate countdown.
  const departingTs = departing.valueAsNumber;
  const countdown = calculateCountdown(Date.now(), departingTs);

  const data = {
    location: locationText,
    departing: departingText,
    countdown: countdown,
  };

  postData("http://localhost:8081/geonames", data)
    .then((res) => {
      // Check if no codes were returned, likely invalid place name.
      if (res.postalCodes.length === 0) {
        const msg = `Cannot find coordinates for ${data.location}`;
        alert(msg);
        throw new Error(msg);
      }
      // Geonames returns data in an array. Select the first object.
      const result = res.postalCodes[0];
      const { lat, lng } = result;
      const d1 = new Date(departing.valueAsDate);
      const d2 = new Date(departing.valueAsDate);
      let type = "forecast";
      if (countdown > 7) {
        type = "normals";
      }
      // Save to data.
      data.lat = lat;
      data.lng = lng;
      data.weatherType = type;
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
      return postData("http://localhost:8081/weatherbit", weatherbitData);
    })
    .then((res) => {
      // For forecast, Weatherbit returns array of 16 day forecast.
      // Find the result with the target date.
      let weatherInfo;
      if (data.weatherType === "forecast") {
        weatherInfo = res.data.find((d) => d.valid_date === data.departing);
      } else {
        weatherInfo = res.data[0];
      }
      data.weather = weatherInfo;
      // Pixabay API
      return postData("http://localhost:8081/pixabay", data);
    })
    .then((res) => {
      // Store the image.
      if (res.hits.length > 0) {
        data.image = res.hits[0].webformatURL;
      } else {
        data.image =
          "https://www.publicdomainpictures.net/pictures/270000/velka/world-map-travel-couple-travele.jpg";
      }
      // Add data to API.
      postData("http://localhost:8081/addData", data);
    })
    .then(() => {
      // Retrieve data and update DOM elements with content
      updateUI();
    })
    .catch((err) => {
      handleError(err);
    });
}

/* Function to POST data to server */
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
    handleError(error);
  }
};

/* Function to GET Project Data */
const getData = async (url = "") => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

const updateUI = async () => {
  const data = await getData("http://localhost:8081/data");
  try {
    // Update text of UI elements:
    document.getElementById("dest-photo").innerHTML = `
      <img src="${data.image}" alt="Location photo" class="dest-photo">
      `;
    document.getElementById(
      "detail-dest"
    ).innerHTML = `My trip to: ${data.location}`;
    document.getElementById(
      "detail-departing"
    ).innerHTML = `Departing: ${data.departing}`;
    document.getElementById("detail-countdown").innerHTML = `${
      data.location
    } is ${data.countdown} day${data.countdown > 1 ? "s" : ""} away`;
    document.getElementById("detail-weather").innerHTML = weatherTemplate(data);
  } catch (error) {
    handleError(error);
  }
};

const weatherTemplate = (data) => {
  let innerHTML = "";
  if (data.weatherType === "forecast") {
    innerHTML = `
      <div class="detail-weather-hdr">Weather forecast:</div>
      <table class="weather-table">
        <tr>
          <td rowspan="2" class="td-icon">
            <img class="weather-icon" alt="Weather Icon"
              src="https://www.weatherbit.io/static/img/icons/${data.weather.weather.icon}.png" />
          </td>
          <td class="td-temp">
            High: ${data.weather.high_temp} F, Low: ${data.weather.low_temp} F
          </td>
        </tr>
        <tr>
          <td class="td-desc">${data.weather.weather.description}</td>
        </tr>
      </table>
      `;
  } else {
    innerHTML = `
      <div class="detail-weather-hdr">Typical weather for then is:
      </div>Avg: ${data.weather.temp} F, Max: ${data.weather.max_temp} F, Min: ${data.weather.min_temp} F`;
  }
  return innerHTML;
};

const resetUI = async (event) => {
  event.preventDefault();
  await postData("http://localhost:8081/clearData");
  document.getElementById(
    "dest-photo"
  ).innerHTML = `<img src="https://www.publicdomainpictures.net/pictures/290000/velka/using-gps.jpg" alt="Location photo" class="dest-photo">`;
  document.getElementById("detail-dest").innerHTML = `Where do you want to go?`;
  document.getElementById(
    "detail-departing"
  ).innerHTML = `When are you leaving?`;
  document.getElementById("detail-countdown").innerHTML =
    "Enter information below.";
  document.getElementById("detail-weather").innerHTML = "";
  document.getElementById("extra-table").innerHTML = `
    <tbody id="detail-flight"></tbody>
    <tbody id="detail-lodging"></tbody>
    <tbody id="detail-packing"></tbody>
    <tbody id="detail-notes"></tbody>
  `;
};

const addExtraInfo = (name, event) => {
  event.preventDefault();
  modal.style.display = "block";
  document.getElementById(`${name}-modal-content`).style.display = "block";
};

const saveExtraInfo = async (name, event) => {
  event.preventDefault();
  const info = document.getElementById(`${name}-info`).value;
  if (info.length === 0) {
    closeModal();
    return;
  }
  const _data = { [name]: info };
  const data = await postData("http://localhost:8081/updateData", _data);
  document.getElementById(`detail-${name}`).innerHTML = `
    <tr>
      <td class="td-title">
        ${name} info:
      </td>
      <td class="td-info">
        ${data[name]}
      </td>
    </tr>
  `;
  closeModal();
};

function closeModal() {
  flightModal.style.display = "none";
  lodgingModal.style.display = "none";
  packingModal.style.display = "none";
  notesModal.style.display = "none";
  modal.style.display = "none";
}

const handleError = (err) => {
  console.log(err);
  resetUI();
};

const setUp = () => {
  setDepartingRange();
  // Closes the modal if any part of it is clicked, eg: outside the dialog box.
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
};

export {
  handleSubmit,
  resetUI,
  saveExtraInfo,
  addExtraInfo,
  closeModal,
  setUp,
  calculateCountdown,
  weatherTemplate,
};
