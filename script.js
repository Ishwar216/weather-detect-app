const apiKey = "0576548be9ae427392d82505262102";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Enter city name");
        return;
    }
    fetchWeather(city);
}

function fetchWeather(query) {
    const weatherDiv = document.getElementById("weatherResult");
    const forecastDiv = document.getElementById("forecast");

    weatherDiv.innerHTML = "Loading...";
    forecastDiv.innerHTML = "";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                weatherDiv.innerHTML = "City not found!";
                return;
            }

            const current = data.current;
            weatherDiv.innerHTML = `
                <h2>${data.location.name}</h2>
                <img src="https:${current.condition.icon}" class="weather-icon">
                <p><strong>${current.temp_c}°C</strong></p>
                <p>${current.condition.text}</p>
            `;

            data.forecast.forecastday.forEach(day => {
                forecastDiv.innerHTML += `
                    <div class="forecast-day">
                        <p>${day.date}</p>
                        <img src="https:${day.day.condition.icon}" width="40">
                        <p>${day.day.avgtemp_c}°C</p>
                    </div>
                `;
            });
        })
        .catch(() => {
            weatherDiv.innerHTML = "Error fetching data";
        });
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(`${lat},${lon}`);
        });
    } else {
        alert("Geolocation not supported");
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
