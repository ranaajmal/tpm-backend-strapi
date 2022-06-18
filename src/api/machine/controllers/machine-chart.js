// http://localhost:1337/api/machine-chart/machine/1/limit/60
module.exports = {
  async machineChartAdapter(ctx, next) {
    
    const { id, limit = 60 } = ctx.params;
    
    let entries, machine, parameters, powerSeries, productionSeries;

    // 1- Get Schema
    entries = await strapi.entityService.findMany('api::auto-power.auto-power', {
      filters: { machine: {id: id} },
      populate: ["machine", "parameters"],
    });
    machine = entries[0].machine;
    parameters = entries[0].parameters;

    // 2- Get Log Data
    entries = await strapi.entityService.findMany('api::auto-power-log.auto-power-log', {
      populate: ["LogData"],
      filters: { machine: {id: id} },
      sort: {createdAt: 'desc'},
      limit: limit,
    });

    // 3- Make Power Chart Series
    powerSeries = {};
    parameters.forEach(parameter => {
      powerSeries[parameter.name] = {
        ...parameter,
        data: []
      };
    });

    entries.forEach(parameterLogValues => {
      parameterLogValues.LogData.forEach(log => {
        powerSeries[log.name] && powerSeries[log.name].data.push(log.value);
      });
    });

    powerSeries = Object.values(powerSeries);
  
    // -------------------------------------------------------

    // 1- Get Schema
    entries = await strapi.entityService.findMany('api::auto-production.auto-production', {
      filters: { machine: {id: id} },
      populate: ["parameters"],
    });
    parameters = entries[0].parameters;

    // 2- Get Log Data
    entries = await strapi.entityService.findMany('api::auto-production-log.auto-production-log', {
      populate: ["LogData"],
      filters: { machine: {id: id} },
      sort: {createdAt: 'desc'},
      limit: limit,
    });

    // 3- Make Production Chart Series
    productionSeries = {};
    parameters.forEach(parameter => {
      productionSeries[parameter.name] = {
        ...parameter,
        data: []
      };
    });

    entries.forEach(parameterLogValues => {
      parameterLogValues.LogData.forEach(log => {
        productionSeries[log.name] && productionSeries[log.name].data.push(log.value);
      });
    });

    productionSeries = Object.values(productionSeries);
    
    // -------------------------------------------------------------
    ctx.body = {machine, powerSeries, productionSeries};
  },
};