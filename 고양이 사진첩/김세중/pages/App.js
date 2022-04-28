// import SearchInput from "../src/component/SearchInput.js";
import Breadcrumb from "../src/component/Breadcrumb.js";
import Nodes from "../src/component/Nodes.js";
import ImageView from "../src/component/ImageView.js";
import { getRootData } from "../src/api/getRootData.js";

// import SelectedLanguage from "../src/component/SelectedLanguage.js";
// import { getRootData } from "../src/api/getRootData";
export default function App({ $target }) {
  this.state = {
    breadcrumb: [["root", "root"]],
    nodes: {},
  };

  const setBreadcrumbState = (nextState) => {
    console.log(nextState);
    console.log(this.state);
    if (nextState === "back") this.state.breadcrumb.pop();
    else this.state.breadcrumb.push(nextState);
    breadcrumb.setState(this.state.breadcrumb);
    console.log(this.state.breadcrumb);
  };

  const setNodesState = async (nextState) => {
    const result = await getRootData(nextState);
    this.state.nodes[nextState] = result;
    nodes.setState(result);
  };

  const search = async (id, name) => {
    console.log(id);
    if (id === "root") setNodesState(id);
    else if (id === "back") {
      setBreadcrumbState(id);
      nodes.setState(
        this.state.nodes[breadcrumb.state[breadcrumb.state.length - 1][0]]
      );
    } else if (this.state.nodes[id]) {
      setBreadcrumbState([id, name]);
      nodes.setState(this.state.nodes[id]);
    } else {
      setBreadcrumbState([id, name]);
      setNodesState(id);
    }
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.breadcrumb,
  });

  const nodes = new Nodes({
    $target,
    onClick: (id, name) => search(id, name),
  });
  const imageView = new ImageView({
    $target,
  });
  search("root", "root");
}
