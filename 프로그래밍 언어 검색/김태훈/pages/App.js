import SearchInput from "../src/component/SearchInput.js";
import Suggestion from "../src/component/Suggestion.js";
import SelectedLanguage from "../src/component/SelectedLanguage.js";
import { getSearchData } from "../src/api/getSearchData.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages:
      JSON.parse(localStorage.getItem("fetchedLanguages")) || [],
    selectedLanguages:
      JSON.parse(localStorage.getItem("selectedLanguages")) || [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });
    selectedLanguage.setState(this.state.selectedLanguages);

    localStorage.setItem(
      "fetchedLanguages",
      JSON.stringify(this.state.fetchedLanguages)
    );
    localStorage.setItem(
      "selectedLanguages",
      JSON.stringify(this.state.selectedLanguages)
    );
  };

  const selectedLanguage = new SelectedLanguage({
    $target,
    initialState: [],
  });

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
      selectedIndex: 0,
    },
    onSelect: (selectedLanguages) => {
      this.setState({
        selectedLanguages,
      });
    },
  });
}
