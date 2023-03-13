import makeDOMWithProperties from '../utils/dom.js';
import {
  DEFAULT_IMG,
  NEWS_API_KEY,
  NEWS_BASIC_URL,
} from '../constants/constant.js';

const createNewsItemDOM = (newsItem) => {
  const { url, urlToImage, title, description } = newsItem;

  const $newsItemDOM = makeDOMWithProperties('section', {
    className: 'news-item',
  });

  const $thumbnailDOM = makeDOMWithProperties('div', {
    className: 'thumbnail',
  });

  const $thumbnailLinkDOM = makeDOMWithProperties('a', {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
  });

  const $thumbnailImageDOM = makeDOMWithProperties('img', {
    src: urlToImage || DEFAULT_IMG,
    alt: 'thumbnail',
  });

  $thumbnailLinkDOM.appendChild($thumbnailImageDOM);
  $thumbnailDOM.appendChild($thumbnailLinkDOM);

  const $contentsDOM = makeDOMWithProperties('div', {
    className: 'contents',
  });

  const $contentsTitleDOM = makeDOMWithProperties('h2', {});

  const $contentsTitleLinkDOM = makeDOMWithProperties('a', {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
    innerText: `${title}`,
  });

  $contentsTitleDOM.appendChild($contentsTitleLinkDOM);

  const $contentsDetailDOM = makeDOMWithProperties('p', {
    innerText: description || '',
  });

  $contentsDOM.appendChild($contentsTitleDOM);
  $contentsDOM.appendChild($contentsDetailDOM);

  $newsItemDOM.appendChild($thumbnailDOM);
  $newsItemDOM.appendChild($contentsDOM);

  return $newsItemDOM;
};

const createNewsItemDOMList = (newsItemList) => {
  const newsItemDOMList = [];

  newsItemList.forEach((newsItem) => {
    const $newsItemDOM = createNewsItemDOM(newsItem);
    newsItemDOMList.push($newsItemDOM);
  });

  return newsItemDOMList;
};

class NewsList {
  constructor($root) {
    this.$root = $root;
    this.$newsListContainerDOM = null;
    this.$newsListDOM = null;
    this.$scrollObserverDOM = null;
  }

  createContainerDOM() {
    this.$newsListContainerDOM = makeDOMWithProperties('div', {
      className: 'news-list-container',
    });

    this.$newsListDOM = makeDOMWithProperties('article', {
      className: 'news-list',
    });

    this.$newsListContainerDOM.appendChild(this.$newsListDOM);

    this.$root.appendChild(this.$newsListContainerDOM);
  }

  createScrollObserverDOM() {
    this.$scrollObserverDOM = makeDOMWithProperties('div', {
      className: 'scroll-observer',
    });

    this.$scrollObserverImageDOM = makeDOMWithProperties('img', {
      src: 'img/ball-triangle.svg',
      alt: 'Loading...',
    });

    this.$scrollObserverDOM.appendChild(this.$scrollObserverImageDOM);
    this.$newsListContainerDOM.appendChild(this.$scrollObserverDOM);
  }

  async fetchNews(category, page) {
    try {
      const PAGE_SIZE = 5;

      const response = await axios.get(
        `${NEWS_BASIC_URL}&category=${
          category === 'all' ? '' : category
        }&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`,
      );

      const newsItemList = response.data.articles;

      this.render(newsItemList);
    } catch (error) {
      console.error(error);
    }
  }

  clearList() {
    this.$newsListDOM.innerHTML = '';
  }

  render(newsItemList) {
    const newsItemDOMList = createNewsItemDOMList(newsItemList);

    newsItemDOMList.forEach(($newsItemDOM) => {
      this.$newsListDOM.appendChild($newsItemDOM);
    });
  }

  init() {
    this.createContainerDOM();
    this.createScrollObserverDOM();
  }
}

export default NewsList;
