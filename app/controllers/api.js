'use strict';
var url = require('url');
module.exports = function(app, router, _, config, routes) {

  app.get(config.server.basePath + '/status', getStatus);
  app.get('/', listURI);
  app.get(config.server.basePath + '/config', getConfig);

	function getStatus(req, res) {
  	return res.status(200).json({status: 'ok'});
	}

  function listURI(req, res) {
    var specificPath = [config.server.basePath + '/status', config.server.basePath + '/config'];
    var paths = _.union(specificPath, calcPathByRouter(routes));

    res.json(paths.map(function (path) {
      return url.resolve(config.server.url, path);
    }));
  }

  function calcPathByRouter(router, prefix) {
    var stack = router.stack || router._router.stack || [];
    return _(stack).transform(function (endpoints, layer) {

      if (layer.handle.stack) {
        var subRoute = (prefix || '') + layer.regexp.toString().replace('/^\\', '').replace('\\/?(?=\\/|$)/i', '');
        var subEndpoints = calcPathByRouter(layer.handle, subRoute);
        endpoints.push(subEndpoints);
        return;
      }

      var route = layer.route || {};
      var path = (prefix || '') + (route.path || '');
      if (!path || path === '/' || !route.methods.get) { return; }
      endpoints.push(config.server.basePath + path);

    }, []).flatten().uniq().value();
  }

  function getConfig(req, res) {
    return res.json(require('../../config/routes'));
  }
};
