'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/news',
      handler: 'news.find',
      config: {},
    },
    {
      method: 'GET',
      path: '/news/:id',
      handler: 'news.findOne',
      config: {},
    },
  ],
};
