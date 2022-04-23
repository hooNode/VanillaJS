export const GetData = async (keyword) => {
    const url = new URL('./dev/languages', 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com')
    url.searchParams.set("keyword", keyword)
    
    let response = await fetch(url.href, {
        method: 'GET',
    });
    
    if (response.ok) {
        const searchData = await response.json();

        return searchData;
    }
    else throw new Error ("요청에 실패하였습니다.");
}