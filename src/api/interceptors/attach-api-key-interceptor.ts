import { InternalAxiosRequestConfig } from 'axios';

export const attachApiKeyInterceptor = (config: InternalAxiosRequestConfig) => {
  config.params = config.params || {};
  config.params['appid'] = process.env.API_KEY;
  config.params['units'] = 'metric';
  return config;
};
