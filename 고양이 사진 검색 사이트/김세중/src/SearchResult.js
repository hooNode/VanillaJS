class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
    
    constructor({ $target, initialData, onClick }) {
      this.$searchResult = document.createElement("div");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
  
      this.data = initialData;
      this.onClick = onClick;
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
   
    render() {
      console.log(this.data)
      this.$searchResult.innerHTML = this.data
        .map(
          cat => `
            <div class="item" >
              <img src=${cat.url} alt=${cat.name} id=${cat.id} />
            </div>
          `
        )
        .join("");
        
      
        
      
      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
      window.onresize = function(event) {
        var innerWidth = window.innerWidth;
      
        if(innerWidth <="992") {
          document.documentElement.style.setProperty(`--first`, "repeat(3, minmax(250px, 1fr))");
        }
        if(innerWidth >"992") {
          document.documentElement.style.setProperty(`--first`, "repeat(4, minmax(250px, 1fr))");
        }
        if(innerWidth <="768") {
          document.documentElement.style.setProperty(`--first`, "repeat(2, minmax(250px, 1fr))");
        }
        if(innerWidth <="576") {
          document.documentElement.style.setProperty(`--first`, "repeat(1, minmax(250px, 1fr))");
        }
      
      }
      
    }
    
  }
  