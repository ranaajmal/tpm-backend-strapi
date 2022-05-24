'use strict';

/**
 *  auto-production controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::auto-production.auto-production');
