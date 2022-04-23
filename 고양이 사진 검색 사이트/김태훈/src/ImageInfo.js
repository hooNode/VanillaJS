class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, onClickQuit }) {
    const $imageInfo = document.createElement("article");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.onClickQuit = onClickQuit;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data?.image;

      this.$imageInfo.innerHTML = `
        <detail class="content-wrapper">
          <summary class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </summary>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </detail>`;
      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }
    this.$imageInfo.addEventListener("click", (e) => {
      const quitClassNames = ["close", "ImageInfo", "ImageInfo .active"];
      if (quitClassNames.includes(e.target.className)) {
        this.onClickQuit();
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") this.onClickQuit();
    });
  }
}
