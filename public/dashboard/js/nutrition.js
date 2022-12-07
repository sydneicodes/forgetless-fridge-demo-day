/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */


let groceryList = document.querySelector('.nutritionSelection').value

getChartData(groceryList)

document.querySelector('.nutritionSelection').addEventListener('change', (e) => {
  let selectionId = e.target.value
  console.log(`Change has triggered. Changed to ${selectionId}.`)
  getChartData(selectionId)
})

function getChartData(selectionId) {
  fetch('/food-waste')
    .then((response) => response.json())
    .then((data) => {
      let pieData = {}
      let selected = data.filter((list) => list._id == selectionId)
      let groceries = selected[0].groceries

      groceries.forEach((item) => {
        let grocery = item.grocery
        let nutrition = item.nutrition
        // console.log("Nutrition = ", nutrition)

        let data = {}
        
        nutrition.forEach((food, index) => data[food.name] = food.amount )
        // console.log("after data modified = ", data)

        pieData[grocery] = data
      })
      // console.log('after modified pieData = ', pieData)

      let groceryNames = []
      const nutrientsTEST = { /*name: [], Vitamin A - [100, 200, 300] */ }

      Object.keys(pieData).forEach((key) => {
        // Gather all the names one time
        // Gather all the values from the nutrients
          // Add them up
          // Use a single value
        let nutrients = pieData[key] // Contains Nutrient name and values - could be repeating
        // console.log("nutrients = ", nutrients)

        for (const [key, value] of Object.entries(nutrients)) {
          // console.log("key = ", key, ", value = ", value)
          if(!nutrientsTEST[key]){
            nutrientsTEST[key] = [value]
          } else {
            nutrientsTEST[key].push(value)
          }
        }

        groceryNames.push(key)
      })

      const dataNutrientValues = Object.keys(nutrientsTEST).map(nutrientName => {
        return nutrientsTEST[nutrientName].reduce((acc, curr) => acc + curr, 0)
      })
      const dataNutrientNames = [...Object.keys(nutrientsTEST)]
      // console.log(`Nutrient Values = ${dataNutrientValues}`)
      // console.log(`Nutrient Names = ${dataNutrientNames}`)

      const totalNutrientValue = dataNutrientValues.reduce((acc, curr) => acc + curr, 0)
      const backgroundColor = dataNutrientValues.map(nutrientSum => getRandomColorHex())
      const pieDataValues = dataNutrientValues.map(nutrientSum => ((nutrientSum / totalNutrientValue) * 100).toFixed(2))
      console.log(`data = ${data}, totalNutrientValue = ${totalNutrientValue}`)

      const pieConfig = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: pieDataValues,
              backgroundColor: backgroundColor,
              label: groceryNames,
            },
          ],
          labels: dataNutrientNames,
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

      const newPieCTX = document.createElement("canvas")
      newPieCTX.setAttribute("id", "pie")
      pieCtx.replaceWith(newPieCTX)

      window.myPie = new Chart(newPieCTX, pieConfig)
    })
}


function getRandomColorHex() {
  var hex = "0123456789abcdef",
      color = "#";
  for (var i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color
}