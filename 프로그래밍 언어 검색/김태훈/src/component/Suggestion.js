export default function Suggestion({ $target, initialState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $target.appendChild(this.$element);

  this.hoverList = document.querySelector(".Suggestion");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { items, selectedIndex } = this.state;
    if (items.length > 0) {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
              <ul>
              ${items
                .map(
                  (item, index) => `
                  <li data-index=${index} class="${
                    index === selectedIndex ? "Suggestion__item--selected" : ""
                  }">${item}</li>
              `
                )
                .join("")}
              </ul>
          `;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  let selectedArr = [];
  window.addEventListener("keyup", (e) => {
    const { items, selectedIndex } = this.state;
    if (items.length > 0) {
      if (e.key === "ArrowDown") {
        this.setState({ selectedIndex: selectedIndex + 1 });
        if (selectedIndex > items.length - 2) {
          this.setState({ selectedIndex: 0 });
        }
      } else if (e.key === "ArrowUp") {
        this.setState({ selectedIndex: selectedIndex - 1 });
        if (selectedIndex === 0) {
          this.setState({ selectedIndex: items.length - 1 });
        }
      } else if (e.key === "Enter") {
        if (!selectedArr.includes(items[selectedIndex])) {
          if (selectedArr.length > 4) {
            selectedArr.shift();
            selectedArr.push(items[selectedIndex]);
          } else {
            selectedArr.push(items[selectedIndex]);
          }
        } else {
          selectedArr = selectedArr.filter((el) => el !== items[selectedIndex]);
          selectedArr.push(items[selectedIndex]);
        }
        onSelect(selectedArr);
        alert(items[selectedIndex]);
      }
    }
  });

  this.hoverList.addEventListener("click", (e) => {
    const { items } = this.state;
    const selectedIndex = Number(e.target.dataset.index);
    if (!selectedArr.includes(items[selectedIndex])) {
      if (selectedArr.length > 4) {
        selectedArr.shift();
        selectedArr.push(items[selectedIndex]);
      } else {
        selectedArr.push(items[selectedIndex]);
      }
    } else {
      selectedArr = selectedArr.filter((el) => el !== items[selectedIndex]);
      selectedArr.push(items[selectedIndex]);
    }
    onSelect(selectedArr);
    alert(items[selectedIndex]);
  });

  this.render();
}
