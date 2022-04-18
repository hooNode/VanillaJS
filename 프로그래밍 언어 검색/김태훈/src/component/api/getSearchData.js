export const baseUrl =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getSearchData = async (keywords) => {
  const res = await fetch(`${baseUrl}/languages?keyword=${keywords}`);
  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("요청에 실패함");
};
