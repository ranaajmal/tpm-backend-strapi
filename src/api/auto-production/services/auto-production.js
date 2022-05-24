'use strict';

/**
 * auto-production service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auto-production.auto-production');
