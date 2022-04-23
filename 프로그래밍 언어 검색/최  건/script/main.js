let selectedLanguages = [];

const setSelectedLanguages = () => {
  selectedLanguages.forEach((language) => {
    const resultItem = document.createElement("li");
    resultItem.innerHTML = language;
    selectedLanguageUl.append(resultItem);
  });
};

const addSelectedLanguages = (language) => {
  alert(language);
  selectedLanguages = selectedLanguages.filter(
    (el, idx) => el !== language && selectedLanguages.length - idx < 5
  );
  selectedLanguages.push(language);

  const prevChilds = selectedLanguageUl.getElementsByTagName("li");
  while (prevChilds.length > 0) {
    selectedLanguageUl.removeChild(prevChilds[0]);
  }
  setSelectedLanguages();
};

const search = async (keyword) => {
  const searchResult = await fetch(
    `https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${keyword}`
  )
    .then((res) => res.json())
    .then((data) => data);
  suggestionDiv.style.display = searchResult.length < 1 ? "none" : "block";
  const prevChilds = suggestionUl.getElementsByTagName("li");

  while (prevChilds.length > 0) {
    suggestionUl.removeChild(prevChilds[0]);
  }
  if (searchResult.length < 1) return;
  for (let i = 0; i < searchResult.length; i++) {
    const keywordIdx = searchResult[i]
      .toUpperCase()
      .indexOf(keyword.toUpperCase());

    keyword = searchResult[i].slice(keywordIdx, keywordIdx + keyword.length);
    searchResult[i] = searchResult[i]
      .replaceAll(keyword, `#$%%$#${keyword}#$%%$#`)
      .split("#$%%$#")
      .filter((el) => el);

    const resultItem = document.createElement("li");
    for (let j = 0; j < searchResult[i].length; j++) {
      if (searchResult[i][j].length < 1) continue;
      resultItem.innerHTML +=
        searchResult[i][j] === keyword
          ? `<span class="Suggestion__item--matched">${keyword}</span>`
          : searchResult[i][j];
    }
    resultItem.addEventListener("click", (e) => {
      onClickSearchItem(e);
    });
    suggestionUl.append(resultItem);
    if (suggestionUl.childElementCount === 1)
      resultItem.className = "Suggestion__item--selected";
  }
};

const setInitialValue = () => {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  input.addEventListener("keyup", async (event) => {
    onChangeInput(event);
  });
  input.focus();
  suggestionDiv.style.display = "none";
  const keyword = localStorage.getItem("keyword") || "";
  if (keyword.length > 0) {
    search(keyword);
    input.value = keyword;
  }
  selectedLanguages =
    JSON.parse(localStorage.getItem("selectedLanguages")) || [];
  if (selectedLanguages.length > 0) setSelectedLanguages();
};

setInitialValue();
