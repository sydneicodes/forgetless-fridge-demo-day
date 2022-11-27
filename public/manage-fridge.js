let addToFridge = document.getElementsByClassName("addToFridge")
let consume = document.getElementsByClassName("consume")

Array.from(addToFridge).forEach(function (element) {
    element.addEventListener('click', function () {
        console.log('adding to fridge...')
        const entry = this.closest(".entry")
        const listId = entry.dataset.listid
        const grocery = entry.dataset.grocery
        const expDate = entry.querySelector(".expDate").value

        fetch('addToFridge', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listId,
                grocery,
                expDate
            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});

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