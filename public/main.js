var add = document.getElementById('add')
// var trash = document.getElementsByClassName("fa-trash-o");

Array.from(add).forEach(function(element) {
      element.addEventListener('click', function(){
        const groceries = this.parentNode.childNodes[1].innerText
        console.log(groceries)
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        // const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('groceries_list', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'groceries': groceries
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    fetch('downVote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbDown':thumbDown
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
