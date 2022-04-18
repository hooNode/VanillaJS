import SearchInput from "../src/component/SearchInput.js";
import Suggestion from "../src/component/Suggestion.js";
import { getSearchData } from "../src/component/api/getSearchData.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      items: this.state.fetchedLanguages,
    });
  };

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async (keywords) => {
      if (keywords.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const response = await getSearchData(keywords);
        this.setState({
          fetchedLanguages: response,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      items: [],
    },
  });
}
