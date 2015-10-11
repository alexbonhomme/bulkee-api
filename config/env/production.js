module.exports = {
  name: 'bulkee-api',
  mongo: {
    url: 'mongodb://admin:admin@ds027908.mongolab.com:27908/bulkee-dev'
  },
  server: {
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
    ip: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    url: 'http://localhost:3000',
    basePath: '/api/v1.0'
  },
  redis: {
    host: '159.8.128.97',
    port: '5220',
    auth: 'c6e0986a-ba27-4127-a534-55e50b3e7ca9'
  },
  apiKey: {
    keenProjectId: '54dca8bf96773d3d2f43b6f8',
    keenWriteKey: '388c5a569439ea92318051b1c70e7dd2fa5c5768a349d456613cb3c5b354c961' + 
    '5a230da5a4df79adcab010b7fe926ba461b67de5096085a0bd99e7f020f0d16a7a4cb3dd5388c' + 
    'e8a87761c9c7e3475cefb78ed54d618477fd7c9ab8358101cf7af2c7bac7c3c71e61ab9649fd44c9396',
    mandrillKey: '3USgC1CN9GVZyAiW72G8tg'
  }
};
