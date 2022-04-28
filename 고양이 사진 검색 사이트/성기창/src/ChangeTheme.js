class ChangeTheme {
  $target = null;
  theme = null;

  constructor({ $target, theme, onClick }) {
    this.$target = $target;
    this.theme = theme;
    $target.setAttribute("data-theme", theme);
    const $changeTheme = document.createElement("button");
    this.$changeTheme = $changeTheme;
    this.$changeTheme.className = "ChangeTheme";
    this.$changeTheme.textContent = "테마 변경";
    
    $target.appendChild(this.$changeTheme);

    $changeTheme.addEventListener("click", () => {
      onClick(this.theme);
    });
  }

  setState(nextData) {
    this.theme = nextData;
  }

  render() {
    this.$target.setAttribute("data-theme", this.theme);
  }
}
