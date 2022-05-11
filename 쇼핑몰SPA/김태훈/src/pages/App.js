import ProductListPage from "./ProductListPage/index.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    $target.innerHTML = "";

    if (pathname === "/web/") {
      new ProductListPage({ $target });
    }
  };

  this.route();
}
