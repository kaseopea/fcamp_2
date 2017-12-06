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
  }

  init() {
    this.initNewsSources();
    this.loadDefaultNews(DEFAULT_KEYWORS);
    App.initResizeEventListener();
    App.initMainMenu();

    ELEMENTS.logo.addEventListener('click', this.logoClickHandler.bind(this));
  }

  /* ************************ VIEW ACTIONS ************************ */
  initNewsSources() {
    this.newsClient
      .getNewsSources()
      .then((data) => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(
          ELEMENTS.sourcesContent,
          Controller.getSourcesHtml(data),
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

  sourceListClickHandler(event) {
    this.openSource(event.target.getAttribute('data-source-id'));
    event.stopPropagation();
  }

  /* ************************ UTILS (Private) ************************ */

  /* init menu */
  static initMainMenu() {
    if (ViewRenderer.isMobileView() && !ViewRenderer.isHidden(ELEMENTS.sourcesContent)) {
      ViewRenderer.addClass(document.body, ELEMENTS.menuExpandedClass);
    }
  }

  /* Load default news on startup */
  loadDefaultNews(keywords) {
    const query = keywords[Math.floor(Math.random() * keywords.length)];

    ViewRenderer.resetView(ELEMENTS.mainContent);
    ViewRenderer.showElement(ELEMENTS.loader);

    this.newsClient
      .getNewsByParam('q', query)
      .then((data) => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(ELEMENTS.mainContent, Controller.getNewsHtml(data));
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
    ViewRenderer.removeClass(document.body, ELEMENTS.menuExpandedClass);
    this.newsClient
      .getNewsByParam('sources', sourceId)
      .then((data) => {
        ViewRenderer.hideElement(ELEMENTS.loader);
        ViewRenderer.setView(ELEMENTS.mainContent, Controller.getNewsHtml(data));
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
