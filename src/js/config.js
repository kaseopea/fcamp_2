/* API SETTINGS  */
const NEWSAPI_API_KEY = 'd9c1944567eb4d618cda98a9a83cf21f';

/* NEWS  SETTINGS  */
const NEWS_DESCRIPTION_LIMIT = 200;
const NEWS_AUTHOR_LIMIT = 30;
const SHOW_NEWS_DATE = true;
const DEFAULT_KEYWORS = [
	'google',
	'microsoft',
	'android',
	'apple',
	'black friday',
	'xbox',
	'games',
	'russia',
	'usa',
	'europe',
];

/* GENERAL SETTINGS */
const MOBILE_BREAKPOINT = 1024;


/* ElEMENTS & SELECTORS */
const ELEMENTS = {
	sourcesContent: document.getElementById('sources-content'),
	loader: document.getElementById('loader'),
	mainContent: document.getElementById('main-content'),
	errorMessage: document.querySelector('.error-message'),
	logo: document.querySelector('.logo'),
	menuButton: document.querySelector('.menu-button')
};
const SELECTORS = {
	menuExpanded: 'menu-expanded'
};
