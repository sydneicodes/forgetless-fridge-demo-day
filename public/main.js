document.querySelector('.store').addEventListener('click', storeList)
let trash = document.getElementsByClassName("delete");


function storeList() {
  console.log('storing...')
  let groceries = []
  let rows = document.getElementsByClassName('rows')


  for (let i = 0; i < rows.length; i++) {
    let cell = rows[i].getElementsByTagName('td')
    let grocery = cell[0].getElementsByTagName('input')[0].value
    let purchasedVal = cell[1].getElementsByTagName('input')[0].checked
    groceries.push({ 
      grocery, 
      purchasedVal, 
      expirationDate: "", 
      fridge: false,
      consume: false
    })
  }
  // UNUSED
  // let purchasedArr = []
  // let unpurchasedArr = []

  const purchasedArr = groceries.filter(grocery => grocery.purchasedVal)
  console.log(`Purchased Array: ${JSON.stringify(purchasedArr)}`)

  // EXAMPLE
  // const byTwo = [1,2,3].map(num => {
  //   if(num < 2)
  //     return num * 2
  // })
  // console.log(byTwo) // expected 2

  // UNKNOWN USAGE
  // purchasedObj.forEach((obj) => {
  //   purchasedArr.push(obj.grocery)
  // })

  window.location.reload(true)
  fetch('save-list', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // UNUSED
      // 'groceries': groceries,
      'purchased': purchasedArr,
      'unpurchasedCount': groceries.length - purchasedArr.length
    })
  })
  .then((res)=>res.json())
  .then((data)=>console.log(data))
}

function addRow(tableID) {
  let table = document.getElementsByClassName(tableID);
  let rowCount = table[0].rows.length;

  if (rowCount >= 21) {
    // +1 for header row.
    return;
  }

  let row = table[0].insertRow(rowCount);
  row.classList.add('rows')
  let cell1 = row.insertCell(0);
  let element1 = document.createElement("input");
  element1.type = "text";
  element1.name = "";
  element1.placeholder = "Your next item";
  cell1.appendChild(element1);

  // let cell2 = row.insertCell(1);
  // cell2.innerHTML = rowCount;

  let cell3 = row.insertCell(1);
  let element2 = document.createElement("input");
  element2.type = "checkbox";
  element2.name = "chkbox[]";
  cell3.appendChild(element2);

  let cell4 = row.insertCell(2);
  let element3 = document.createElement("input");
  element3.type = "checkbox";
  element3.name = "chkbox[]";
  cell4.appendChild(element3);
}

function deleteRow(tableId) {
  let table = document.getElementsByClassName(tableId);
  let rowCount = table[0].rows.length;
  for (let i = 0; i < rowCount; i++) {
    let row = table[0].rows[i]
    let checkbox = row.cells[2].childNodes[0]

    if (checkbox.checked) {
      console.log('checked')
      table[0].deleteRow(i)
      rowCount--
      i--
    }

  }

}

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const _id = this.parentNode.getAttribute('id')
    fetch('deleteList', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
