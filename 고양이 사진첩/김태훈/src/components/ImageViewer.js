export default function ImageViewer({ $target, initialState, onClickQuit }) {
  this.$element = document.createElement("div");
  this.$element.className = "Modal ImageViewer";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.visible) {
      this.$element.innerHTML = `
        <div class="content">
          <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${this.state.url}" />
        </div>
      `;
      this.$element.style.display = "block";
      console.log("image", this.state);
    } else {
      this.$element.style.display = "none";
    }

    this.$element.addEventListener("click", (e) => {
      console.log(e.target.className);
      const quitClassNames = ["Modal ImageViewer"];
      if (quitClassNames.includes(e.target.className)) {
        onClickQuit();
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.state.visible) {
        if (e.key === "Escape") onClickQuit();
      }
    });
  };

  this.render();
}
