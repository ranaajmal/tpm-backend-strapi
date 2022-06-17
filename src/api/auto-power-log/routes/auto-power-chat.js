module.exports = {
  routes: [
    { 
      method: 'GET',
      path: '/auto-power-chart/machine/:id',
      handler: 'auto-power-chart.autoPowerLogsAdapter',
    }
  ]
}