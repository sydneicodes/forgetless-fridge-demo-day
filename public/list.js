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

document.querySelector(".snap").addEventListener("click", takeAScreenShot);

function takeAScreenShot() {
  const captureElement = document.querySelector("#capture");
  html2canvas(captureElement)
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "my-list.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
}