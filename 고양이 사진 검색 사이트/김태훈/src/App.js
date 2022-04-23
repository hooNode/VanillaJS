console.log("app is running!");

class App {
  $target = null;
  data = [];
  recentKeywords = [];

  constructor($target) {
    this.$target = $target;

    this.toggle = new Toggle({
      $target,
    });

    let tempKeywords = "";
    this.searchInput = new SearchInput({
      $target,
      recentKeywords: this.recentKeywords,
      onSearch: async (keyword) => {
        try {
          if (this.data?.length !== 0 || tempKeywords !== keyword) {
            document.querySelector(".SearchResult").innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; width: 400%; height: 50vh; font-size: 24px; font-weight: bold;">
              <p>데이터를 로딩 중입니다...</p>
            </div>
            `;
          }
          await api.fetchCats(keyword).then(({ data }) => {
            this.setState(data);
            tempKeywords = keyword;
          });
        } catch (e) {
          console.warn(e);
        }
      },
      getSearchData: (nextData) => {
        if (
          !this.recentKeywords.includes(nextData) &&
          this.recentKeywords.length > 4
        ) {
          const [first, ...rest] = this.recentKeywords;
          this.setRecentKeywords([...rest, nextData]);
        } else if (!this.recentKeywords.includes(nextData)) {
          this.setRecentKeywords([...this.recentKeywords, nextData]);
        }
      },
    });

    let recentKeywords = "";

    this.recentSearch = new RecentSearch({
      $target,
      recentKeywords: this.recentKeywords,
      onSearch: async (keyword) => {
        try {
          if (this.data?.length !== 0 || recentKeywords !== keyword) {
            document.querySelector(".SearchResult").innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; width: 400%; height: 50vh; font-size: 24px; font-weight: bold;">
              <p>데이터를 로딩 중입니다...</p>
            </div>
            `;
          }
          await api.fetchCats(keyword).then(({ data }) => {
            this.setState(data);
            recentKeywords = keyword;
          });
        } catch (e) {
          console.dir(e);
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        try {
          await api.fetchCatDetail(image.id).then(({ data }) => {
            console.log(data);
            this.imageInfo.setState({
              visible: true,
              image: data,
            });
          });
        } catch (e) {
          console.dir(e);
        }
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

  setRecentKeywords(nextData) {
    this.recentKeywords = nextData;
    this.recentSearch.setState(nextData);
  }
}
