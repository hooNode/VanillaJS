export default function FilePath({ $target, initialState, rootItems }) {
  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
      ${this.state
        .map(
          (path) => `
            <div class="Root" id="${path.id}" name=${path.root}>${path.root}</div>
            
          `
        )
        .join("")}`;
    this.$element.querySelectorAll(".Root").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        if (
          this.state[this.state.length - 1].root !== $item.getAttribute("name")
        ) {
          rootItems($item.getAttribute("id"));
        }
      });
    });
  };

  this.render();
}
