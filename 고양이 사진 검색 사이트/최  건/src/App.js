import SearchResult from "./SearchResult.js";
import SearchInput from "./SearchInput.js";
import ImageInfo from "./ImageInfo.js";
import DarkModeToggle from "./DarkModeToggle.js";
import { api } from "./api.js"

export default function App({ $target }) {
  let data = [];
  let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const $body = document.querySelector('body');

  DarkModeToggle({
    $target,
    initialData: data,
    onChange: (isDark) => {
      setTheme(isDark);
    }
  });

  SearchInput({
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
  
  const onClose = () => {
    imageInfo.setState({
      visible: false,
      image: null
    });
  };

  const imageInfo = ImageInfo({
    $target,
    data: {
      visible: false,
      image: null,
    },
    onClose
  });

  const setState = (nextData) => {
    data = nextData;
    searchResult.setState(nextData);
  };

  const setTheme = (isDark) => {
    console.log(isDark)
    $body.style.backgroundColor = isDark ? "black" : "white";
  };

  $body.addEventListener('keyup', (e) => {
    if(e.key === 'Escape')
      onClose();
  });

  $body.addEventListener('click', (e) => {
    if(!data.visible) return;
    for(let i = 0; i < e.path.length; i++){
      if(e.path[i].className === "content-wrapper") console.log("a")
    }
    if(e.path.filter(p => p.className === "content-wrapper").length > 0)
      return;
    onClose();
  });
}
