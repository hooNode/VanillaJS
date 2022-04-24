const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, value, onSearch, onSearchRandom }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.autofocus = true;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.value = value;

    const $searchBtn = document.createElement("button");
    this.$searchBtn = $searchBtn;
    this.$searchBtn.className = "SearchBtn";
    this.$searchBtn.textContent = "랜덤검색!";

    this.value = value;

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);
    $target.appendChild(this.$searchBtn);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener("click", (e) => {
      if (e.target.value) this.$searchInput.value = "";
    });

    $searchBtn.addEventListener("click", () => {
      onSearchRandom();
    });
    console.log("SearchInput created.", this);
  }

  setState(nextData) {
    this.value = nextData;
    this.render();
  }

  render() {
    this.$searchInput.value = this.value;
  }
}
