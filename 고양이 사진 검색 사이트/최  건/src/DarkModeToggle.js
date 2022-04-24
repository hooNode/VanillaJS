export default function DarkModeToggle({ $target, initialData , onChange }) {
  const $darkModeToggle = document.createElement("input");
  $darkModeToggle.setAttribute("type", "checkbox");
  $darkModeToggle.className = "DarkModeToggle";
  $darkModeToggle.checked = initialData;
  $target.appendChild($darkModeToggle);

  $darkModeToggle.addEventListener("change", (e) => {
    onChange(e.target.checked);
  });

  console.log("darkModeToggle created.", this);
}
