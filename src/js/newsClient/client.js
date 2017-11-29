class NewsAPIClient {
	constructor(apiKey) {
		this.apikey = apiKey;
	}

	getNewsSources() {
		return new Promise((resolve, reject) => {
			let {url, params = {}} = API_URLS.sources;

			fetch(this.getUrl(url, params))
			.then((response) => response.json())
			.then((data) => resolve(data.sources))
			.catch((err) => reject(err.message));
		});
	}
	getNewsByParam(param, value) {
		return new Promise((resolve, reject) => {
			let {url, params = {}} = API_URLS.news;
			fetch(this.getUrl(url, Object.assign({}, params, {
				[param]: value
			})))
			.then((response) => response.json())
			.then((data) => resolve(data.articles))
			.catch((err) => reject(err.message));
		});
	}

	/* UTILS */
	getUrl(url, params) {
		let paramsObj = [];
		params.apikey = this.apikey;
		for (let key in params) {
			paramsObj.push(`${key}=${encodeURIComponent(params[key])}`);
		}
		return `${url}?${paramsObj.join('&')}`;
	}
}
const NewsClient = (() => ({NewsAPIClient}))();
