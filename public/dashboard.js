 /*globals Chart:true, feather:true */

(function () {
    'use strict'
  
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Accidental Insurance', 'Home Insurance', 'Travel Insurance', 'Wallet Insurance','Vehicle Insurance','Appliance Insurance'],
            datasets: [{
                label: 'Number of Insurance availed daily based on Types',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'red',
                    'blue',
                    'grey',
                    'darkgreen',
                    'violet',
                    'darkorange'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
  
    // // Graphs
    // var ctx = document.getElementById('myChart')
    // // eslint-disable-next-line no-unused-vars
    // var myChart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: [
    //       'Sunday',
    //       'Monday',
    //       'Tuesday',
    //       'Wednesday',
    //       'Thursday',
    //       'Friday',
    //       'Saturday'
    //     ],
    //     datasets: [{
    //       data: [
    //         15339,
    //         21345,
    //         18483,
    //         24003,
    //         23489,
    //         24092,
    //         12034
    //       ],
    //       lineTension: 0,
    //       backgroundColor: 'transparent',
    //       borderColor: '#007bff',
    //       borderWidth: 4,
    //       pointBackgroundColor: '#007bff'
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: false
    //         }
    //       }]
    //     },
    //     legend: {
    //       display: false
    //     }
    //   }
    // })
  })()
  