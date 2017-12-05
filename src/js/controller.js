const getSourcesHtml = (data) => {
  if (!data.length) {
    return;
  }
	let sources = data.map((source) => {
		return `<li onclick="app.openSource('${source.id}')" data-source-id="${source.id}">
                <a data-source-id="${source.id}" title="${source.name}">
                <img data-source-id="${source.id}" alt="${source.name}" class="icon" src="https://icons.better-idea.org/icon?url=${source.url}&amp;size=16..32..48"> <span class="link-text">${source.name}</span></a>
            </li>`;
	});
	return `<ul class="sources-list">${sources.join('')}</ul>`;
};

const getNewsHtml = (data) => {
  if (!data.length) {
    return;
  }
  let {source: {name: sourceTitle = ''}} = data[0];

	let news = data.map((newsOne, index) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = (newsOne.publishedAt) ? new Date(newsOne.publishedAt) : null;
    return `<div class="grid-item item-${++index}">
        <div class="grid-item-inner">
        
        <div class="card">
            <div class="thumb">
              ${(date && SHOW_NEWS_DATE) ? `<div class="date">
                <div class="day">${date.getDate()}</div>
                <div class="month">${monthNames[date.getMonth()]}</div>
              </div>` : ''}
              <a href="${newsOne.url}" target="_blank">
                <img class="thumb-pic" src="${newsOne.urlToImage}"/>
              </a>
            </div>

            <article class="card-info">
              <a href="${newsOne.url}" class="card-info-title" target="_blank">${newsOne.title}</a>
              <p class="card-info-desc">${newsOne.description.substring(0,NEWS_DESCRIPTION_LIMIT)}...</p>
              ${ (newsOne.author) ? `<span class="card-info-author">${newsOne.author.substring(0,NEWS_AUTHOR_LIMIT)}` : ''}</span>
            </article>

        </div>

        </div>
    </div>`});
	return `<h2 class="page-title">${sourceTitle}</h2><div class="news-grid clearfix">${news.join('')}</div>`;
};

const CONTROLLER = (() => ({
		getSourcesHtml,
		getNewsHtml
	}))();
