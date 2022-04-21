import { GetData } from "./src/api/api.js";
import SearchInput from "./src/component/searchInput.js";
import Suggestion from "./src/component/suggestion.js";


export default function App({ $target }) {
    this.state = {
        fetchedDatas: [],
        selectedData: [],
    }

    this.setState = (value) => {
        this.state = {
            ...this.state,
            ...value,
        }

        suggestion.setSate({
            items: this.state.fetchedDatas
        })
    }
    
    const serchInput = new SearchInput({
      $target,
      data: "",
      onChange: async (keyword) => {
        if (!keyword.length) {
            this.setState({
                fetchedDatas: []
            })
        } else {
            const data = await GetData(keyword);
            this.setState({
                fetchedDatas: data
            })
        }
      },
    });

    const suggestion = new Suggestion({
        $target,
        data: {
            items: []
        },
        onSelect: (value) => {
            console.log(this.state)
            this.setState({
                selectedData: [...this.state.selectedData, value]
            });
        }
    })
}
