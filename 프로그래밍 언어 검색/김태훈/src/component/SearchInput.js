export default function SearchInput({ $target, initialState, onChange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그래밍 언어를 입력하세요." value="${
        localStorage.getItem("input") || this.state
      }">
      `;
  };

  this.$element.addEventListener("keyup", (e) => {
    const keyType = ["ArrowDown", "ArrowUp"];
    if (!keyType.includes(e.key)) {
      onChange(e.target.value);
    }
    localStorage.setItem("input", e.target.value);
  });

  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this.render();
}
