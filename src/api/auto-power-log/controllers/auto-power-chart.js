module.exports = {
  async autoPowerLogsAdapter(ctx, next) {
    
    const { id } = ctx.params;
    let entries = await strapi.entityService.findMany('api::auto-power.auto-power', {
      filters: { machine: {id: id} },
      populate: ["machine", "parameters"],
    });
    const machine = entries[0].machine;
    const parameters = entries[0].parameters;

    entries = await strapi.entityService.findMany('api::auto-power-log.auto-power-log', {
      populate: ["LogData"],
      filters: { machine: {id: id} },
      sort: {createdAt: 'desc'},
      limit: 60,
    });

    let series = {};
    parameters.forEach(parameter => {
      series[parameter.name] = {
        ...parameter,
        data: []
      };
    });

    entries.map(log => {
      log.LogData.forEach(log => {
        series[log.name] && series[log.name].data.push(log.value);
      });
    });

    ctx.body = {machine, series: Object.values(series)};
  },
};