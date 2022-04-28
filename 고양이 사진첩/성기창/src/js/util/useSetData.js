import { useApi } from "../api/api.js";
import Loading from "../Loading.js";

export const useSetData = ({ $target, setState }) => {
  const { get } = useApi();

  const loading = Loading({
    $target,
    isVisible: false,
  });

  const setBreadCrumb = (state, cache, pathName) => {
    const key = state.path.indexOf(pathName);
    const index = state.path.indexOf(pathName);
    const path = state.path.slice(0, index + 1);
    const pathId = state.pathId.slice(0, index + 1);
    const fetchData = cache[pathId[key]];

    setState({
      fetchData,
      path,
      pathId,
    });
  };

  const setNodes = async (state, cache, data) => {
    loading.LoadingHandler(true);

    let newFetchData;
    const newPath = state.path;
    const newPathId = state.pathId;

    if (cache[data.id]) newFetchData = cache[data.id];
    else {
      newFetchData = await get(data.id);

      cache[data.id] = newFetchData;
    }

    newPath.push(data.name);
    newPathId.push(data.id);

    setState({
      path: newPath,
      fetchData: newFetchData,
    });

    loading.LoadingHandler(false);
  };

  const setPrevNodes = (state, cache) => {
    loading.LoadingHandler(true);

    const newPath = state.path;
    const newPathId = state.pathId;
    const key = newPathId[newPathId.length - 2];
    const newFetchData = cache[key];

    newPath.pop();
    newPathId.pop();

    setState({
      path: newPath,
      pathId: newPathId,
      fetchData: newFetchData,
    });

    loading.LoadingHandler(false);
  };

  const setInit = async (cache) => {
    loading.LoadingHandler(true);
    const rootData = await get();

    setState({
      fetchData: rootData,
      path: ["root"],
      pathId: [0],
    });
    cache["0"] = rootData;

    loading.LoadingHandler(false);
  };

  return { setBreadCrumb, setNodes, setPrevNodes, setInit };
};
