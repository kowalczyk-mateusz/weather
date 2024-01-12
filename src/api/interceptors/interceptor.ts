import { InternalAxiosRequestConfig } from 'axios';

export const interceptor = (config: InternalAxiosRequestConfig) => {
  config.params = config.params || {};
  config.params['appid'] = process.env.API_KEY;
  config.params['units'] = 'metric';
  return config;
};
