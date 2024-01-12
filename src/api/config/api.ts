import axios from 'axios';

import { interceptor } from '../interceptors/interceptor';

const api = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});
api.interceptors.request.use(interceptor);

export default api;
