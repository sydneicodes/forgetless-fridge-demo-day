btns = document.querySelectorAll('.get')
console.log(btns)
btns.forEach((btn) => btn.addEventListener('click', getRecipe))
let key = '6b7680345b1c48a9a7b87518cb165e62'

function getRecipe(e) {
    let container = document.querySelector('.tables')
    let ingredients = document.querySelector('select').value
    console.log(ingredients)
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${key}&number=3`)
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let title = data[i].title
                let image = data[i].image
                let id = data[i].id
                let usedCount = data[i].usedIngredientCount
                let div = document.createElement('table')
                let missed = data[i].missedIngredients
                let td = document.createElement('td')
                for (let j = 0; j < missed.length; j++) {
                    let li = document.createElement('li')
                    li.innerText = missed[j].name
                    td.appendChild(li)
                }

                div.innerHTML = `
                <thead>
                <tr>
                <th>Recipe</th>
                <th>Image</th>
                <th>Used Ingredients</th>
                <th>Missing Ingredients</th>
                </tr>
                </thead>
                <tr>
                <td><h1>${title}</h1></td>
                <td> <img src="${image}"></td>
                <td>${usedCount}</td>
                </tr>
                `
                let tbody = div.childNodes[3]
                let tr = tbody.childNodes[0]
                tr.appendChild(td)
                let btn = document.createElement('button')
                btn.innerText = 'Select Recipe'
                btn.setAttribute("data-title", `${title}`)
                btn.setAttribute("data-id", `${id}`)
                btn.setAttribute("class", `rounded hover:bg-blue-500 bg-blue-900 py-2 px-4 text-white mb-15 selectBtn`)
                container.appendChild(div)
                container.appendChild(btn)
                btn.addEventListener('click', storeRecipe)
            }
        })
}


function storeRecipe(e) {
    let title = e.target.dataset.title
    let recipeId = e.target.dataset.id

    fetch('storeRecipe', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title, recipeId
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
}

