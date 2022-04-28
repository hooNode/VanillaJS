const valid = {
  prevKeyword: (keyword) => {
    const previous = JSON.parse(localStorage.getItem("keyword")) || [];

    if (previous.includes(keyword)) {
      return previous;
    } else {
      if (previous.length === 5) {
        const removeFirstIndex = previous.slice(1, 5);

        const newKeyword = [...removeFirstIndex, keyword];

        return newKeyword;
      } else {
        const newKeyword = [...previous, keyword];
        return newKeyword;
      }
    }
  },
};
