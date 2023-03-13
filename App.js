import { Nav, NewsList } from './components/index.js';

class App {
  constructor($root) {
    this.$root = $root;
    this.state = {
      category: 'all',
      page: 1,
    };
    this.proxy = null;
    this.Navigation = null;
    this.NewsList = null;
  }

  trackProxy() {
    return new Proxy(this.state, {
      set: (target, prop, value) => {
        if (prop === 'category') {
          this.NewsList.clearList();

          const newState = {
            category: value,
            page: 1,
          };

          this.state = newState;
        } else if (prop === 'page') {
          this.NewsList.fetchNews(target.category, target.page);

          const newState = {
            category: this.state.category,
            page: value,
          };

          this.state = newState;
        } else {
          throw new Error('잘못된 접근입니다.');
        }

        return true;
      },
    });
  }

  watchScrollObserver() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      this.loadCurrentPage(target);
    }, options);

    observer.observe(this.NewsList.$scrollObserverDOM);
  }

  loadCurrentPage(target) {
    if (!target.isIntersecting) return;

    this.proxy.page += 1;
  }

  selectCategory(e) {
    if (e.target.className !== 'category-item') return;

    const categoryItems = [
      ...this.$root.getElementsByClassName('category-item'),
    ];

    categoryItems.forEach((categoryItem) => {
      categoryItem.classList.remove('active');
    });

    e.target.classList.add('active');

    this.proxy.category = e.target.id;
  }

  renderNav() {
    this.Navigation = new Nav(this.$root, this.selectCategory.bind(this));
    this.Navigation.init();
  }

  renderNewsList() {
    this.NewsList = new NewsList(this.$root);
    this.NewsList.init();
  }

  run() {
    this.proxy = this.trackProxy();
    this.renderNav();
    this.renderNewsList();
    this.watchScrollObserver();

    const categoryAll = this.$root.getElementsByClassName('category-item')[0];

    categoryAll.classList.add('active');
  }
}

const $root = document.getElementById('root');
const app = new App($root);

app.run();
