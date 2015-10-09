'use strict';

module.exports = {
  paths: {
    '/api/v1.0/clubs': {
      get: {
        tags: ['clubs'],
        summary: 'Clubs',
        operationId: 'clubs'
      }
    }
  },

  definitions: {
    User: {
      properties: {
        id: {
          type: 'integer'
        },
        username: {
          type: 'string'
        },
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
  }

};
