'use strict';

/**
 *  shortener controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::shortener.shortener');
