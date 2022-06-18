module.exports = {
  routes: [
    { 
      method: 'GET',
      path: '/machine-chart/machine/:id/limit/:limit',
      handler: 'machine-chart.machineChartAdapter',
    }
  ]
}