export default function SelectedLanguage({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.length > 0) {
      this.$element.innerHTML = `
              <ul>
                  ${this.state
                    .map(
                      (el) => `
                      <li>${el}</li>
                      `
                    )
                    .join("")}
              </ul>
          `;
    }
  };

  this.render();
}
