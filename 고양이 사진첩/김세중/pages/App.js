// import SearchInput from "../src/component/SearchInput.js";
import Breadcrumb from "../src/component/Breadcrumb.js"
import Nodes from "../src/component/Nodes.js";
import { getRootData } from "../src/api/getRootData.js";

// import SelectedLanguage from "../src/component/SelectedLanguage.js";
// import { getRootData } from "../src/api/getRootData";
export  default function App({ $target }) {
    this.state = {
      title: ["root"],
      fetchItems: ["로딩중입니다"]
    };

    this.setState = (nextState) => {
      this.state = {
        ...this.state,
        ...nextState,
      };
      nodes.setState(this.state.fetchItems);
     
    };
    const firstSearch = async () => {
      const result = await getRootData("root")  
      console.log(result);
      this.setState({title:"root",fetchItems:result});
    }
    firstSearch()
 
    const breadcrumb = new Breadcrumb({
      $target,
      initialState: this.state.title
    });
   
    const nodes = new Nodes({
      $target,
      initialState: this.state.fetchItems
    });
  
}
