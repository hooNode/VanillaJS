export default function Nodes({ $target, onClick }) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $target.appendChild(this.$element);
  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
    console.log(nextState);
    this.render();
  };
  console.log(this.state);
  this.render = () => {
    this.$element.innerHTML = `
      ${
        !this.state?.[0]
          ? "<div>로딩중입니다</div>"
          : this.state[0].id === "1"
          ? ""
          : `<div class="Node" id="back">
          <img src=./assets/prev.png>
         </div>
      `
      }
      ${this.state.map(
        (el) => `
        <div class="Node" id="${el.id}">
          ${`<img src=${
            el.type === "DIRECTORY"
              ? "./assets/directory.png"
              : `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${el.filePath}`
          }>
          <div>${el.name}</div>`}
          
        </div>`
      )}
      
    `;
    const nodeList = document.querySelectorAll(".Node");
    nodeList.forEach((el) =>
      el.addEventListener("click", () => {
        this.setState([]);
        onClick(el.id, el.children[1]?.innerHTML);
      })
    );
  };

  this.render();
}
