class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("section");
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
    if (!this.data.length && localStorage.getItem("keyword")) {
      this.$searchResult.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; width: 400%; height: 50vh; font-size: 24px; font-weight: bold;">
            <p>찾으시는 데이터가 없습니다.</p>
        </div>
      `;
    } else {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
          <article class="item">
            <img src=${cat.url} alt=${cat.name} />
          </article>
        `
        )
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data?.[index]);
        });
      });
    }
  }
}
