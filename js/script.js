// https://api.openweathermap.org/data/2.5/weather?q=Barnhart&APPID=d29ef55d151d97cdfc7ebaf7dd2c4ca3
// d29ef55d151d97cdfc7ebaf7dd2c4ca3

const locationInput = document.querySelector("#location");
const locationButton = document.querySelector("#locationButton");

function renderLocationHeader(weatherData) {
  const locationHeader = document.querySelector("#locationHeader");
  locationHeader.textContent = weatherData.name;
}

function renderCurrentTemp(weatherData) {
  const currentTempDiv = document.querySelector("#currentTemp");
  currentTempDiv.textContent = `${Math.round(weatherData.main.temp)}°`;
}

function setCurrentWeatherDescription(weatherData) {
  const { description } = weatherData.weather[0];
  const currentWeatherDescription = document.querySelector(
    "#currentWeatherDescription"
  );
  currentWeatherDescription.textContent = description;
}

function renderBackground(weatherData) {
  const { description } = weatherData.weather[0];
  const body = document.querySelector("body");
  if (description.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (description.includes("rain")) {
    body.classList.add("rainy");
  } else if (description.includes("clear")) {
    body.classList.add("sunny");
  } else {
    body.classList.add("sunny");
  }
}

function setTodayHighAndLowTemp(weatherData) {
  const todayHighTemp = document.querySelector("#todayHighTemp");
  const todayLowTemp = document.querySelector("#todayLowTemp");
  todayHighTemp.textContent = `H: ${Math.round(weatherData.main.temp_max)}°`;
  todayLowTemp.textContent = `L: ${Math.round(weatherData.main.temp_min)}°`;
}

function renderCurrentWeather(weatherData) {
  renderBackground(weatherData);
  renderLocationHeader(weatherData);
  renderCurrentTemp(weatherData);
  setCurrentWeatherDescription(weatherData);
  setTodayHighAndLowTemp(weatherData);
}
function locationButtonClick() {
  if (locationInput.value === "") return;
  getWeather(locationInput.value);
}

async function getWeather(location = "Barnhart") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=d29ef55d151d97cdfc7ebaf7dd2c4ca3&units=imperial`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  // console.log(weatherData);
  renderCurrentWeather(weatherData);
}

function convertTo12HourTime(time) {
  const [hours, minutes] = time.split(":");
  const amOrPm = hours >= 12 ? "pm" : "am";
  const twelveHourTime = `${hours % 12}:${minutes} ${amOrPm}`;
  if (twelveHourTime === "0:00 am") return "12:00 am";
  if (twelveHourTime === "0:00 pm") return "12:00 pm";
  return twelveHourTime;
}

function renderWeatherForecast(forecastData) {
  const forecastDiv = document.querySelector("#forecast");
  forecastDiv.textContent = "3 Hour Forecast";
  for (let i = 0; i < 5; i++) {
    const date = forecastData.list[i].dt_txt;
    const time = date.split(" ")[1];
    const twelveHourTime = convertTo12HourTime(time);
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
    const forecastTime = document.createElement("div");
    forecastTime.classList.add("forecast-time");
    forecastTime.textContent = twelveHourTime;
    const forecastTemp = document.createElement("div");
    forecastTemp.classList.add("forecast-temp");
    forecastTemp.textContent = `${Math.round(forecastData.list[i].main.temp)}°`;
    forecastItem.appendChild(forecastTime);
    forecastItem.appendChild(forecastTemp);
    forecastDiv.appendChild(forecastItem);
  }
}
async function getWeatherForecast(location = "Barnhart") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=d29ef55d151d97cdfc7ebaf7dd2c4ca3&units=imperial`,
    { mode: "cors" }
  );
  const forecastData = await response.json();
  console.log(forecastData);
  renderWeatherForecast(forecastData);
}

locationButton.addEventListener("click", locationButtonClick);

getWeather();
getWeatherForecast();

// Create Weather Forecast for Specified Locations
// Add Header with Location
// Be able to toggle between Fahrenheit or Celsius
