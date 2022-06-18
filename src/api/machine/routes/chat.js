module.exports = {
  routes: [
    { 
      method: 'GET',
      path: '/chart/machine/:id/limit/:limit',
      handler: 'chart.machineAutoLogsAdapter',
    }
  ]
}