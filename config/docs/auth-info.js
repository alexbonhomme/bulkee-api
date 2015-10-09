'use strict';

module.exports = {
  paths: {
    '/login': {
      post: {
        tags: ['auth'],
        summary: 'Login',
        operationId: 'login',
        parameters: [{ in : 'formData',
          name: 'email',
          description: 'email to login',
          required: true,
          type: 'string'
        }, { in : 'formData',
          name: 'password',
          description: 'password to login',
          required: true,
          type: 'string'
        }]
      }
    },
    '/signup': {
      post: {
        tags: ['auth'],
        summary: 'Signup',
        operationId: 'signup',
        parameters: [{ in : 'body',
          name: 'body',
          description: '{' +
              '"mail": "",' +
              '"name": "",' +
              '"surname": "",' +
              '"telephone": "",' +
              '"disabled": false,' +
              '"homephone": "",' +
              '"adress1": "",' +
              '"adress2": "",' +
              '"borndate": "",' +
              '"creationDate": "",' +
              '"civilityId": 0,' +
              '"stateId": 0,' +
              '"cityLocationId": 0,' +
              '"supplierId": 0' +
            '}',
          required: true
        }],
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
