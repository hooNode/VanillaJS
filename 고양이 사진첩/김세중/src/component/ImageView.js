export default function Breadcrumb({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "ImageViewer";
  const modal = $target.querySelector(".Modal");
  modal.appendChild(this.$element);
  this.imageView = document.querySelector("ImageView");
  this.state = "";
  this.setState = (url) => {
    this.state = url;
    if (state) this.imageView.className = "show";
    this.render();
  };
  this.render = () => {
    this.$element.innerHTML = `
        <div class="contents">
          <img src=https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${el.filePath}>
        </div>
    `;
  };
}
