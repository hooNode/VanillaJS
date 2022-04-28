import BreadCrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import ModalImageViewer from "./ModalImageViewer.js";
import { useSetData } from "./util/useSetData.js";

const cache = {};

export default function App({ $target }) {
  let state = {
    fetchData: null,
    path: null,
    pathId: null,
  };

  const breadCrumb = BreadCrumb({
    $target,
    initialData: [],
    onClick: async (pathName) => {
      setBreadCrumb(state, cache, pathName);
    },
  });

  const nodes = Nodes({
    $target,
    initialData: [],
    path: [],
    onClick: async (data) => {
      if (data.type === "DIRECTORY") {
        setNodes(state, cache, data);
      } else {
        modalImageViewer.setState({
          image: data.filePath,
          isVisible: true,
        });
      }
    },
    onClickPrev: () => {
      setPrevNodes(state, cache);
    },
  });

  const modalImageViewer = ModalImageViewer({
    $target,
    image: null,
    isVisible: false,
  });

  const setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };
    breadCrumb.setState(state.path);
    nodes.setState({
      nodes: state.fetchData,
      path: state.path,
    });
  };

  const { setBreadCrumb, setNodes, setPrevNodes, setInit } = useSetData({
    $target,
    setState,
  });

  setInit(cache);
}
