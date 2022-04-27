const URL =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ModalImageViewer({ $target, image, isVisible }) {
  let state = {
    image,
    isVisible,
  };

  const $wrapper = document.createElement("div");
  $wrapper.className = "Modal ImageViewer";
  $target.appendChild($wrapper);

  const setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };
    render();
  };

  const ModalHandler = (e) => {
    if (e.type === "click" && e.target.className !== "Modal ImageViewer")
      return;
    if (e.type === "keyup" && e.keyCode !== 27) return;

    setState({
      image: null,
      isVisible: false,
    });
  };

  const render = () => {
    if (!state.isVisible) {
      $wrapper.style.display = "none";
      $wrapper.removeEventListener("click", ModalHandler);
      window.removeEventListener("keyup", ModalHandler);
    } else {
      $wrapper.innerHTML = `
        <div class="content">
            <img src="${URL + state.image}">
        </div>
      `;
      $wrapper.style.display = "block";

      $wrapper.addEventListener("click", ModalHandler);
      window.addEventListener("keyup", ModalHandler);
    }
  };

  render();

  return { setState };
}
