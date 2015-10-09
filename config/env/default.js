'use strict';

module.exports = {
  name: 'bulkee-api',
  server: {
    port: process.env.PORT || 3000,
    url: 'http://localhost:' + (process.env.PORT || 3000),
    basePath: '/api/v1.0'
  },
  mongo: {
    url: 'mongodb://localhost:27017/bulkee-dev'
  },
  redis: {
    host: 'localhost',
    port: '6379',
    auth: ''
  },
  elastic: {
    url: 'http://localhost:9200',
    index: 'dev_staging_v1.0',
    alias: 'node-base'
  },
  apiKey: {
    keenProjectId: '54dca8bf96773d3d2f43b6f8',
    keenWriteKey: '388c5a569439ea92318051b1c70e7dd2fa5c5768a349d456613cb3c5b354c961' + 
    '5a230da5a4df79adcab010b7fe926ba461b67de5096085a0bd99e7f020f0d16a7a4cb3dd5388c' + 
    'e8a87761c9c7e3475cefb78ed54d618477fd7c9ab8358101cf7af2c7bac7c3c71e61ab9649fd44c9396',
    mandrillKey: '3USgC1CN9GVZyAiW72G8tg'
  }
};
