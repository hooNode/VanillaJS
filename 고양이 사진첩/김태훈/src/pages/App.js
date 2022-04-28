import { getSearchData } from "../components/api/api.js";
import BodyDirectory from "../components/BodyDirectory.js";
import ImageViewer from "../components/ImageViewer.js";
import FilePath from "../components/FilePath.js";

export default function App({ $target }) {
  this.state = {
    path: [{ root: "root", id: "" }],
    body: [],
    image: {
      url: "",
      name: "",
      visible: false,
    },
    isfirst: true,
    isLoading: false,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    filePath.setState(this.state.path);
    bootDirectory.setState(this.state);
    imageViewer.setState(this.state.image);
  };

  const filePath = new FilePath({
    $target,
    initialState: this.state.path,
    rootItems: async (nodeId) => {
      const res = await getSearchData(nodeId);
      if (this.state.path.length === 1) {
        this.setState({ ...this.state, body: res, first: true });
      } else {
        this.setState({ ...this.state, body: res, first: false });
      }
    },
  });

  const bootDirectory = new BodyDirectory({
    $target,
    initialState: this.state,
    rootItems: async (nodeId) => {
      const res = await getSearchData(nodeId);
      console.log(res);
      if (res.length === 0) {
        this.setState({ ...this.state, isLoading: true });
      } else {
        this.setState({ ...this.state, isLoading: false });
      }

      if (this.state.path.length === 1) {
        this.setState({ ...this.state, body: res, first: true });
      } else {
        this.setState({ ...this.state, body: res, first: false });
      }
    },
    getImageUrl: (url, name) => {
      this.setState({ image: { url, visible: true, name } });
    },
    getFilePath: (path) => {
      this.setState({ path: [...this.state.path, path] });
    },
    removePath: () => {
      this.setState({
        path: [...this.state.path.slice(0, this.state.path.length - 1)],
      });
    },
  });

  const imageViewer = new ImageViewer({
    $target,
    initialState: this.state.image,
    onClickQuit: () => {
      this.setState({ image: { visible: false } });
    },
  });
}
