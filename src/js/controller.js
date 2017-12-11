import { APP_CONST } from './const/general';

export class Controller {

  /* Get HTML contents for sources aside */
  static getSourcesHtml(data) {
    if (!data.length) {
      return '';
    }

    const sources = data.map(source => `
        <li data-source-id="${source.id}">
            <a title="${source.name}" data-source-id="${source.id}">
                <img alt="${source.name}" class="icon" 
                    data-source-id="${source.id}"
                    src="https://icons.better-idea.org/icon?url=${source.url}&amp;size=16..32..48">
                <span class="link-text" data-source-id="${source.id}">${source.name}</span>
            </a>
        </li>`);

    return `<ul class="sources-list">${sources.join('')}</ul>`;
  }

  /* Get HTML for News contents */
  static getNewsHtml(data) {
    if (!data.length) {
      return '';
    }
    const { source: { name: sourceTitle = ''} } = data[0];

    const news = data.map((newsOne, index) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = (newsOne.publishedAt) ? new Date(newsOne.publishedAt) : null;
      return `<div class="grid-item item-${index + 1}">
        <div class="grid-item-inner">
        
        <div class="card" data-article-id="${newsOne.id}">
            <div class="thumb">
              ${(date && APP_CONST.newsShowDateLabel) ? `<div class="date">
                <div class="day">${date.getDate()}</div>
                <div class="month">${monthNames[date.getMonth()]}</div>
              </div>` : ''}
              <a href="${newsOne.url}" target="_blank">
                <img class="thumb-pic" src="${newsOne.urlToImage}"/>
              </a>
            </div>

            <article class="card-info">
              <a href="${newsOne.url}" class="card-info-title" target="_blank">${newsOne.title}</a>
              ${(newsOne.description) ? `<p class="card-info-desc">${newsOne.description.substring(0, APP_CONST.newsDescriptionLimit)}...</p>` : ''}
              ${(newsOne.author) ? `<span class="card-info-author">${newsOne.author.substring(0, APP_CONST.newsAuthorLimit)}` : ''}</span>
            </article>

        </div>

        </div>
    </div>`;
    });

    return `<h2 class="page-title">${sourceTitle}</h2><div class="news-grid clearfix">${news.join('')}</div>`;
  }
}
