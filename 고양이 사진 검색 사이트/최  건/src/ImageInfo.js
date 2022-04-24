export default function ImageInfo({ $target, data, onClose }) {
  const $imageInfo = document.createElement("div");
  $imageInfo.className = "ImageInfo";
  $target.appendChild($imageInfo);

  data = data;

  const render = () => {
    if (data.visible) {
      const { name, url, temperament, origin } = data.image;

      $imageInfo.innerHTML = `
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
      $imageInfo.querySelector('.close').addEventListener('click', () => {onClose()});
      $imageInfo.style.display = "block";
    } else {
      $imageInfo.style.display = "none";
    }
  };


  const setState = (nextData) => {
    data = nextData;
    render();
  };

  render();

  return { render, setState };
}
