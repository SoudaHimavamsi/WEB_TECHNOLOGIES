const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const message = document.getElementById("message");

const API_KEY = "2442265f691ff9ef5b92cfb36db23b44";

let cachedCity = "";
let cachedData = null;

searchBtn.addEventListener("click", getWeather);

function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") return;

    // ---------- CACHE CHECK ----------
    if (city.toLowerCase() === cachedCity.toLowerCase()) {
        displayWeather(cachedData);
        message.textContent = "Loaded from cache";
        message.style.color = "green";
        return;
    }

    loading.style.display = "block";
    message.textContent = "";
    weatherCard.innerHTML = "";

    // ✅ CORRECT API URL
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // ---------- AJAX GET REQUEST ----------
    fetch(url)
        .then(response => {

            if (response.status === 404)
                throw new Error("City not found");

            if (!response.ok)
                throw new Error("Server error");

            return response.json();
        })
        .then(data => {

            // ✅ JSON-level error handling (important)
            if (data.cod && data.cod !== 200) {
                throw new Error(data.message);
            }

            loading.style.display = "none";

            // Save cache
            cachedCity = city;
            cachedData = data;

            displayWeather(data);
        })
        .catch(error => {
            loading.style.display = "none";
            message.textContent = error.message;
            message.style.color = "red";
        });
}


// ---------- DISPLAY DATA ----------
function displayWeather(data) {

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    weatherCard.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${condition}</p>
    `;
}
