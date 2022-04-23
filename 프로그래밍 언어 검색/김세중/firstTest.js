const searchInput = document.querySelector('.SearchInput__input')
const suggestionUl = document.querySelector('.Suggestion ul')
const selectedLan = document.querySelector('.SelectedLanguage ul')
let index= 0

searchInput.addEventListener('input', async () => {
  const suggestionUlLi = suggestionUl.querySelectorAll("li")

  const inputValue = searchInput.value
  
  window.addEventListener('keydown', arrowFunc)
  console.log(inputValue)
 
  if(!searchInput.value) return

  const result = await axios.get(`https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${inputValue}`)
  console.log(result.data)
  if(result.data.length===0) {
  suggestionUlLi.forEach(el => {
    el.remove()
  })
  return 

  }
  if(!searchInput.value) return
  suggestionUlLi.forEach(el => {
    el.remove()
  })
  const liEls = result.data.map((el,index) => {
    const liEl = document.createElement('li')
    if(index===0) liEl.classList.add('Suggestion__item--selected')

    liEl.innerText=el
    return liEl
  });
  console.log(liEls)
  suggestionUl.append(...liEls)

})

const arrowFunc = (e) => {

  const suggestionGroup = document.querySelectorAll(".Suggestion ul li")

  if(e.key ==='ArrowUp') {
    suggestionGroup[index].classList.remove('Suggestion__item--selected')
    if(!index) index=suggestionGroup.length - 1
    else index -= 1
    suggestionGroup[index].classList.add('Suggestion__item--selected')
  }
  
  if(e.key ==='ArrowDown') {
    suggestionGroup[index].classList.remove('Suggestion__item--selected')
    if(index === suggestionGroup.length - 1) index=0
    else index +=1
    suggestionGroup[index].classList.add('Suggestion__item--selected')
  }
  if(e.key==='Enter') {
    e.preventDefault()
    const keyEl = suggestionGroup[index].textContent 
    selectedFunc(keyEl)
  }

}

const selectedFunc = (keyEl)  => {
 alert(keyEl)
 const selectedLanUlLi = selectedLan.querySelectorAll('li')

 selectedLanUlLi.forEach((el,index) => {

  if(el.textContent===keyEl)  selectedLanUlLi[index].remove()

})
  const liEl = document.createElement('li')
  liEl.innerText=keyEl
  selectedLan.append(liEl)

  if(selectedLanUlLi.length === 5) {
    selectedLanUlLi[0].remove()
  }

  
  // if(index >=0) {
  //   console.log(index)
  //   selectedLanUlLi[index].remove()

  // }

 

}
