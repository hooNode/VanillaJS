console.log("app is running!");

class App {
  // $target = null;
  state = {
    data: JSON.parse(localStorage.getItem("prevData")) || [],
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    keywordLog: JSON.parse(localStorage.getItem("keyword")) || [],
    inputValue: JSON.parse(localStorage.getItem("inputValue")) || "",
    randomData: [],
    startIndex: 0,
  };

  constructor($target) {
    this.$target = $target;
    api.fetchRandom().then(({ data }) => {
      this.setState({ randomData: [...data] });
    });

    this.changeTheme = new ChangeTheme({
      $target,
      theme: this.state.theme,
      onClick: (nowTheme) => {
        if (nowTheme === "dark") {
          this.setState({ theme: "light" });
        } else {
          this.setState({ theme: "dark" });
        }
        this.changeTheme.render();
      },
    });

    this.searchInput = new SearchInput({
      $target,
      value: this.state.inputValue,
      onSearch: (keyword) => {
        const newKeyowrdArr = valid.prevKeyword(keyword);

        this.setState({
          keywordLog: [...newKeyowrdArr],
          inputValue: keyword,
        });
        this.searchResult.setState({
          isLoading: true,
          isEnd: false,
          searchList: this.state.data,
        });
        api.fetchCats(keyword).then(({ data }) => {
          this.setState({ data: [...data] });
        });
      },
      onSearchRandom: () => {
        api.fetchRandom().then(({ data }) => {
          this.setState({ data: [...data], inputValue: "random" });
        });
      },
    });

    this.logKeyword = new LogKeyword({
      $target,
      keywordLog: this.state.keywordLog,
      onClick: (keyword) => {
        this.setState({ inputValue: keyword });
        this.searchResult.setState({
          isLoading: true,
          isEnd: false,
          searchList: this.state.data,
        });
        api.fetchCats(keyword).then(({ data }) => {
          this.setState({ data: [...data] });
        });
      },
    });

    this.caroucel = new Carousel({
      $target,
      randomData: this.state.randomData,
      startIndex: this.state.startIndex,
      onClick: (position) => {
        console.log(position);
        if (position === "prev") {
          if (!this.state.startIndex) return;
          else this.setState({ startIndex: this.state.startIndex - 5 });
        } else {
          if (this.state.startIndex === 45) return;
          else this.setState({ startIndex: this.state.startIndex + 5 });
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: {
        isLoading: false,
        isEnd: false,
        searchList: this.state.data,
      },
      onClick: async (data) => {
        this.imageInfo.setState({
          visible: true,
          isEnd: false,
          image: null,
        });
        const image = await api.fetchCatInfo(data.id);

        this.imageInfo.setState({
          visible: true,
          isEnd: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        isEnd: false,
        image: null,
      },
      onClick: () => {
        this.imageInfo.setState({
          isEnd: false,
          visible: false,
          image: null,
        });
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.state = {
      ...this.state,
      ...nextData,
    };

    this.searchResult.setState({
      isLoading: false,
      isEnd: true,
      searchList: this.state.data,
    });

    this.changeTheme.setState(this.state.theme);
    this.logKeyword.setState(this.state.keywordLog);
    this.searchInput.setState(this.state.inputValue);
    this.caroucel.setState({
      randomData: this.state.randomData,
      startIndex: this.state.startIndex,
    });

    localStorage.setItem("keyword", JSON.stringify(this.state.keywordLog));
    localStorage.setItem("prevData", JSON.stringify(this.state.data));
    localStorage.setItem("inputValue", JSON.stringify(this.state.inputValue));
  }
}
