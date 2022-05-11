import ProductList from "../../components/ProductList/ProductList.js";

export default function ProductListPage({ $target }) {
  this.state = {};
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
  };
  const productList = new ProductList({ $target });
}
