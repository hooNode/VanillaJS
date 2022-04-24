const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    return await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(
      (res) => res.json()
    );
  },
  fetchCatInfo: async (_id) => {
    // const response = await fetch(`${API_ENDPOINT}/api/cats/${_id}`);

    // if (response.ok) {
    //   const searchData = await response.json();

    //   return searchData;
    // } else throw new Error("요청에 실패하였습니다.");
    return await fetch(`${API_ENDPOINT}/api/cats/${_id}`).then((res) =>
      res.json()
    );
  },
  fetchRandom: async () => {
    return await fetch(`${API_ENDPOINT}/api/cats/random50`).then((res) =>
      res.json()
    );
  },
};
