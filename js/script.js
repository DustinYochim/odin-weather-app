// https://api.openweathermap.org/data/2.5/weather?q=Barnhart&APPID=d29ef55d151d97cdfc7ebaf7dd2c4ca3
// d29ef55d151d97cdfc7ebaf7dd2c4ca3

const locationInput = document.querySelector("#location");
const locationButton = document.querySelector("#locationButton");

async function getWeather(location = "Barnhart") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=d29ef55d151d97cdfc7ebaf7dd2c4ca3&units=imperial`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  loadUI(weatherData);
}

function loadUI(weatherData) {
  const locationHeader = document.querySelector("#locationHeader");
  locationHeader.textContent = weatherData.name;
  const currentTempDiv = document.querySelector("#currentTemp");
  currentTempDiv.textContent = `${Math.round(weatherData.main.temp)}°`;
  const currentWeatherDiv = document.querySelector("#currentWeather");
  const clouds = weatherData.weather[0].description;
  setBackground(clouds);
  const { icon } = weatherData.weather[0];
  console.log(icon);
  setIcon(icon);
}

function setIcon(icon) {
  const currentWeatherIcon = document.querySelector("#currentWeatherIcon");
  currentWeatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  currentWeatherIcon.alt = "Weather Icon";
  console.log(currentWeatherIcon.src);
}

function setBackground(clouds) {
  const body = document.querySelector("body");
  if (clouds.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (clouds.includes("rain")) {
    body.classList.add("rainy");
  } else if (clouds.includes("clear")) {
    body.classList.add("sunny");
  } else {
    body.classList.add("sunny");
  }
}

function locationButtonClick() {
  if (locationInput.value === "") return;
  getWeather(locationInput.value);
}

locationButton.addEventListener("click", locationButtonClick);

getWeather();

// Create Weather Forecast for Specified Locations
// Add Header with Location
// Be able to toggle between Fahrenheit or Celsius
