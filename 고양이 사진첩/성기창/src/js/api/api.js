const END_PINT = new URL(
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev"
);

export const useApi = () => {
  const get = async (nodeId) => {
    try {
      const response = await fetch(`${END_PINT}/${nodeId ? nodeId : ""}`, {
        method: "GET",
      });

      if (!response.ok) alert("서버 오류입니다.");

      return await response.json();
    } catch (error) {
      alert(error.message);
    }
  };

  return { get };
};
