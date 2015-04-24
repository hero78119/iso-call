var execute = function (name, cfg) {
    var exec = isoconfig.getConfigs()[name];

    if (!name) {
        return Promise.reject(new Error('iso-request-server.execute without name!'));
    }

    if (!exec) {
        return Promise.reject(new Error('iso-request-server.execute but no config for the service: ' + name));
    }

    if ('function' !== typeof exec) {
        return Promise.reject(new Error('iso-request-server can not execute the service: ' + name));
    }

    try {
        return Promise.resolve(exec(cfg));
    } catch (E) {
        return Promise.reject(E);
    }
};

var middleware = function (req, res) {
    execute(req.params.name, req.body).then(function (R) {
        res.send(R);
    })['catch'](function (E) {
        console.warn(E.stack);
        res.status(500).send(('production' !== process.env.NODE_ENV) ? (E.stack || E) : {
            error: 'Internal Server Error',
            service: req.params.name,
            params: req.body
        });
    });
};

module.exports = {
    execute: execute,
    setupMiddleware: function (app) {
        app.put(require('./iso-config').getBaseURL() + ':name', require('body-parser').json(), middleware);
    }
};