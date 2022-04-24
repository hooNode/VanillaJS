import SearchResult from "./SearchResult.js";
import SearchInput from "./SearchInput.js";
import ImageInfo from "./ImageInfo.js";
import DarkModeToggle from "./DarkModeToggle.js";
import { api } from "./api.js"

export default function App({ $target }) {
  let data = [];

  console.log("aaa");

  const darkModeToggle = DarkModeToggle({
    $target,
    onClick: (image) => {
      imageInfo.setState({
        visible: true,
        image,
      });
    },
  });

  const searchInput = SearchInput({
    $target,
    onSearch: (keyword) => {
      api.fetchCats(keyword).then(({ data }) => setState(data));
    },
  });
  
  const searchResult = SearchResult({
    $target,
    initialData: data,
    onClick: (image) => {
      imageInfo.setState({
        visible: true,
        image,
      });
    },
  });
  
  const imageInfo = ImageInfo({
    $target,
    data: {
      visible: false,
      image: null,
    },
  });

  const setState = (nextData) => {
    data = nextData;
    searchResult.setState(nextData);
  };
}
