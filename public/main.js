var add = document.getElementById('add')
var trash = document.getElementsByClassName("fa-trash-o");

Array.from(add).forEach(function(element) {
      element.addEventListener('click', function(){
        const groceries = this.parentNode.childNodes[1].innerText
        console.log(groceries)
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

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const groceries = this.parentNode.childNodes[1].innerText
        console.log(groceries)
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'groceries': groceries,
            'userID' : req.user._id 
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
