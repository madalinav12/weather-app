// ui-controller.js

// Convertim Unix timestamp în oră locală (format simplu: HH:MM)
const formatTime = (unixSeconds, timezoneOffset = 0) => {
  // Ajustăm timpul cu fusul orar (în secunde)
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Funcție care returnează un emoji pe baza tipului principal de vreme
const getWeatherIcon = (description) => {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
  };
  return icons[description] || "🌈";
};

export const elements = {
  cityInput: document.querySelector('#city-input'),
  searchBtn: document.querySelector('#search-btn'),
  locationBtn: document.querySelector('#location-btn'),
  loading: document.querySelector('#loading'),
  error: document.querySelector('#error'),
  weatherDisplay: document.querySelector('#weather-display'),
  cityName: document.querySelector('#city-name'),
  temp: document.querySelector('#temp'),
  description: document.querySelector('#description'),
  humidity: document.querySelector('#humidity'),
  wind: document.querySelector('#wind'),
  sunrise: document.querySelector('#sunrise'),
  sunset: document.querySelector('#sunset'),
  icon: document.querySelector('#weather-icon'), // element pentru iconița meteo
};

export const showLoading = () => {
  elements.loading.classList.remove('hidden');
  elements.error.classList.add('hidden');
  elements.weatherDisplay.classList.add('hidden');
};

export const hideLoading = () => {
  elements.loading.classList.add('hidden');
};

export const showError = (message) => {
  elements.error.textContent = message;
  elements.error.classList.remove('hidden');
  elements.loading.classList.add('hidden');
  elements.weatherDisplay.classList.add('hidden');
};

export const clearError = () => {
  elements.error.classList.add('hidden');
  elements.error.textContent = '';
};

export const displayWeather = (data) => {
  clearError();

  elements.cityName.textContent = data.name || 'N/A';
  elements.temp.textContent = `${Math.round(data.main.temp)}°C`;
  elements.description.textContent = data.weather[0].description || '';
  elements.humidity.textContent = `Umiditate: ${data.main.humidity}%`;
  elements.wind.textContent = `Vânt: ${(data.wind.speed * 3.6).toFixed(1)} km/h`;

  // Afișează răsărit și apus ajustat pentru fusul orar
  const timezoneOffset = data.timezone || 0;
  elements.sunrise.textContent = `Răsărit: ${formatTime(data.sys.sunrise, timezoneOffset)}`;
  elements.sunset.textContent = `Apus: ${formatTime(data.sys.sunset, timezoneOffset)}`;

  // Afișează iconița meteo
  if (elements.icon && data.weather && data.weather[0] && data.weather[0].main) {
    elements.icon.textContent = getWeatherIcon(data.weather[0].main);
  } else {
    elements.icon.textContent = ''; // sau un fallback
  }

  elements.weatherDisplay.classList.remove('hidden');
  elements.loading.classList.add('hidden');
};

export const getCityInput = () => elements.cityInput.value.trim();

export const clearInput = () => {
  elements.cityInput.value = '';
};