let addToFridge = document.getElementsByClassName("addToFridge")


Array.from(addToFridge).forEach(function (element) {
    element.addEventListener('click', function () {
        const listId = this.dataset.listid
        const grocery = this.dataset.grocery
        const expDateId = 'expDate-' + listId + '-' + grocery 
        console.log(listId)
        console.log(grocery)
        console.log(expDateId)

       const dateInput = document.getElementById(expDateId)
       const expDate = dateInput.value
       console.log(expDate)
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

