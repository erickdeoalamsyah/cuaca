const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city, country) => {
  try {
    const locationQuery = country ? `${city},${country}` : city;
    const response = await fetch(
      `${BASE_URL}/forecast?q=${locationQuery}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== '200') {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
};

/**
 * Fetch weather data by geographical coordinates.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<Object>} - Weather data for the coordinates.
 */
export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== '200') {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error.message);
    throw error;
  }
};
