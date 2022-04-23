console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.toggle = new Toggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        await api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        console.log(image);
        await api.fetchCatDetail(image.id).then(({ data }) => {
          console.log(data);
          this.imageInfo.setState({
            visible: true,
            image: data,
          });
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      onClickQuit: () => {
        document.querySelector(".ImageInfo").classList.add("fade-out");
        setTimeout(() => {
          document.querySelector(".ImageInfo").classList.remove("fade-out");
          this.imageInfo.setState({
            visible: false,
          });
        }, 1000);
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
