const getSourcesHtml = (data) => {
  if (!data.length) {
    return;
  }
	let sources = data.map((source) => {
		return `<li data-source-id="${source.id}">
                <img
                    data-source-id="${source.id}"
                    alt="${source.name}"
                    class="icon"
                    src="https://icons.better-idea.org/icon?url=${source.url}&amp;size=16..32..48">
                <a data-source-id="${source.id}">${source.name}</a>
            </li>`;
	});
	return `<ul class="sources-list">${sources.join('')}</ul>`;
}
const getNewsHtml = (data) => {
  if (!data.length) {
    return;
  }
  let {source: {name: sourceTitle = ''}} = data[0];

	let news = data.map((newsOne, index) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = (newsOne.publishedAt) ? new Date(newsOne.publishedAt) : null;
    return `
    <div class="item-${++index}">
          <a href="${newsOne.url}" target="_blank" class="card">
            ${(date && SHOW_NEWS_DATE) ? `<div class="date">
              <div class="day">${date.getDate()}</div>
              <div class="month">${monthNames[date.getMonth()]}</div>
            </div>` : ''}
            <div class="thumb" style="background-image: url(${newsOne.urlToImage});"></div>
            <article>
              <h1>${newsOne.title}</h1>
              ${ (index > 1) ? `<p>${newsOne.description.substring(0,NEWS_DESCRIPTION_LIMIT)}...</p>` : ''}
              <span>${newsOne.author}</span>
            </article>
          </a>
    </div>
  `});
	return `<h2 class="page-title">${sourceTitle}</h2><div class="news-grid">${news.join('')}</div>`;
}

const CONTROLLER = (() => ({
		getSourcesHtml,
		getNewsHtml
	}))();
