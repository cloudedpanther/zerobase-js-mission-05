import { Nav, NewsList } from "./components/index.js";

class App {
  constructor($root) {
    this.$root = $root;
  }

  selectCategory(e) {
    if (e.target.className !== "category-item") return;

    const categoryItems = [
      ...this.$root.getElementsByClassName("category-item"),
    ];

    categoryItems.forEach((categoryItem) => {
      categoryItem.classList.remove("active");
    });

    e.target.classList.add("active");

    this.fetchNews(e.target.id);
  }

  fetchNews(category) {
    console.log(category);
  }

  renderNav() {
    const navigation = new Nav(
      this.$root,
      this.selectCategory.bind(this)
    );
    navigation.init();

    const categoryAll =
      this.$root.getElementsByClassName("category-item")[0];

    categoryAll.classList.add("active");
    this.fetchNews("all");
  }

  run() {
    this.renderNav();
  }
}

const $root = document.getElementById("root");
const app = new App($root);

app.run();
