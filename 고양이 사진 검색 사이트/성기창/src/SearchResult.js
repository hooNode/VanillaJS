class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.isLoading) {
      this.$searchResult.innerHTML = `
          <div class="Loading">
            <img src="src/images/loading.gif"/>
          </div>`;
    } else {
      if (!this.data.searchList.length && this.data.isEnd) {
        this.$searchResult.innerHTML = `
          <div class="Loading">
            <img src="src/images/noSearchResult.png"/>
          </div>`;
      } else {
        this.$searchResult.innerHTML = this.data.searchList
          .map(
            (cat) => `
              <div class="item">
                <img src=${cat.url} alt=${cat.name} loading="lazy"/>
              </div>
            `
          )
          .join("");

        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", () => {
            this.onClick(this.data.searchList[index]);
          });
          $item.addEventListener("mouseover", () => {
            $item.title = this.data.searchList[index].name;
          });
        });
      }
    }
  }
}
