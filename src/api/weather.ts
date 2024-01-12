import { Weather } from '@/types/responses/weather';
import { WeatherForecast } from '@/types/responses/weather-forecast';

import api from './config/api';

const fetchWeatherByCityName = async (cityName: string): Promise<Weather> => {
  const { data } = await api.get('/weather', {
    params: {
      q: cityName,
    },
  });

  return data;
};

const fetchWeatherForecastByCityName = async (
  cityName: string
): Promise<WeatherForecast> => {
  const { data } = await api.get('/forecast', {
    params: {
      q: cityName,
    },
  });

  return data;
};

const fetchWeatherByCityCords = async (
  lat: number,
  lon: number
): Promise<Weather> => {
  const { data } = await api.get('/weather', {
    params: {
      lat,
      lon,
    },
  });

  return data;
};

const weatherApi = {
  fetchWeatherByCityName,
  fetchWeatherForecastByCityName,
  fetchWeatherByCityCords,
};

export default weatherApi;
