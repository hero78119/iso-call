var isoreq = require('./iso-request-core');

/* eslint-disable no-underscore-dangle */
var requestConfigs;
var requestBaseUrl;

var _DEFAULT_ISO_REQUEST_RPC_ = '_DEFAULT_ISO_REQUEST_RPC_';
var _DEFAULT_BASEURL_ = '/_isoreq_/';

var defaultCfg = {
    _DEFAULT_ISO_REQUEST_RPC_: function (cfg) {
        var URL = requestConfigs[cfg.name];

        if (!URL) {
            return Promise.reject(new Error('call isocall.request() on api: "' + cfg.name + '" without URL!'));
        }

        return isoreq(Object.assign({url: URL}, cfg.cfg));
    }
};

var resetBaseURL = function () {
    requestBaseUrl = _DEFAULT_BASEURL_;
};

var resetConfigs = function (clean) {
    requestConfigs = clean ? {} : Object.assign({}, defaultCfg);
};

resetBaseURL();
resetConfigs();

module.exports = {
    _DEFAULT_ISO_REQUEST_RPC_: _DEFAULT_ISO_REQUEST_RPC_,

    resetConfigs: resetConfigs,
    resetBaseURL: resetBaseURL,

    addConfigs: function (cfgs) {
        Object.assign(requestConfigs, cfgs);
    },
    getConfigs: function () {
        return requestConfigs;
    },
    setBaseURL: function (url) {
        var exe = require('./iso-execute-server');
        if (exe.middlewareMounted && exe.middlewareMounted()) {
            console.warn('.setBaseURL() after .setupMiddleware() , this may cause client side call to wrong endpoint.');
        }
        requestBaseUrl = url;
    },
    getBaseURL: function () {
        return requestBaseUrl;
    }
};
