const main = document.querySelector(".App");
const input = document.querySelector(".SearchInput__input");
const form = document.querySelector(".SearchInput");
const tags = document.querySelector(".SelectedLanguage");
const tagsUl = document.createElement("ul");

let inputValue;
let timer;

input.addEventListener("input", (e) => {
    // 아니이거 왜이래요
    inputValue = e.target.value;
    const suggestion = document.querySelector(".Suggestion");

    if (timer) clearTimeout(timer);
    if (suggestion) {
        window.removeEventListener("keydown", selectSuggestion);
        main.removeChild(suggestion)
    };
    if (!e.target.value) return;

    timer = setTimeout(() => {
        const getData = async () => {
            const url = new URL('./dev/languages', 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com')
            url.searchParams.set("keyword", inputValue)
            
            let response = await fetch(url.href, {
                method: 'GET',
            });
            
            if (response.ok) {
                const result = await response.json();
                const div = document.createElement("div");
                div.className = "Suggestion";                
                const ul = document.createElement("ul");

                if (!result.length) {
                    const li = document.createElement("li");
                    li.textContent = "검색 결과가 없습니다.";
                    ul.appendChild(li)
                } else {
                    result.forEach((data, idx) => {
                        const li = document.createElement("li");
                        // const span = document.createElement("span");
                        
                        if (!idx) li.className = "Suggestion__item--selected";
    
                        li.textContent = data;
                        ul.appendChild(li)
                    });
                }
                div.appendChild(ul);
                main.appendChild(div);
                window.addEventListener("keydown", selectSuggestion);
                ul.addEventListener("click", clickEvent)
            }
        }
        
        getData();
    }, 500)    
})

const selectSuggestion = (e) => {
    if (!document.querySelector(".Suggestion")) return;

    const suggestion = document.querySelector(".Suggestion");
    const target = suggestion.firstChild.childNodes;
    
    let index;
    target.forEach((data, idx) => {
        if (data.className === "Suggestion__item--selected") index = idx;
    })

    if (e.key === "ArrowUp") {
        if (!index) return;
        target[index].className = ""
        target[index - 1].className = "Suggestion__item--selected"
    }
    else if (e.key === "ArrowDown") {
        if (index === target.length - 1) return;
        target[index].className = ""
        target[index + 1].className = "Suggestion__item--selected" 
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        alert(target[index].textContent)
        addTag(target[index].textContent);
    }
}

const clickEvent = (e) => {
    alert(e.target.textContent)
    addTag(e.target.textContent);
}

const addTag = (name) => {
    const result = valid(name)
    
    if (!result) return;

    const li = document.createElement("li");
    li.textContent = name;
    
    tagsUl.appendChild(li);
    tags.appendChild(tagsUl);
}

const valid = (name) => {
    const target = tagsUl.childNodes;
    let isRepeat = false, index;
    
    if (!target.length) return true;

    target.forEach((data, idx) => {
        if (data.textContent === name) {
            index = idx;
            isRepeat = true;
        }
    }) 
    
    if (isRepeat) {
        if (index === target.length - 1) return false;
        else {
            tagsUl.removeChild(target[index]);
            return true;
        }
    } else {
        if (target.length !== 5) return true;
        else {
            tagsUl.removeChild(tagsUl.firstChild);
            return true;
        }
    }
}