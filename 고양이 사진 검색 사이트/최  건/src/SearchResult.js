export default function SearchResult({ $target, initialData, onClick }) {
  const $searchResult = document.createElement("div");
  $searchResult.className = "SearchResult";
  $target.appendChild($searchResult);
  let data = initialData;
  onClick;

  const render = () => {
    $searchResult.innerHTML = data
      .map(
        (cat) => `
            <div class="item">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    $searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        onClick(data[index]);
      });
    });
  };

  const setState = (nextData) => {
    data = nextData;
    render();
  };
  render();
  return { render, setState };
}
