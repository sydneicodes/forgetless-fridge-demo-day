/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

document.querySelector('.nutritionSelection').addEventListener('change', (e) => {
  let selectionId = e.target.value

  fetch('/food-waste')
    .then((response) => response.json())
    .then((data) => {
      let pieData = {}

      let selected = data.filter((list) => list._id == selectionId)
      let groceries = selected[0].groceries
      groceries.forEach((item) => {
        let grocery = item.grocery
        let nutrition = item.nutrition
        let data = {}
        nutrition.forEach((food, index) => {
          if (index < 1) {
            data[food.name] = food.amount
          }
        })
        console.log(data)
        pieData[grocery] = data
      })
      console.log(pieData, 'pie?')

      let groceryNames = []
      let nutritientAmount = []
      let nutritientNames = []

      Object.keys(pieData).forEach((key) => {
        let nutrients = pieData[key]
        nutritientNames.push(Object.keys(nutrients))
        nutritientAmount.push(Object.values(nutrients))
        groceryNames.push(key)
      })

      console.log({ groceryNames, nutritientAmount, nutritientNames }, 'test?')

      const pieConfig = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: nutritientAmount, // food.amount
              backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
              label: groceryNames,
            },
          ],
          labels: nutritientNames,
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
          legend: {
            display: false,
          },
        },
      }
      // change this to the id of your chart element in HMTL
      const pieCtx = document.getElementById('pie')
      window.myPie = new Chart(pieCtx, pieConfig)




    })
})

