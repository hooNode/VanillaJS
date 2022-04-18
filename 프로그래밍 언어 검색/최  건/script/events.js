const onChangeInput = (event) => {
    if (!(event.keyCode == '38' || event.keyCode == '40' || event.keyCode == '13')) {
        keyword = event.target.value;
        if (keyword.length < 1) {
            suggestionDiv.style.display = "none";
            return;
        };
        localStorage.setItem("keyword", keyword);

        search(keyword);
        return;
    }
    const suggestionItems = suggestionUl.getElementsByTagName("li");
    const currentItem = suggestionUl.getElementsByClassName("Suggestion__item--selected")[0];
    let currentIndex = 0;
    let nextIndex = 0;

    if (suggestionItems < 1) return;

    for (let i = 0; i < suggestionItems.length; i++) {
        if (suggestionItems[i] === currentItem) {
            currentIndex = i;
            continue;
        }
    }

    if (event.keyCode == '13') {
        addSelectedLanguages(suggestionItems[currentIndex].innerText);
        return;
    }
    suggestionItems[currentIndex].classList.remove("Suggestion__item--selected");
    if (event.keyCode == '40')
        nextIndex = currentIndex + 1 === suggestionItems.length ? 0 : currentIndex + 1;
    else
        nextIndex = currentIndex === 0 ? suggestionItems.length - 1 : currentIndex - 1;

    suggestionItems[nextIndex].classList.add("Suggestion__item--selected");


}

const onClickSearchItem = (event) => {
    if (!event || !event.target.value.length < 1) return;
    const language = event.target.innerText;
    addSelectedLanguages(language);
    localStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages));
}