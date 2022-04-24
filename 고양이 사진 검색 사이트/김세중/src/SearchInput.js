const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";

    const $toggleButton = document.createElement("button")
    $toggleButton.className = "toggle__dark"
    this.$toggleButton = $toggleButton
    // const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let isDark = false
    $toggleButton.addEventListener("click", () =>{
    console.log(isDark) 
    if(!isDark){
      $toggleButton.innerText = '다크 모드'
      document.documentElement.style.setProperty(`--main-bg-color`, "#000000");
      document.documentElement.style.setProperty(`--main-color`, "#ffffff");
      isDark= true;
    }
    else {
      $toggleButton.innerText = '화이트 모드'
      document.documentElement.style.setProperty(`--main-bg-color`, "#ffffff");
      document.documentElement.style.setProperty(`--main-color`, "#000000");
      isDark= false;

    }
  })

    $toggleButton.innerText = '화이트 모드'
    $target.appendChild($searchInput);
    $target.appendChild($toggleButton);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}