const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      console.dir(e);
    }
  },

  fetchCatDetail: async (id) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      console.dir(e);
    }
  },
};
