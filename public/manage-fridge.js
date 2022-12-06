let addToFridge = document.getElementsByClassName("addToFridge")
let consume = document.getElementsByClassName("consume")

Array.from(addToFridge).forEach(function (element) {
    element.addEventListener('click', function () {
        console.log('adding to fridge...')
        const entry = this.closest(".entry")
        const listId = entry.dataset.listid
        const grocery = entry.dataset.grocery
        const expDate = new Date(entry.querySelector(".expDate").value)
        const today = new Date()
        const days = daysBetween(today, expDate) 
        console.log(days)
        let key = '6b7680345b1c48a9a7b87518cb165e62'

        fetch(`https://api.spoonacular.com/food/ingredients/search?query=${grocery}&apiKey=${key}&number=1`)
            .then((res) => res.json())
            .then((data) => {
                let id = data.results[0].id
                fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${key}`)
                    .then((res) => res.json())
                    .then((data) => {
                        let nutrients = data.nutrition.nutrients
                        nutrients = nutrients.filter((result) => result.name === 'Fat' || result.name === 'Sugar' || result.name === 'Protein' || result.name === 'Carbohydrates' || result.name === 'Vitamin A' || result.name === 'Fiber')
                        nutrients.sort((a, b) => b.amount - a.amount)
                        console.log(nutrients)
                        fetch('addToFridge', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                listId,
                                grocery,
                                expDate,
                                days,
                                nutrients
                            })
                        }).then(function (response) {
                            window.location.reload()
                        })

                    })
            })
    });
});

function daysBetween(expDate, today) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;
    // Calculate the difference in milliseconds
    const differenceMs = today - expDate;
    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
}

Array.from(consume).forEach(function (element) {
    element.addEventListener('click', function () {
        console.log('removing from fridge...')
        const entry = this.closest(".entry")
        const listId = entry.dataset.listid
        const grocery = entry.dataset.grocery

        fetch('consume', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listId,
                grocery,
            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});