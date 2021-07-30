
const filterAJAX = (id) => {
    axios.get(`http://localhost:3000/filter/${id}`)
}

const checkBoxes = document.querySelectorAll('.checkbox')

checkBoxes.forEach(c => c.onclick = event => {
    if(c.checked){
        const id = c.getAttribute('data-tag-id')

        return filterAJAX(id)
    }
    return 
})