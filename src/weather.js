const axios = require('axios');

import { sendDM } from './notification'
import { WEATHER_API_KEY, LATITUDE, LONGITUDE, USER_ID, MIN_TEMP, SINCE_LAST } from './json';

const getWeatherData = async () => {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${LATITUDE},${LONGITUDE}&days=2`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export default checkWeatherConditions = async () => {
  if (!USER_ID) {
    console.error('No user to send alerts to.');
    return;
  }

  const weatherData = await getWeatherData(client);
  if (!weatherData) return;

  const tomorrowForecast = weatherData.forecast.forecastday[1];
  const currentHourRainData = weatherData.forecast.forecastday[0].hour;

  const minTempTomorrow = tomorrowForecast.day.mintemp_c;
  if (minTempTomorrow < MIN_TEMP) {
    sendDM(client, USER_ID, 'Temperature Alert', `The temperature will drop below 10°C tomorrow with a minimum of ${minTempTomorrow}°C.`);
  }

  const lastRain = currentHourRainData.find(hour => hour.precip_mm > 0);
  if (lastRain) {
    const lastRainTime = new Date(lastRain.time);
    const hoursSinceLastRain = (Date.now() - lastRainTime) / (1000 * 60 * 60);
    if (hoursSinceLastRain >= SINCE_LAST) {
      sendDM(client, USER_ID, 'Rain Alert', 'It has not rained for over 36 hours.');
    }
  }
}