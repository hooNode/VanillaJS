export default function SearchInput({$target, data, onChange}) {
    this.$element = document.createElement('form');
    this.$element.className = "SearchInput";
    this.$input = document.createElement('input');
    this.$input.className = "SearchInput__input";
    this.$input.type = "text";
    this.$input.placeholder = "프로그램 언어를 입력하세요.";
    this.$input.textContent = data;

    this.$element.appendChild(this.$input);
    $target.appendChild(this.$element);

    let timer;
    this.state = data

    this.setState = (value) => {
        this.state = value
        
        this.render();
    }
    
    this.render = () => {
        this.$input.textContent = this.state;
    }

    this.render();

    this.$input.addEventListener("input", (e) => {
        this.setState(e.target.value)

        if (!this.state.timer) clearTimeout(timer);
        
        timer = setTimeout(() => {
            onChange(e.target.value)
        }, 500)
        
    })
}