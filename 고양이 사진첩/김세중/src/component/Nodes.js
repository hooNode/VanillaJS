export default function Nodes({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $target.appendChild(this.$element);
  this.nodeList = document.querySelectorAll(".Nodes");
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = [...nextState];
    this.render();
  };
  console.log(this.state);
  this.render = () => {
    this.$element.innerHTML = `
      ${this.state.map(
        (el) => `
        <div class="Node">
          ${
            el.name
              ? `<img src=${
                  el.type === "DIRECTORY" ? "./assets/directory.png" : ""
                }>
          <div>${el.name}</div>`
              : "<div>로딩중입니다</div>"
          }
          
        </div>`
      )}
    `;
  };
  this.render();
}
