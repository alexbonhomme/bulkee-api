'use strict';

module.exports = {
  paths: {
    '/api/v1.0/users': {
      get: {
        tags: ['user'],
        summary: 'Get all users',
        operationId: 'allUsers'
      }
    },
    '/api/v1.0/users/{id}': {
      get: {
        tags: ['user'],
        summary: 'Get one user',
        operationId: 'oneUser',
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            required: true
          }
        ]
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
