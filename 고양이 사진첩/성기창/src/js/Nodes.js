export default function Nodes(props) {
  const prev = `
    <div class="Node" data-index="prev">
        <img src="./assets/prev.png" />
    </div>
    `;

  const $element = document.createElement("div");
  $element.className = "Nodes";
  props.$target.appendChild($element);

  let state = {
    nodes: props.initialData,
    path: props.path,
  };

  const setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };
    render();
  };

  const onClickElement = (e) => {
    const target = e.target.closest("div");
    if (target.className !== "Node") return;

    const index = e.target.closest("div").dataset.index;

    if (index === "prev") props.onClickPrev();
    else props.onClick(state.nodes[index]);
  };

  const render = () => {
    $element.removeEventListener("click", onClickElement);

    const dom = `
        ${state.nodes
          .map(
            (nodeData, index) =>
              `
                <div class="Node" data-index="${index}">
                    <img src="./assets/${
                      nodeData.type === "FILE" ? "file.png" : "directory.png"
                    }" />
                    <div>${nodeData.name}</div>
                </div>
              `
          )
          .join("")}
      `;

    if (state.path.length === 1) $element.innerHTML = dom;
    else $element.innerHTML = prev + dom;

    $element.addEventListener("click", onClickElement);
  };

  render();

  return { setState };
}
