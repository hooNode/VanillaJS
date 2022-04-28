export default function Breadcrumb({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "Breadcrumb";
  $target.appendChild(this.$element);

  this.state = initialState;
  this.setState = (back, nextState) => {
    if(back) this.state.pop()
    else this.state.push(nextState)
    this.render();
  };
  this.render = () => { 
    this.$element.innerHTML = `
      ${this.state.map((el,index) => `
        <div>
          <span>  ${index>0? " - " : ""}${el}</span>
        </div>`
      )}
    `
  }
  this.render()
}
