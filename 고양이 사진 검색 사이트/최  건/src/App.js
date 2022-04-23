import SearchResult from "./SearchResult.js";
import SearchInput from "./SearchInput.js";
import ImageInfo from "./ImageInfo.js";

export default function App({ $target }) {
  let data = [];

  console.log("aaa");

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
    console.log(this);
    data = nextData;
    searchResult.setState(nextData);
  };
}
