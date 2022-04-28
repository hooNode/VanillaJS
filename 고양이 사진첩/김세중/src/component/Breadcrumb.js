export default function Breadcrumb({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "Breadcrumb";
  $target.appendChild(this.$element);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    console.log(nextState);
    this.render();
  };
  this.render = () => {
    this.$element.innerHTML = `
      ${this.state
        .map(
          (el, index) => `
        <div>
          <span>${el[1]}</span>
        </div>`
        )
        .join("")}
    `;
  };
  this.render();
}
