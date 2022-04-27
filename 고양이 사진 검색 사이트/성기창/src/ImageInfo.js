class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, onClick }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    this.onClick = onClick;

    $target.appendChild(this.$imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  keyupEvent(e) {
    if (e.keyCode === 27) this.onClick();
  }

  render() {
    if (this.data.visible) {
      if (!this.data.isEnd) {
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <div class="close">x</div>
            </div>
            <img src="src/images/loading.gif"/>
            <div class="description"></div>
          </div>`;
      } else {
        const { name, url, temperament, origin } = this.data.image.data;

        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;

        window.addEventListener("keyup", this.keyupEvent);

        this.$imageInfo.addEventListener("click", (e) => {
          const target = e.target.className;
          if (target === "ImageInfo" || target === "close") this.onClick();
        });
      }

      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
      window.removeEventListener("keyup", this.keyupEvent);
    }
  }
}
