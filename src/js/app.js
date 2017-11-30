// Check if NewsClient is defined on the page
if (!NewsClient) {
	throw new Error(CLIENT_MESSAGES.error.noNewsClientDefined);
}

const ELEMENTS = {
	sourcesContent: document.getElementById('sources-content'),
	loader: document.getElementById('loader'),
	mainContent: document.getElementById('main-content'),
	errorMessage: document.querySelector('.error-message'),
	logo: document.querySelector('.logo'),
	menuButton: document.querySelector('.menu-button')
};

const newsClient = new NewsClient.NewsAPIClient(NEWSAPI_API_KEY);
const appView = new VIEW.Renderer();


// Load default random news
loadDefaultNews(DEFAULT_KEYWORS);

// Get News Sources
newsClient.getNewsSources()
	.then((data) => {
		appView.hideElement(ELEMENTS.loader);
		appView.setView(ELEMENTS.sourcesContent, CONTROLLER.getSourcesHtml(data));
	})
	.catch((err) => {
		appView.hideElement(ELEMENTS.loader);
		appView.showElement(ELEMENTS.errorMessage);
		appView.setView(ELEMENTS.errorMessage, CLIENT_MESSAGES.error.noSourcesLoaded);
	});

function openSource(sourceId) {
	if (appView.isMobileView()) {
		appView.hideElement(ELEMENTS.sourcesContent);
	}

	if (sourceId) {
		appView.resetView(ELEMENTS.mainContent);
		appView.showElement(ELEMENTS.loader);
		loadNewsBySourceId(sourceId);
	}
}

// Logo click
function openIndex() {
	loadDefaultNews(DEFAULT_KEYWORS);
}

// Mobile Menu Button
function toggleMenu() {
	appView.isHidden(ELEMENTS.sourcesContent) ?
	appView.showElement(ELEMENTS.sourcesContent): appView.hideElement(ELEMENTS.sourcesContent);
}

window.addEventListener('resize', () => {
	if (!appView.isMobileView()) {
		appView.showElement(ELEMENTS.sourcesContent);
	}
});

/* **********************************************************************
	UTILS
********************************************************************** */

/**
 * Load default news on startup
 * @param {*} keywords
 */
function loadDefaultNews(keywords) {
	let query = keywords[Math.floor(Math.random() * keywords.length)];

	appView.resetView(ELEMENTS.mainContent);
	appView.showElement(ELEMENTS.loader);

	newsClient.getNewsByParam('q', query)
		.then((data) => {
			appView.hideElement(ELEMENTS.loader);
			appView.setView(ELEMENTS.mainContent, CONTROLLER.getNewsHtml(data));
		})
		.catch((err) => {
			appView.hideElement(ELEMENTS.loader);
			appView.showElement(ELEMENTS.errorMessage);
			appView.setView(ELEMENTS.errorMessage, CLIENT_MESSAGES.error.noNewsLoaded);
		});
}

/**
 * Load news by source id
 * @param {*} sourceId
 */
function loadNewsBySourceId(sourceId) {
	newsClient.getNewsByParam('sources', sourceId).then((data) => {
		appView.hideElement(ELEMENTS.loader);
		appView.setView(ELEMENTS.mainContent, CONTROLLER.getNewsHtml(data));
	})
	.catch((err) => {
		appView.hideElement(ELEMENTS.loader);
		appView.showElement(ELEMENTS.errorMessage);
		appView.setView(ELEMENTS.errorMessage, CLIENT_MESSAGES.error.noNewsLoaded);
	});
}
