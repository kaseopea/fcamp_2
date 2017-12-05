import { API_URLS } from './config';

class NewsAPIClient {
  constructor(apiKey) {
    this.apikey = apiKey;
  }

  getNewsSources() {
    return new Promise((resolve, reject) => {
      const {url, params = {}} = API_URLS.sources;
      fetch(this.getUrl(url, params))
        .then(response => response.json())
        .then(data => resolve(data.sources))
        .catch(err => reject(err.message));
    });
  }

  getNewsByParam(param, value) {
    return new Promise((resolve, reject) => {
      const {url, params = {}} = API_URLS.news;
      fetch(this.getUrl(url, Object.assign({}, params, {
        [param]: value
      })))
        .then(response => response.json())
        .then(data => resolve(data.articles))
        .catch(err => reject(err.message));
    });
  }

  /* UTILS */
  getUrl(url, params) {
    const paramsObj = [];
    params.apikey = this.apikey;
    for (const key in params) {
      paramsObj.push(`${key}=${encodeURIComponent(params[key])}`);
    }
    return `${url}?${paramsObj.join('&')}`;
  }
}

export const NewsClient = (() => ({
  NewsAPIClient
}))();
