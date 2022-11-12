
export default function checkFormInput(values) {
  const noValues= []
  for (const property in values) {
    const element = document.getElementById(`${property}`)
    if(values[property] === null || values[property] === '' || values[property] === undefined){
      element.classList.add("error-input")
      element.focus();
      setTimeout(() => {
        element && element.classList.remove("error-input")
      }, 4000);
      noValues.push(property)
    }
  }
  console.log(noValues)
return noValues.length > 0 ? noValues : null
}