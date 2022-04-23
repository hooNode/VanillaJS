class Toggle {
  constructor({ $target }) {
    const $toggle = document.createElement("div");
    this.$toggle = $toggle;

    $target.appendChild($toggle);

    this.render();
    console.log("Toggle.", this);
  }

  render() {
    this.$toggle.innerHTML = `
    dark mode <input type="checkbox" class="dark-theme">
    `;
    const $toggleBtn = this.$toggle.querySelector(".dark-theme");
    $toggleBtn.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.style.background = "#000";
        document.body.style.color = "white";
      } else {
        document.body.style.background = "white";
        document.body.style.color = "#000";
      }
    });

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log("is Dark Mode? " + prefersDark);
  }
}
