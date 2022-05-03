export default function BodyDirectory({
  $target,
  initialState,
  rootItems,
  getImageUrl,
  getFilePath,
  removePath,
}) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  this.state = initialState;
  rootItems();
  $target.appendChild(this.$element);

  this.$modal = document.createElement("div");
  this.$modal.className = "Modal Loading";
  this.$modal.innerHTML = `
          <div class="content">
            <img src="./assets/nyan-cat.gif">
          </div>
        `;
  $target.appendChild(this.$modal);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    console.log(this.state.body);
    console.log(this.state.isLoading);
    if (this.state.isLoading) {
      this.$modal.style.display = "block";
    } else if (!this.state.isLoading) {
      this.$modal.style.display = "none";
    }

    if (this.state.path?.length === 1) {
      this.$element.innerHTML = `
      ${this.state.body
        .map(
          (directory) => `
            <div class="Node" id=${directory.id} type=${directory.type} name=${
            directory.name
          } filePath=${directory.filePath}>
              ${
                directory.type === "DIRECTORY"
                  ? `<img src="./assets/directory.png" />`
                  : `<img src="./assets/file.png" />`
              }
              <div>${directory.name}</div>
            </div>
          `
        )
        .join("")}`;
    }
    if (this.state.path?.length > 1) {
      this.$element.innerHTML = `
        <div class="Node" id="prev">
          <img src="./assets/prev.png" />
        </div>
      ${this.state.body
        .map(
          (directory) => `
            <div class="Node" id=${directory.id} type=${directory.type} name=${
            directory.name
          } filePath=${directory.filePath} parent=${directory.parent}>
              ${
                directory.type === "DIRECTORY"
                  ? `<img src="./assets/directory.png" />`
                  : `<img src="./assets/file.png" />`
              }
              <div>${directory.name}</div>
            </div>
          `
        )
        .join("")}`;
    }
    this.$element.querySelectorAll(".Node").forEach(($item, index) => {
      let temp = "";
      $item.addEventListener("click", (e) => {
        if ($item.getAttribute("type") === "FILE") {
          temp = $item.getAttribute("parent");
          getImageUrl(
            $item.getAttribute("filePath"),
            $item.getAttribute("name")
          );
        } else if ($item.getAttribute("type") === "DIRECTORY") {
          temp = $item.getAttribute("parent");
          getFilePath({
            root: $item.getAttribute("name"),
            id: $item.getAttribute("id"),
          });
          rootItems(e.target.parentNode.id);
        } else {
          rootItems(temp);
          removePath();
        }
      });
    });
  };

  this.render();
}
