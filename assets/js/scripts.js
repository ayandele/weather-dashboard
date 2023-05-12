  // API key for OpenWeatherMap
const apiKey = "50befc3565826a536595cd07c24c21bf";

// Elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const currentTemp = document.getElementById("current-temp");
const currentWind = document.getElementById("current-wind");
const currentHumidity = document.getElementById("current-humidity");
const forecastCards = document.getElementById("forecast-cards");
const searchHistoryList = document.getElementById("search-history-list");

// Event listeners
searchButton.addEventListener("click", searchCity);
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchCity();
  }
});

// Search for a city and display its weather data
function searchCity() {
  const city = searchInput.value;
  if (city) {
    getWeatherData(city);
    addToSearchHistory(city);
    searchInput.value = "";
  }
}

// Get weather data for a city and display it
async function getWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const { name, main, wind } = data;
    cityName.innerText = name;
    currentTemp.innerText = `${main.temp}°C`;
    currentWind.innerText = `${wind.speed} m/s`;
    currentHumidity.innerText = `${main.humidity}%`;
    getForecastData(data.coord);
  } catch (error) {
    console.log(error);
    alert("Unable to find city. Please try again.");
  }
}

// Get forecast data for a city and display it
async function getForecastData(coord) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const forecastData = parseForecastData(data.list);
    displayForecastData(forecastData);
  } catch (error) {
    console.log(error);
    alert("Unable to get forecast data. Please try again.");
  }
}

// Parse forecast data and return an array of daily forecasts
function parseForecastData(dataList) {
  const dailyForecasts = [];
  const dateMap = new Map();
  dataList.forEach((data) => {
    const date = new Date(data.dt * 1000).toLocaleDateString();
    if (!dateMap.has(date)) {
      dateMap.set(date, true);
      dailyForecasts.push({
        date: date,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
      });
    }
  });
  return dailyForecasts;
}

// Display forecast data in a series of cards
function displayForecastData(forecastData) {
  forecastCards.innerHTML = "";
  forecastData.forEach((forecast) => {
    const card = `
      <div class="card text-white bg-primary mb-3">
        <div class="card-body">
          <h5 class="card-title">${forecast.date}</h5>
          <img src="https://openweathermap.org/img/w/${forecast.icon}.png" alt="${forecast.icon}">
          <p class="card-text">${forecast.temp}
  