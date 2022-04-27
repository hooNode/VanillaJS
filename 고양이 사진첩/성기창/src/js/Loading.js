export default function Loading(props) {
  const $wrapper = document.createElement("div");
  $wrapper.className = "Modal Loading";
  props.$target.appendChild($wrapper);

  let isVisible = props.isVisible;

  const LoadingHandler = (nextState) => {
    isVisible = nextState;
    render();
  };

  const render = () => {
    if (!isVisible) $wrapper.style.display = "none";
    else {
      $wrapper.innerHTML = `
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
      `;

      $wrapper.style.display = "block";
    }
  };

  render();

  return { LoadingHandler };
}
