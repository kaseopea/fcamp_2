// Check if NewsClient is defined on the page
if (!NewsClient) {
  throw new Error(CLIENT_MESSAGES.error.noNewsClientDefined);
}

const newsClient = new NewsClient.NewsAPIClient(NEWSAPI_API_KEY);
const appView = new VIEW.Renderer();

class App {
  /* init */
  init() {
    this.initNewsSources();
    this._loadDefaultNews(DEFAULT_KEYWORS);
	  this._initResizeEventListener();
	  this._initMainMenu();
  }

  /* Load news sources to aside */
  initNewsSources() {
    // Get News Sources
    newsClient
      .getNewsSources()
      .then(data => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.sourcesContent,
          CONTROLLER.getSourcesHtml(data)
        );
      })
      .catch(err => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.mainContent,
          this._getErrorMarkup(CLIENT_MESSAGES.error.noSourcesLoaded)
        );
      });
  }

  /* ************ VIEW ACTIONS ************ */
  openSource(sourceId) {
    if (appView.isMobileView()) {
      appView.hideElement(ELEMENTS.sourcesContent);
    }

    if (sourceId) {
      appView.resetView(ELEMENTS.mainContent);
      appView.showElement(ELEMENTS.loader);
      this._loadNewsBySourceId(sourceId);
    }
  }

  // Logo click
  openIndex() {
    this.loadDefaultNews(DEFAULT_KEYWORS);
  }

  // Mobile Menu Button
  toggleMenu() {
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
  _initMainMenu() {
	if (appView.isMobileView() && !appView.isHidden(ELEMENTS.sourcesContent)) {
		appView.addClass(document.body, SELECTORS.menuExpanded);
    }
  }

  /* Load default news on startup */
  _loadDefaultNews(keywords) {
    let query = keywords[Math.floor(Math.random() * keywords.length)];

    appView.resetView(ELEMENTS.mainContent);
    appView.showElement(ELEMENTS.loader);

    newsClient
      .getNewsByParam("q", query)
      .then(data => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(ELEMENTS.mainContent, CONTROLLER.getNewsHtml(data));
      })
      .catch(err => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.mainContent,
          this._getErrorMarkup(CLIENT_MESSAGES.error.noNewsLoaded)
        );
      });
  }

  /* InitResizeEventListener */
  _initResizeEventListener() {
    window.addEventListener("resize", () => {
      if (appView.isMobileView()) {
		appView.hideElement(ELEMENTS.sourcesContent);
		appView.removeClass(document.body, SELECTORS.menuExpanded);
      } else {
        appView.showElement(ELEMENTS.sourcesContent);
      }
    });
  }

  /* Load news by source id */
  _loadNewsBySourceId(sourceId) {
	appView.removeClass(document.body, SELECTORS.menuExpanded);
    newsClient
      .getNewsByParam("sources", sourceId)
      .then(data => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(ELEMENTS.mainContent, CONTROLLER.getNewsHtml(data));
      })
      .catch(err => {
        appView.hideElement(ELEMENTS.loader);
        appView.setView(
          ELEMENTS.mainContent,
          this._getErrorMarkup(CLIENT_MESSAGES.error.noNewsLoaded)
        );
      });
  }

  /* Get Error Markup */
  _getErrorMarkup(message) {
    return ` <div class="error-message">${message}</div>`
  }
}
