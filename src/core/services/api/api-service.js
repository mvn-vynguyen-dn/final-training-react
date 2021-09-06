import { extend } from 'umi-request';
const request = extend({
  prefix: process.env.REACT_APP_API
});


class ApiService {

  get(uri, data = {}, options = {}) {
    const {url, queryOptions} = this._infoHandler(uri, data, options, 'GET');
    return request.get(url, queryOptions)
  }

  _infoHandler(uri, data = {}, options = {}, type = '') {
    let url = uri;
    if (typeof uri === 'object') {
      Object.keys(uri).forEach((e) => {
        url = uri.endpoint.replace(`:${e}`, uri[e]);
      });
    }
    if (new RegExp(/^http/).test(uri)) {
      options['prefix'] = '';
    }
    if (type === 'GET') {
      options['params'] = data;
    } else {
      options['data'] = data;
    }
    const queryOptions = options;
    return {url, queryOptions};
  }

}

const apiService = new ApiService();
export {
  apiService
};
