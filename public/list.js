const edit = document.querySelectorAll('.edit')
const inputs = document.querySelectorAll('.titles')

edit.forEach((icon) => icon.addEventListener('click', editTitle))
inputs.forEach((input) => input.addEventListener('keyup', saveNewTitle))

function editTitle(e){
   const h2 = e.target.parentNode.childNodes[1]
   const originalTitle = h2.childNodes[1]
   originalTitle.focus()
   originalTitle.addEventListener('keyup', saveNewTitle)
}

function saveNewTitle(e){
 let newTitle = e.target.value
 let _id = e.target.parentNode.parentNode.getAttribute('id')
         fetch('edit', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            newTitle,
            _id
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
        })
} 