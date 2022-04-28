const baseUrl =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};
export const getRootData = async (nodeId) => {
  if (cache[nodeId]) {
    console.log("zzzz");
    return cache;
  }
 
  const res = nodeId==="root"? await fetch(`${baseUrl}`): await fetch(`${baseUrl}/${nodeId}`)
  if (res.ok) {
    const json = await res.json();
    cache[nodeId] =  await json;
    console.log(json)

    return json;
  }
  throw new Error("요청에 실패함");
};
