import('./modules/weather-service.js').then((service) => {
  console.time('weather-test');
  service.getCurrentWeather('Cluj').then((data) => {
    console.timeEnd('weather-test'); // Ar trebui să arate ~1000ms
    console.log('Received data:', data);
    console.log('City updated?', data.name === 'Cluj');
  });
});

import * as ui from './modules/ui-controller.js';
import { MOCK_DATA } from './modules/config.js';

console.log('Elements found:', Object.keys(ui.elements));

ui.showLoading();

setTimeout(() => {
  ui.displayWeather(MOCK_DATA);
}, 1000);

import { elements, showLoading, hideLoading, showError, displayWeather, getCityInput, clearInput } from './modules/ui-controller.js';
import { getCurrentWeather } from './modules/weather-service.js';

// Funcție pentru validarea numelui orașului
const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

// Funcția care gestionează căutarea
const handleSearch = async () => {
  const city = getCityInput().trim();

  if (!isValidCity(city)) {
    showError('Te rog introdu un nume de oraș valid (minim 2 caractere, fără cifre sau simboluri).');
    return;
  }

  showLoading();
  try {
    const data = await getCurrentWeather(city);
    hideLoading();
    displayWeather(data);
    clearInput();
  } catch (error) {
    hideLoading();
    showError('Eroare la preluarea datelor. Încearcă din nou!');
  }
};

// Setează event listeneri pentru buton și Enter în input
const setupEventListeners = () => {
  elements.searchBtn.addEventListener('click', handleSearch);

  elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  });
};

// Inițializează aplicația: arată vremea pentru un oraș default și activează event listenerii
const init = () => {
  displayWeather(MOCK_DATA); // afișează datele mock inițial
  setupEventListeners();
};

init();