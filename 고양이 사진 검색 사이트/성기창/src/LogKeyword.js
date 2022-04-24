class LogKeyword {
  constructor({ $target, keywordLog, onClick }) {
    const $logKeyword = document.createElement("div");
    this.$logKeyword = $logKeyword;

    this.$logKeyword.className = "PrevSearch";
    $target.appendChild(this.$logKeyword);

    this.keywordLog = keywordLog;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.keywordLog = nextData;
    this.render();
  }

  render() {
    this.$logKeyword.innerHTML = `
        <ul>
            ${this.keywordLog
              .map((keyword) => `<li class="Log">${keyword}</li>`)
              .join("")}
        </ul>
      `;

    this.$logKeyword.querySelectorAll(".Log").forEach(($log) => {
      $log.addEventListener("click", (e) => {
        this.onClick(e.target.innerText);
      });
    });
  }
}
