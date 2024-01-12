import axios from 'axios';

import { attachApiKeyInterceptor } from '../interceptors/attach-api-key-interceptor';

const api = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});
api.interceptors.request.use(attachApiKeyInterceptor);

export default api;
