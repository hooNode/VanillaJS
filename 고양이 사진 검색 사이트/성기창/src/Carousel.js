class Carousel {
  constructor({ $target, randomData, startIndex, onClick }) {
    this.randomData = randomData;
    this.startIndex = startIndex;
    this.onClick = onClick;

    this.$carousel = document.createElement("div");
    this.$carousel.className = "Carousel";

    $target.appendChild(this.$carousel);

    this.render();
  }

  setState(nextData) {
    this.randomData = nextData.randomData;
    this.startIndex = nextData.startIndex;
    this.render();
  }

  render() {
    const outputList = this.randomData.slice(
      this.startIndex,
      this.startIndex + 5
    );
    console.log(outputList);

    this.$carousel.innerHTML = `
        <button class="Prev"> < </button>
            ${outputList.map(
              (cat) =>
                `<div class="RandomItem">
                    <img src=${cat.url} alt=${cat.name}/>
                </div>`
            )}
        <button class="Next"> > </button>
      `;

    this.$carousel.querySelectorAll(".RandomItem").forEach(($randomItem) => {
      $randomItem.style.witdh = `${innerWidth / 5 - 40}px`;
    });

    this.$carousel.querySelector(".Prev").addEventListener("click", () => {
      this.onClick("prev");
    });
    this.$carousel.querySelector(".Next").addEventListener("click", () => {
      this.onClick("next");
    });
  }
}
