const apiKey = "50befc3565826a536595cd07c24c21bf";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherTable = document.getElementById("weather-table");

searchButton.addEventListener("click", () => {
const searchValue = searchInput.value;
if (searchValue) {
    getWeatherData(searchValue);
}
});

async function getWeatherData(searchValue) {
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const weatherData = parseWeatherData(data);
    displayWeatherData(weatherData);
} catch (error) {
    console.log(error);
}
}

function parseWeatherData(data) {
const weatherData = [];
data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    const temperature = item.main.temp;
});
return weatherData;
}
