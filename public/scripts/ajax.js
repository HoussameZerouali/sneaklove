
const filterAJAX = (id) => {
   return axios.post(`http://localhost:3000/filter/${id}`)
}

const checkBoxes = document.querySelectorAll('.checkbox')

checkBoxes.forEach(c => c.onclick = event => {
    if(c.checked){
        const id = c.getAttribute('data-tag-id')

        return filterAJAX(id).then(res => console.log(res))
    }
    return 
})