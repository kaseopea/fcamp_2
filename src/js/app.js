import '../assets/apple-touch-icon.png';
import '../assets/favicon.ico';
import '../assets/favicon-16x16.png';
import '../assets/favicon-32x32.png';

import { ViewRenderer } from './view';
import { Controller } from './controller';
import { NewsAPIClient } from './newsClient/client';
import { NEWSAPI_API_KEY } from './const/apiKey';
import { CLIENT_MESSAGES } from './const/messages';
import { DEFAULT_KEYWORS } from './const/defaultKeywords';
import { ELEMENTS } from './const/elements';

export class App {

  constructor() {
    this.newsClient = new NewsAPIClient(NEWSAPI_API_KEY);
    this.controller = Controller;
    this.viewRenderer = ViewRenderer;
    this.activeNews = null;
  }

  init() {
    this.initNewsSources();
    this.loadDefaultNews(DEFAULT_KEYWORS);
    App.initResizeEventListener();
    App.initMainMenu();


    ELEMENTS.logo.addEventListener('click', this.logoClickHandler.bind(this));
    ELEMENTS.mainContent.addEventListener('click', this.articleClickHandler.bind(this));
    ELEMENTS.menuButton.addEventListener('click', this.toggleMenu.bind(this));
  }

  /* ************************ VIEW ACTIONS ************************ */
  initNewsSources() {
    const that = this;
    this.newsClient
      .getNewsSources()
      .then((data) => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(
          ELEMENTS.sourcesContent,
          that.controller.getSourcesHtml(data),
        );

        ELEMENTS.sourcesList[0].addEventListener('click', this.sourceListClickHandler.bind(this));
      })
      .catch(() => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(
          ELEMENTS.mainContent,
          App.getErrorMarkup(CLIENT_MESSAGES.error.noSourcesLoaded)
        );
      });
  }

  openSource(sourceId) {
    if (ViewRenderer.isMobileView()) {
      ViewRenderer.hideElement(ELEMENTS.sourcesContent);
    }

    if (sourceId) {
      ViewRenderer.resetView(ELEMENTS.mainContent);
      ViewRenderer.showElement(ELEMENTS.loader);
      this.loadNewsBySourceId(sourceId);
    }
  }

  logoClickHandler() {
    this.loadDefaultNews(DEFAULT_KEYWORS);
  }

  articleClickHandler (event) {
    event.preventDefault();
    App.initContentViewer(this.getArticleData(event.target));
  }

  // Mobile Menu Button
  toggleMenu() {
    if (this.viewRenderer.isHidden(ELEMENTS.sourcesContent)) {
      this.viewRenderer.showElement(ELEMENTS.sourcesContent);
      this.viewRenderer.addClass(document.body, ELEMENTS.menuExpandedClass);
    } else {
      this.viewRenderer.hideElement(ELEMENTS.sourcesContent);
      this.viewRenderer.removeClass(document.body, ELEMENTS.menuExpandedClass);
    }
  }

  getArticleData(element) {
    let output = null;
    if (element && element.dataset && element.dataset.articleId) {
      const newsId = parseInt(element.dataset.articleId, 10);
      if (this.activeNews) {
        const activeArticle = this.activeNews.filter(news => news.id === newsId);
        output = {
           title: activeArticle[0].title,
           url: activeArticle[0].url
         }
      }
    } else {
      output = (element.parentNode) ? this.getArticleData(element.parentNode) : null;
    }

    return output;
  }

  sourceListClickHandler(event) {
    this.openSource(event.target.getAttribute('data-source-id'));
    event.stopPropagation();
  }

  /* ************************ UTILS (Private) ************************ */
  static initContentViewer(config) {
    require.ensure(['./contentViewer'], (require) => {
      const cv = require('./contentViewer');
      const cViewer = new cv.ContentViewer(config);
      return cViewer;
    });
  }

  /* init menu */
  static initMainMenu() {
    if (ViewRenderer.isMobileView() && !ViewRenderer.isHidden(ELEMENTS.sourcesContent)) {
      ViewRenderer.addClass(document.body, ELEMENTS.menuExpandedClass);
    }
  }

  /* Load default news on startup */
  loadDefaultNews(keywords) {
    const query = keywords[Math.floor(Math.random() * keywords.length)];
    const that = this;

    ViewRenderer.resetView(ELEMENTS.mainContent);
    ViewRenderer.showElement(ELEMENTS.loader);

    this.newsClient
      .getNewsByParam('q', query)
      .then((data) => {
        that.activeNews = data;
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(ELEMENTS.mainContent, that.controller.getNewsHtml(data));
      })
      .catch(() => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(
          ELEMENTS.mainContent,
          App.getErrorMarkup(CLIENT_MESSAGES.error.noNewsLoaded)
        );
      });
  }

  /* InitResizeEventListener */
  static initResizeEventListener() {
    window.addEventListener('resize', () => {
      if (ViewRenderer.isMobileView()) {
        ViewRenderer.hideElement(ELEMENTS.sourcesContent);
        ViewRenderer.removeClass(document.body, ELEMENTS.menuExpandedClass);
      } else {
        ViewRenderer.showElement(ELEMENTS.sourcesContent);
      }
    });
  }

  /* Load news by source id */
  loadNewsBySourceId(sourceId) {
    const that = this;
    ViewRenderer.removeClass(document.body, ELEMENTS.menuExpandedClass);
    this.newsClient
      .getNewsByParam('sources', sourceId)
      .then((data) => {
        that.activeNews = data;
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(ELEMENTS.mainContent, that.controller.getNewsHtml(data));
      })
      .catch(() => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(
          ELEMENTS.mainContent,
          App.getErrorMarkup(CLIENT_MESSAGES.error.noNewsLoaded)
        );
      });
  }

  /* Get Error Markup */
  static getErrorMarkup(message) {
    return `<div class="error-message">${message}</div>`;
  }
}
