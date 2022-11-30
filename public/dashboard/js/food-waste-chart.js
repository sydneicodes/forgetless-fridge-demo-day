/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

 function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
 Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
  
      dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
      var newYear = new Date(this.getFullYear(),0,1);
      var day = newYear.getDay() - dowOffset; //the day of week the year begins on
      day = (day >= 0 ? day : day + 7);
      var daynum = Math.floor((this.getTime() - newYear.getTime() - 
      (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
      var weeknum;
      //if the year starts before the middle of a week
      if(day < 4) {
          weeknum = Math.floor((daynum+day-1)/7) + 1;
          if(weeknum > 52) {
              nYear = new Date(this.getFullYear() + 1,0,1);
              nday = nYear.getDay() - dowOffset;
              nday = nday >= 0 ? nday : nday + 7;
              /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
              weeknum = nday < 4 ? 1 : 53;
          }
      }
      else {
          weeknum = Math.floor((daynum+day-1)/7);
      }
      return weeknum;
  };
 fetch('/food-waste')
 .then((response) => response.json())
 .then((data) => {
  const chartData = {}
  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[i].groceries.length; j++){
      const grocery = data[i].groceries[j]
      if(grocery.expirationDate){
        console.log(grocery)
        const expDate = new Date(grocery.expirationDate)
        console.log(expDate.getWeek())
        const monday = getMonday(expDate)
        const now = new Date()
        let week = chartData[monday.toString()]
        if(!week){
          week = {
            consumed: 0,
            wasted: 0
          }
          chartData[monday.toString()] = week
        }
        if(expDate < now && grocery.consume === false){
          week.wasted++
        } else if(grocery.consume === true){
          week.consumed++
        }
      }
    }
  }
  console.log("chart data",chartData)
  const barConfig = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], //put the weeks here
      datasets: [
        {
          label: 'Shoes',
          backgroundColor: '#0694a2',
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [-3, 14, 52, 74, 33, 90, 70],
        },
        {
          label: 'Bags',
          backgroundColor: '#7e3af2',
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [66, 33, 43, 12, 54, 62, 84],
        },
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
  
  console.log(data)

});

