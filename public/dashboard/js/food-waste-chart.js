/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

function getMonday(d) { // 'August 19, 1975 23:15:30'
  d = new Date(d);
  var day = d.getDay(), // Monday
      diff = d.getDate() /* 19 */ - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

fetch('/food-waste')
 .then((response) => response.json())
 .then((data) => {

  const chartData = {}

  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[i].groceries.length; j++){

      const grocery = data[i].groceries[j]
      if(grocery.expirationDate){
        const expDate = new Date(grocery.expirationDate)
        const monday = getMonday(expDate)
        const now = new Date()
        let week = chartData[`${monday.toLocaleDateString()}`] // Change this if you want transform how the week are labled
        if(!week){
          week = {
            consumed: 0,
            wasted: 0
          }
          chartData[`${monday.toLocaleDateString()}`] = week // Change this if you want transform how the week are labled
        }
        if(expDate < now && grocery.consume === false){
          week.wasted++
        } else if(grocery.consume === true){
          week.consumed++
        }
      }

    }
  }

  // Extracting the data you care about in order to create the Wasted food graph
  /*
  chartData = {
      NAME OF WEEK = {
        key1,
        key2
      },
      NAME OF WEEK = {
        key1,
        key2
      }
    }
  */

  const weeks = []
  const consumedData = []
  const wastedData = []

  Object.keys(chartData).forEach(key => {
    weeks.push(key)
    consumedData.push(chartData[key].consumed)
    wastedData.push(chartData[key].wasted)
  })

  const barConfig = {
    type: 'bar',
    data: {
      labels: weeks, 
      datasets: [
        {
          label: 'Wasted',
          backgroundColor: '#0694a2',
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: wastedData, // Collect the data points from the wasted weeks
        },
        {
          label: 'Consumed',
          backgroundColor: '#7e3af2',
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: consumedData, // Collect the data points from the consumed weeks
        },
        // {
        //   label: 'TEST',
        //   backgroundColor: '#7e3af2',
        //   // borderColor: window.chartColors.blue,
        //   borderWidth: 1,
        //   data: , // Collect the data points
        // }
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
    },
  }
  
  const barsCtx = document.getElementById('bars')
  window.myBar = new Chart(barsCtx, barConfig)
  
});