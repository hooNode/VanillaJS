const main = document.querySelector(".App");
const input = document.querySelector(".SearchInput__input");

let inputValue;
let timer;

input.addEventListener("input", (e) => {
    inputValue = e.target.value;
    const suggestion = document.querySelector(".Suggestion");

    if (timer) clearTimeout(timer);
    if (suggestion) {
        main.removeChild(suggestion)
        window.removeEventListener("keydown", selectSuggestion);
    };
    if (!e.target.value) return;

    timer = setTimeout(() => {
        const getData = async () => {
            // const url = "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=" + inputValue;
            
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
                
                result.forEach((data, idx) => {
                    const li = document.createElement("li");
                    // const span = document.createElement("span");
                    
                    if (!idx) li.className = "Suggestion__item--selected";

                    li.textContent = data;
                    ul.appendChild(li)
                });
                
                div.appendChild(ul);
                main.appendChild(div);
                window.addEventListener("keydown", selectSuggestion);
                ul.addEventListener("click", clickEvent)
            }
        }
        
        getData();
    }, 500)    
})

function selectSuggestion(e) {
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
        alert(target[index].textContent)
    }
}

function clickEvent(e) {
    alert(e.target.textContent)
}