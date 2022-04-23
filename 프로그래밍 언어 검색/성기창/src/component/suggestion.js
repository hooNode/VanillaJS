export default function Suggestion({$target, data, onSelect}) {
    this.state = data;

    this.setSate = (value) => {
        this.state = value
        this.render();
    }

    this.render = () => {
        const {items} = this.state;
        const suggestion = document.querySelector(".Suggestion");
        
        if (suggestion) {
            $target.removeChild(suggestion)
            window.removeEventListener("keydown", selectSuggestion);
            this.$ul.removeEventListener("click", clickEvent);
        }

        this.$div = document.createElement("div");
        this.$div.className = "Suggestion"
        this.$ul = document.createElement('ul');
        

        if (!items.length) {
            this.$div.style.display = "none"
        } else {
            this.$div.style.display = "block"

            items.forEach((data, idx) => {
                this.$li = document.createElement("li");
                
                if(!idx) this.$li.classList = "Suggestion__item--selected";
        
                this.$li.textContent = data;
                this.$ul.appendChild(this.$li)
            })
        }

        this.$div.appendChild(this.$ul)
        $target.appendChild(this.$div)
        this.$ul.addEventListener("click", clickEvent);
        window.addEventListener("keydown", selectSuggestion);
    }

    const selectSuggestion = (e) => {
        const suggestion = document.querySelector(".Suggestion");
        if (suggestion.style.display === "none") return;
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
            target[index].classList.remove("Suggestion__item--selected");
            target[index + 1].className = "Suggestion__item--selected" 
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            alert(target[index].textContent);

            const isValid = valid(target[index].textContent)
            if (isValid) onSelect(target[index].textContent);
        }
    }    

    const clickEvent = (e) => {
        alert(e.target.textContent)
        
        const isValid = valid(e.target.textContent)
        if (isValid) onSelect(e.target.textContent);
    }

    this.render()
}