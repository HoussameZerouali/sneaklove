const parent = document.getElementById('products_grid')
const checkBoxes = document.querySelectorAll('.checkbox')
const tagList = document.getElementById('tag_list')

const filterAJAX = (id) => {
   return axios.post(`http://localhost:3000/filter/${id}`)
}

const noFilterAJAX = () => {
    return axios.post(`http://localhost:3000/nofilter`)
 }

 let allUnchecked = true

    
tagList.onclick = async () => {
      allUnchecked = true
    parent.innerHTML = ''

    checkBoxes.forEach(async c => {

        if(c.checked){
            allUnchecked = false
            const id = c.getAttribute('data-tag-id')

            const dataTab = await filterAJAX(id)

            return desplayFilteredHTML(dataTab)
        }

    })


    if(allUnchecked){
        const dataTab = await noFilterAJAX()
        return desplayFilteredHTML(dataTab)
    }

    return
}

function desplayFilteredHTML(dataTab){

    dataTab.data.forEach(t => {
        parent.innerHTML += `
        <a href="/one-product/${t._id}" class="product-item-wrapper">
            <div class="product-img">
                <img src="${t.image}" alt="${t.name}" : what a nice pair of kicks">
            </div>
            <p class="product-name">${t.name}</p>
            <p class="product-cat">${t.category}</p>
            <p class="product-price">${t.price}</p>
        </a>
    `
    })
  
}