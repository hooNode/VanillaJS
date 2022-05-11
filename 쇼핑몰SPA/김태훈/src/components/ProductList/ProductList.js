import { getProductList } from "../commons/Api/Api.js";

export default function ProductList({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "ProductListPage";

  this.state = {};
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  $target.appendChild(this.$element);

  this.render = () => {
    console.log(this.state);
  };

  this.fetchProducts = async () => {
    const result = await getProductList();
    this.setState({ productsId: result });
  };

  this.fetchProducts();

  this.render();
}
