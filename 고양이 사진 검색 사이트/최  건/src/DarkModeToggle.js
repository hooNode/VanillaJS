export default function DarkModeToggle({ $target, onClick }) {
  const $darkModeToggle = document.createElement("input");
  $darkModeToggle.setAttribute("type", "checkbox");
  $darkModeToggle.className = "DarkModeToggle";

  $target.appendChild($darkModeToggle);

  $darkModeToggle.addEventListener("change", (e) => {
    console.log(e.target.checked)
    console.log(window.matchMedia("(prefers-color-scheme: dark)"))
  });

  const render = () => {
    // document.documentElement.classList.toggle("dark-mode", "light");
    // $searchResult.querySelectorAll(".item").forEach(($item, index) => {
    //   $item.addEventListener("click", () => {
    //     onClick(data[index]);
    //   });
    // });
  };

  render();

  console.log("darkModeToggle created.", this);
}
