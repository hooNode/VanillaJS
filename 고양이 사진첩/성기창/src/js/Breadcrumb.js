export default function BreadCrumb({ $target, initialData, onClick }) {
  let path = initialData;
  const $nav = document.createElement("nav");
  $nav.className = "Breadcrumb";

  $target.appendChild($nav);

  const setState = (nextState) => {
    path = nextState;
    render();
  };

  const moveToPage = (e) => {
    if (e.target.className === "Breadcrumb") return;
    onClick(e.target.textContent);
  };

  const render = () => {
    $nav.removeEventListener("click", moveToPage);

    $nav.innerHTML = `
        ${path
          .map(
            (pathName) =>
              `
            <div>${pathName}</div>
            `
          )
          .join("")}
      `;

    $nav.addEventListener("click", moveToPage);
  };

  render();

  return { setState };
}
