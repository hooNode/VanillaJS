const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, recentKeywords, getSearchData }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      if (e.keyCode === 13 && e.target.value !== "") {
        getSearchData(e.target.value);
        onSearch(e.target.value);
      }
      localStorage.setItem("keyword", e.target.value);
    });

    this.data = recentKeywords;
    this.getSearchData = getSearchData;

    this.$searchInput.addEventListener("click", (e) => {
      if (e.target.value) e.target.value = "";
    });
    this.$searchInput.addEventListener("keydown", (e) => {});

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchInput.focus();
  }
}
