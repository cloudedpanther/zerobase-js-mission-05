import { makeDOMWithProperties } from "../utils/dom.js";

class Nav {
  constructor($root, selectCategory) {
    this.$root = $root;
    this.selectCategory = selectCategory;
    this.categoryItems = [
      {
        id: "all",
        title: "전체보기",
      },
      {
        id: "buisness",
        title: "비즈니스",
      },
      {
        id: "entertainment",
        title: "엔터테인먼트",
      },
      {
        id: "health",
        title: "건강",
      },
      {
        id: "science",
        title: "과학",
      },
      {
        id: "sports",
        title: "스포츠",
      },
      {
        id: "technology",
        title: "기술",
      },
    ];
  }

  createNavigationDOM() {
    const $navigationDOM = makeDOMWithProperties("nav", {
      className: "category-list",
    });

    const $categoryItemListDOM = makeDOMWithProperties(
      "ul",
      {}
    );

    this.categoryItems.forEach((categoryItem) => {
      const $categoryItemDOM = makeDOMWithProperties("li", {
        className: "category-item",
        id: categoryItem.id,
        innerHTML: categoryItem.title,
      });

      $categoryItemListDOM.appendChild($categoryItemDOM);
    });

    $navigationDOM.appendChild($categoryItemListDOM);

    return $navigationDOM;
  }

  init() {
    const $navigationDOM = this.createNavigationDOM();

    this.$root.appendChild($navigationDOM);

    // this.$root
    //   .getElementsByClassName(
    //     "category-item"
    //   )[0]
    //   .classList.add("active");

    $navigationDOM.addEventListener(
      "click",
      this.selectCategory
    );
  }
}

export default Nav;
