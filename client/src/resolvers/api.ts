import Cookies from 'universal-cookie';
import { ApiErrors } from '../shared/types/error';

export const callApi = (method: string, params: {[key: string]: string | number} = {}) => {
  const cookies = new Cookies();
  const accessToken = cookies.get('access_token');
  if (accessToken) {
    params = {
      ...params,
      accessToken,
    };
  }
  const urlParams = Object.keys(params).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');

  return fetch(process.env.API_SERVER + `/api/${method}` + (urlParams ? `?${urlParams}` : ''))
    .then((response) => response.json())
    .then((response) => {
      if (response.response) {
        return response.response;
      } else {
        switch (response.error.code) {
        case ApiErrors.INVALID_ACCESS_TOKEN:
          cookies.remove('access_token');
          location.reload();
          break;
        default:
          throw new Error(response.error.message);
        }
      }
    });
};
