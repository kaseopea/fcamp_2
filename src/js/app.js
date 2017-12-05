import { CLIENT_MESSAGES } from './const/messages';
import { NewsClient } from './newsClient/client';
import { VIEW } from './view';
import { CONTROLLER } from './controller';
import { DEFAULT_KEYWORS } from './const/defaultKeywords';
import { ELEMENTS, SELECTORS } from './const/elements';
import { NEWSAPI_API_KEY } from './const/apiKey';

// Check if NewsClient is defined on the page
if (!NewsClient) {
  throw new Error(CLIENT_MESSAGES.error.noNewsClientDefined);
}

const newsClient = new NewsClient.NewsAPIClient(NEWSAPI_API_KEY);
const appView = new VIEW.Renderer();

export class App {
  init() {
    this.initNewsSources();
    this.loadDefaultNews(DEFAULT_KEYWORS);
    this.initResizeEventListener();
    this.initMainMenu();
  }

  /* ************ VIEW ACTIONS ************ */
  initNewsSources() {
    newsClient
      .getNewsSources()
      .then((data) => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.sourcesContent,
          CONTROLLER.getSourcesHtml(data),
        );
      })
      .catch(() => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.mainContent,
          this.getErrorMarkup(CLIENT_MESSAGES.error.noSourcesLoaded)
        );
      });
  }

  openSource(sourceId) {
    if (appView.isMobileView()) {
      appView.hideElement(ELEMENTS.sourcesContent);
    }

    if (sourceId) {
      appView.resetView(ELEMENTS.mainContent);
      appView.showElement(ELEMENTS.loader);
      this.loadNewsBySourceId(sourceId);
    }
  }

  // Logo click
  openIndex() {
    this.loadDefaultNews(DEFAULT_KEYWORS);
  }

  // Mobile Menu Button
  static toggleMenu() {
    if (appView.isHidden(ELEMENTS.sourcesContent)) {
      appView.showElement(ELEMENTS.sourcesContent);
      appView.addClass(document.body, SELECTORS.menuExpanded);
    } else {
      appView.hideElement(ELEMENTS.sourcesContent);
      appView.removeClass(document.body, SELECTORS.menuExpanded);
    }
  }

  /* ************ UTILS (Private) ************ */

  /* init menu */
  static initMainMenu() {
    if (appView.isMobileView() && !appView.isHidden(ELEMENTS.sourcesContent)) {
      appView.addClass(document.body, SELECTORS.menuExpanded);
    }
  }

  /* Load default news on startup */
  loadDefaultNews(keywords) {
    const query = keywords[Math.floor(Math.random() * keywords.length)];

    appView.resetView(ELEMENTS.mainContent);
    appView.showElement(ELEMENTS.loader);

    newsClient
      .getNewsByParam('q', query)
      .then((data) => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(ELEMENTS.mainContent, CONTROLLER.getNewsHtml(data));
      })
      .catch(() => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.mainContent,
          this.getErrorMarkup(CLIENT_MESSAGES.error.noNewsLoaded)
        );
      });
  }

  /* InitResizeEventListener */
  static initResizeEventListener() {
    window.addEventListener('resize', () => {
      if (appView.isMobileView()) {
        appView.hideElement(ELEMENTS.sourcesContent);
        appView.removeClass(document.body, SELECTORS.menuExpanded);
      } else {
        appView.showElement(ELEMENTS.sourcesContent);
      }
    });
  }

  /* Load news by source id */
  loadNewsBySourceId(sourceId) {
    appView.removeClass(document.body, SELECTORS.menuExpanded);
    newsClient
      .getNewsByParam('sources', sourceId)
      .then((data) => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(ELEMENTS.mainContent, CONTROLLER.getNewsHtml(data));
      })
      .catch(() => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.mainContent,
          this.getErrorMarkup(CLIENT_MESSAGES.error.noNewsLoaded)
        );
      });
  }

  /* Get Error Markup */
  static getErrorMarkup(message) {
    return `<div class="error-message">${message}</div>`;
  }
}
