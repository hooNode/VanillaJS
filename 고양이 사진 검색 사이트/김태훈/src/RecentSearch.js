class RecentSearch {
  constructor({ $target, recentKeywords, onSearch }) {
    const $recentSearch = document.createElement("div");
    this.$recentSearch = $recentSearch;

    $recentSearch.className = "RecentSearch";
    $target.appendChild($recentSearch);

    $recentSearch.addEventListener("click", (e) => {
      // console.log(e.target.id);
      onSearch(e.target.id);
    });

    this.data = recentKeywords;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    console.log("recentKeywords", this.data);
    this.render();
  }

  render() {
    this.$recentSearch.innerHTML = this.data
      .map(
        (el) => `
    <div id=${el} class="searchList" style="border: 1px solid rgb(158, 158, 158);
    border-radius:25px; padding: 5px 20px;">${el}</div>
    `
      )
      .join("");
  }
}
