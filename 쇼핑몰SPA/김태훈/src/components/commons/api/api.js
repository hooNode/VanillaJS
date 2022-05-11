export const getProductList = async (nodeId) => {
  let url =
    "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products";
  //   if (nodeId) url = `${url}/${nodeId}`;
  const res = await fetch(url);
  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("요청에 실패함");
};
