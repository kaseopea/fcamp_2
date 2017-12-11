define('contentViewer', ['require', 'exports'], (require, exports) => {

  const DEFAULTS = {
    title: 'News Hole',
    url: ''
  };
  const ELEMENTS = {
    contentViewerElementTag: 'div',
    contentViewerId: 'content-viewer',
    closeButtonId: 'cv-close-button'
  };

  function ContentViewer(options) {
    this.cvElement = document.getElementById(ELEMENTS.contentViewerId);
    this.options = {
      title:options.title || DEFAULTS.title,
      url: options.url || DEFAULTS.url
    };
    this.init();
  }

  ContentViewer.prototype.init = function init() {
    if (!this.cvElement) {
      this.cvElement = this.createViewerMarkup();
    }

    // fill markup
    this.cvElement.innerHTML = this.setMarkup(this.options);

    // add event listener to close button
    const closeElement = document.getElementById(ELEMENTS.closeButtonId);
    closeElement.addEventListener('click', this.setCloseHandler.bind(this))

  };

  /* UTILS */
  ContentViewer.prototype.createViewerMarkup = function createViewerMarkup() {
    const div = document.createElement(ELEMENTS.contentViewerElementTag);
    div.setAttribute('id', ELEMENTS.contentViewerId);
    document.body.appendChild(div);
    return document.getElementById(ELEMENTS.contentViewerId);
  };

  ContentViewer.prototype.setMarkup = function setMarkup(options){
    return `
      <div class="content-viewer-inner">
        <div class="content-viewer-content">
            <div class="cv-header">
                <span class="cv-header-title">${options.title}</span>
                <button id="cv-close-button">Close</button>
            </div>
            <div class="cv-body">
                <iframe class="cv-iframe" src="${options.url}" width="100%" height="100%">Test</iframe>    
            </div>
        </div>
      </div>
    `;
  };
  ContentViewer.prototype.setCloseHandler = function setCloseHandler() {
    this.cvElement.innerHTML = '';
  };


  exports.ContentViewer = ContentViewer;


});