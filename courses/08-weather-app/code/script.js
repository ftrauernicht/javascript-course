const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const result = document.getElementById("result");

const weatherCodes = {
  0: { text: "Clear sky", icon: "☀️" },
  1: { text: "Mainly clear", icon: "🌤️" },
  2: { text: "Partly cloudy", icon: "⛅" },
  3: { text: "Overcast", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  48: { text: "Depositing rime fog", icon: "🌫️" },
  51: { text: "Light drizzle", icon: "🌦️" },
  53: { text: "Moderate drizzle", icon: "🌦️" },
  55: { text: "Dense drizzle", icon: "🌧️" },
  61: { text: "Slight rain", icon: "🌧️" },
  63: { text: "Moderate rain", icon: "🌧️" },
  65: { text: "Heavy rain", icon: "🌧️" },
  71: { text: "Slight snowfall", icon: "🌨️" },
  73: { text: "Moderate snowfall", icon: "🌨️" },
  75: { text: "Heavy snowfall", icon: "❄️" },
  80: { text: "Rain showers", icon: "🌦️" },
  81: { text: "Rain showers", icon: "🌧️" },
  82: { text: "Violent rain showers", icon: "⛈️" },
  95: { text: "Thunderstorm", icon: "⛈️" },
};

function describeWeatherCode(code) {
  return weatherCodes[code] || { text: "Unknown", icon: "❓" };
}

async function getCoordinates(city) {
  const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1&language=en&format=json";
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found: " + city);
  }

  const place = data.results[0];
  return { latitude: place.latitude, longitude: place.longitude, name: place.name, country: place.country };
}

async function getCurrentWeather(latitude, longitude) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto";
  const response = await fetch(url);
  const data = await response.json();
  return data.current;
}

function renderLoading() {
  result.innerHTML = "<p>Loading...</p>";
}

function renderError(message) {
  result.innerHTML = '<p class="error">' + message + "</p>";
}

function renderWeather(place, weather) {
  const info = describeWeatherCode(weather.weather_code);
  result.innerHTML =
    '<div class="weather-card">' +
      "<h2>" + place.name + ", " + place.country + "</h2>" +
      '<p class="temperature">' + info.icon + " " + Math.round(weather.temperature_2m) + "°C</p>" +
      "<p>" + info.text + "</p>" +
      "<p>Wind: " + weather.wind_speed_10m + " km/h</p>" +
    "</div>";
}

async function handleSearch(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    return;
  }

  renderLoading();

  try {
    const place = await getCoordinates(city);
    const weather = await getCurrentWeather(place.latitude, place.longitude);
    renderWeather(place, weather);
  } catch (error) {
    renderError('Couldn\'t find weather for "' + city + '". Check the spelling and try again.');
  }
}

searchForm.addEventListener("submit", handleSearch);
