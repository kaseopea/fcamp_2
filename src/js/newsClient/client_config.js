const API_URLS = {
  sources: {
    url: "https://newsapi.org/v2/sources",
    params: {
      language: "en"
    }
  },
  news: {
    url: "https://newsapi.org/v2/top-headlines"
  }
};

const CLIENT_MESSAGES = {
  error: {
    noNewsClientDefined: "NewsClient lib is not loaded(",
    noSourcesLoaded: "No sources avaliable. Try again later",
    noNewsLoaded: "No news avaliable. Try again later"
  }
};
