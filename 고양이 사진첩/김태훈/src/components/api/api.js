const cache = {};
export const getSearchData = async (nodeId) => {
  if (cache[nodeId]) {
    return cache[nodeId];
  }
  let url = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
  if (nodeId) url = `${url}/${nodeId}`;
  const res = await fetch(url);
  if (res.ok) {
    const json = await res.json();
    cache[nodeId] = json;
    return json;
  }
  throw new Error("요청에 실패함");
};
