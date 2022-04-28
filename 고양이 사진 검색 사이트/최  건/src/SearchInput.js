export default function SearchInput({ $target, onSearch }) {
  const $searchInput = document.createElement("input");
  $searchInput.placeholder = "고양이를 검색해보세요.|";
  $searchInput.className = "SearchInput";
  $searchInput.autofocus = "autofocus";

  $target.appendChild($searchInput);

  $searchInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      onSearch(e.target.value);
    }
  });

  console.log("SearchInput created.", this);

  const render = () => {};
}
