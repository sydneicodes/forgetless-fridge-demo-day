/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */



fetch('/meals-data')
  .then((res) => res.json())
  .then((data) => {
    let days = []
    let count = []

    Object.keys(data).forEach((key) => {
      days.push(key)
      count.push(data[key])
    })

    console.log(days, count)
    const lineConfig = {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Meals eaten',
            backgroundColor: '#0694a2',
            borderColor: '#0694a2',
            data: count,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        /**
         * Default legends are ugly and impossible to style.
         * See examples in charts.html to add your own legends
         *  */
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          x: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Days',
            },
          },
          y: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Count',
            },
          },
        },
      },
    }

    // change this to the id of your chart element in HMTL
    const lineCtx = document.getElementById('line')
    window.myLine = new Chart(lineCtx, lineConfig)
  })


