import { MOCK_DATA } from './config.js';

export const getCurrentWeather = async (city) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // delay 1s

    // Clonează obiectul MOCK_DATA și actualizează orașul
    const data = structuredClone(MOCK_DATA);
    data.name = city;
    return data;
  } catch (error) {
    console.error('Eroare la getCurrentWeather:', error);
    throw new Error('Nu s-au putut obține datele meteo');
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // delay 1s

    const data = structuredClone(MOCK_DATA);
    data.coord.lat = lat;
    data.coord.lon = lon;
    return data;
  } catch (error) {
    console.error('Eroare la getWeatherByCoords:', error);
    throw new Error('Nu s-au putut obține datele meteo');
  }
};
