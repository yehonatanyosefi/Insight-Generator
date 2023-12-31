import {
  __commonJS
} from "./chunk-RSJERJUL.js";

// node_modules/monday-sdk-js/src/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/monday-sdk-js/src/helpers/index.js"(exports, module) {
    var convertToArrayIfNeeded = (x) => {
      return Array.isArray(x) ? x : [x];
    };
    var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
    module.exports = {
      convertToArrayIfNeeded,
      isBrowser
    };
  }
});

// node_modules/monday-sdk-js/src/constants.js
var require_constants = __commonJS({
  "node_modules/monday-sdk-js/src/constants.js"(exports, module) {
    var { isBrowser } = require_helpers();
    var isNodeDevEnv = !isBrowser && true;
    var MONDAY_PROTOCOL = isNodeDevEnv && process.env.MONDAY_COM_PROTOCOL || "https";
    var MONDAY_DOMAIN = isNodeDevEnv && process.env.MONDAY_COM_DOMAIN || "monday.com";
    var MONDAY_API_URL = `${MONDAY_PROTOCOL}://api.${MONDAY_DOMAIN}/v2`;
    var MONDAY_OAUTH_URL = `${MONDAY_PROTOCOL}://auth.${MONDAY_DOMAIN}/oauth2/authorize`;
    var MONDAY_OAUTH_TOKEN_URL = `${MONDAY_PROTOCOL}://auth.${MONDAY_DOMAIN}/oauth2/token`;
    module.exports = {
      MONDAY_DOMAIN,
      MONDAY_PROTOCOL,
      MONDAY_API_URL,
      MONDAY_OAUTH_URL,
      MONDAY_OAUTH_TOKEN_URL
    };
  }
});

// node_modules/node-fetch/browser.js
var require_browser = __commonJS({
  "node_modules/node-fetch/browser.js"(exports, module) {
    "use strict";
    var getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    };
    var globalObject = getGlobal();
    module.exports = exports = globalObject.fetch;
    if (globalObject.fetch) {
      exports.default = globalObject.fetch.bind(globalObject);
    }
    exports.Headers = globalObject.Headers;
    exports.Request = globalObject.Request;
    exports.Response = globalObject.Response;
  }
});

// node_modules/monday-sdk-js/src/monday-api-client/fetch.js
var require_fetch = __commonJS({
  "node_modules/monday-sdk-js/src/monday-api-client/fetch.js"(exports, module) {
    var fetch = require_browser();
    function nodeFetch(url, options = {}) {
      return fetch(url, options);
    }
    module.exports = {
      nodeFetch
    };
  }
});

// node_modules/monday-sdk-js/src/monday-api-client/monday-api-client.js
var require_monday_api_client = __commonJS({
  "node_modules/monday-sdk-js/src/monday-api-client/monday-api-client.js"(exports, module) {
    var { MONDAY_API_URL, MONDAY_OAUTH_TOKEN_URL } = require_constants();
    var fetch = require_fetch();
    var COULD_NOT_PARSE_JSON_RESPONSE_ERROR = "Could not parse JSON from monday.com's GraphQL API response";
    var TOKEN_IS_REQUIRED_ERROR = "Token is required";
    var API_TIMEOUT_ERROR = "Received timeout from monday.com's GraphQL API";
    function apiRequest(url, data, token, options = {}) {
      return fetch.nodeFetch(url, {
        method: options.method || "POST",
        body: JSON.stringify(data || {}),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          ...options.apiVersion ? { "API-Version": options.apiVersion } : {}
        }
      });
    }
    async function execute(data, token, options = {}) {
      if (!token && options.url !== MONDAY_OAUTH_TOKEN_URL)
        throw new Error(TOKEN_IS_REQUIRED_ERROR);
      const url = options.url || MONDAY_API_URL;
      const path = options.path || "";
      const fullUrl = `${url}${path}`;
      let response = await apiRequest(fullUrl, data, token, options);
      const responseStatusCode = response.status;
      const responseContentType = response.headers.get("content-type");
      if (!responseContentType || !responseContentType.includes("application/json")) {
        if (responseStatusCode === 504) {
          throw new Error(API_TIMEOUT_ERROR);
        }
        const responseText = await response.text();
        throw new Error(responseText);
      }
      try {
        return await response.json();
      } catch (err) {
        throw new Error(COULD_NOT_PARSE_JSON_RESPONSE_ERROR);
      }
    }
    module.exports = { execute, COULD_NOT_PARSE_JSON_RESPONSE_ERROR, TOKEN_IS_REQUIRED_ERROR, API_TIMEOUT_ERROR };
  }
});

// node_modules/monday-sdk-js/src/monday-api-client/index.js
var require_monday_api_client2 = __commonJS({
  "node_modules/monday-sdk-js/src/monday-api-client/index.js"(exports, module) {
    module.exports = require_monday_api_client();
  }
});

// node_modules/monday-sdk-js/src/helpers/ui-helpers.js
var require_ui_helpers = __commonJS({
  "node_modules/monday-sdk-js/src/helpers/ui-helpers.js"(exports, module) {
    var scrollHelperInitialized = false;
    function initScrollHelperIfNeeded() {
      if (scrollHelperInitialized)
        return;
      scrollHelperInitialized = true;
      const css = 'body::before { content: ""; position: fixed; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; z-index: 2147483647; /* mondaySdk css - can be disabled with: mondaySdk({withoutScrollHelper: true }) */ }';
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      const head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(style);
    }
    module.exports = {
      initScrollHelperIfNeeded
    };
  }
});

// node_modules/monday-sdk-js/src/services/background-tracking-service.js
var require_background_tracking_service = __commonJS({
  "node_modules/monday-sdk-js/src/services/background-tracking-service.js"(exports, module) {
    var _5_MINUTES_MS = 5 * 60 * 1e3;
    var initialized = false;
    var initBackgroundTracking = (sdk) => {
      if (initialized)
        return;
      initialized = true;
      const ping = () => {
        sdk.track("ping");
      };
      ping();
      setInterval(ping, _5_MINUTES_MS);
    };
    module.exports = {
      initBackgroundTracking
    };
  }
});

// node_modules/monday-sdk-js/package.json
var require_package = __commonJS({
  "node_modules/monday-sdk-js/package.json"(exports, module) {
    module.exports = {
      name: "monday-sdk-js",
      version: "0.3.4",
      private: false,
      repository: "https://github.com/mondaycom/monday-sdk-js",
      main: "src/index.js",
      types: "types/index.d.ts",
      author: "talharamati <tal@monday.com>",
      license: "MIT",
      files: [
        "LICENSE",
        "README.md",
        "dist/",
        "src/",
        "types/",
        "server-sdk.js"
      ],
      dependencies: {
        "node-fetch": "^2.6.0"
      },
      devDependencies: {
        "@babel/cli": "^7.6.0",
        "@babel/core": "^7.6.0",
        "@babel/node": "^7.6.1",
        "@babel/preset-env": "^7.6.0",
        "@babel/preset-react": "^7.0.0",
        "@babel/register": "^7.6.0",
        "babel-loader": "^8.0.6",
        chai: "^4.2.0",
        eslint: "^6.8.0",
        jsdom: "^16.2.0",
        mocha: "^7.1.0",
        prettier: "^1.19.1",
        sinon: "^9.0.0",
        "sinon-chai": "^3.5.0",
        webpack: "^4.38.0",
        "webpack-cli": "^3.3.6",
        "webpack-dev-server": "^3.7.2",
        "@types/source-map": "^0.5.2",
        typescript: "^4.9.5"
      },
      scripts: {
        start: "webpack-dev-server",
        build: "webpack --mode=production --env.WEBPACK_BUILD=true",
        test: "mocha './src/**/*-test.js'",
        "test:watch": "mocha './src/**/*-test.js' --watch",
        precommit: "yarn lint && yarn style-check",
        lint: "eslint './src/**/*.*'",
        "style-check": "prettier --check './src/**/*.js'",
        "compile-types": "tsc --noEmit"
      }
    };
  }
});

// node_modules/monday-sdk-js/src/client.js
var require_client = __commonJS({
  "node_modules/monday-sdk-js/src/client.js"(exports, module) {
    var mondayApiClient = require_monday_api_client2();
    var { MONDAY_OAUTH_URL } = require_constants();
    var { convertToArrayIfNeeded } = require_helpers();
    var { initScrollHelperIfNeeded } = require_ui_helpers();
    var { initBackgroundTracking } = require_background_tracking_service();
    var EMPTY_ARRAY = [];
    var MondayClientSdk = class {
      constructor(options = {}) {
        this._clientId = options.clientId;
        this._apiToken = options.apiToken;
        this._apiVersion = options.apiVersion;
        this.listeners = {};
        this.setClientId = this.setClientId.bind(this);
        this.setToken = this.setToken.bind(this);
        this.setApiVersion = this.setApiVersion.bind(this);
        this.api = this.api.bind(this);
        this.listen = this.listen.bind(this);
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.execute = this.execute.bind(this);
        this.oauth = this.oauth.bind(this);
        this._receiveMessage = this._receiveMessage.bind(this);
        this.storage = {
          instance: {
            setItem: this.setStorageInstanceItem.bind(this),
            getItem: this.getStorageInstanceItem.bind(this),
            deleteItem: this.deleteStorageInstanceItem.bind(this)
          }
        };
        window.addEventListener("message", this._receiveMessage, false);
        if (!options.withoutScrollHelper)
          initScrollHelperIfNeeded();
        initBackgroundTracking(this);
      }
      setClientId(clientId) {
        this._clientId = clientId;
      }
      setToken(token) {
        this._apiToken = token;
      }
      setApiVersion(apiVersion) {
        this._apiVersion = apiVersion;
      }
      api(query, options = {}) {
        const params = { query, variables: options.variables };
        const token = options.token || this._apiToken;
        const apiVersion = options.apiVersion || this._apiVersion;
        if (token) {
          return mondayApiClient.execute(params, token, { apiVersion });
        } else {
          return new Promise((resolve, reject) => {
            this._localApi("api", { params }).then((result) => {
              resolve(result.data);
            }).catch((err) => reject(err));
          });
        }
      }
      listen(typeOrTypes, callback, params) {
        const types = convertToArrayIfNeeded(typeOrTypes);
        const unsubscribes = [];
        types.forEach((type) => {
          unsubscribes.push(this._addListener(type, callback));
          this._localApi("listen", { type, params });
        });
        return () => {
          unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
      }
      get(type, params) {
        return this._localApi("get", { type, params });
      }
      set(type, params) {
        return this._localApi("set", { type, params });
      }
      execute(type, params) {
        return this._localApi("execute", { type, params });
      }
      track(name, data) {
        return this.execute("track", { name, data });
      }
      oauth(options = {}) {
        const clientId = options.clientId || this._clientId;
        if (!clientId)
          throw new Error("clientId is required");
        const mondayOauthUrl = options.mondayOauthUrl || MONDAY_OAUTH_URL;
        const url = `${mondayOauthUrl}?client_id=${clientId}`;
        window.location = url;
      }
      setStorageInstanceItem(key, value, options = {}) {
        return this._localApi("storage", { method: "set", key, value, options, segment: "instance" });
      }
      getStorageInstanceItem(key, options = {}) {
        return this._localApi("storage", { method: "get", key, options, segment: "instance" });
      }
      deleteStorageInstanceItem(key, options = {}) {
        return this._localApi("storage", { method: "delete", key, options, segment: "instance" });
      }
      _localApi(method, args) {
        return new Promise((resolve, reject) => {
          const requestId = this._generateRequestId();
          const clientId = this._clientId;
          const pjson = require_package();
          const version = pjson.version;
          window.parent.postMessage({ method, args, requestId, clientId, version }, "*");
          const removeListener = this._addListener(requestId, (data) => {
            removeListener();
            if (data.errorMessage) {
              const error = new Error(data.errorMessage);
              error.data = data.data;
              reject(error);
            } else {
              resolve(data);
            }
          });
        });
      }
      _receiveMessage(event) {
        const { method, type, requestId } = event.data;
        const methodListeners = this.listeners[method] || EMPTY_ARRAY;
        const typeListeners = this.listeners[type] || EMPTY_ARRAY;
        const requestIdListeners = this.listeners[requestId] || EMPTY_ARRAY;
        let listeners = /* @__PURE__ */ new Set([...methodListeners, ...typeListeners, ...requestIdListeners]);
        if (listeners) {
          listeners.forEach((listener) => {
            try {
              listener(event.data);
            } catch (err) {
              console.error("Message callback error: ", err);
            }
          });
        }
      }
      _addListener(key, callback) {
        this.listeners[key] = this.listeners[key] || /* @__PURE__ */ new Set();
        this.listeners[key].add(callback);
        return () => {
          this.listeners[key].delete(callback);
          if (this.listeners[key].size === 0) {
            delete this.listeners[key];
          }
        };
      }
      _generateRequestId() {
        return Math.random().toString(36).substring(2, 9);
      }
      _removeEventListener() {
        window.removeEventListener("message", this._receiveMessage, false);
      }
      _clearListeners() {
        this.listeners = [];
      }
    };
    function init(options = {}) {
      return new MondayClientSdk(options);
    }
    module.exports = init;
  }
});

// node_modules/monday-sdk-js/src/services/oauth-service.js
var require_oauth_service = __commonJS({
  "node_modules/monday-sdk-js/src/services/oauth-service.js"(exports, module) {
    var { execute } = require_monday_api_client2();
    var { MONDAY_OAUTH_TOKEN_URL } = require_constants();
    var oauthToken = (code, clientId, clientSecret) => {
      const data = { code, client_id: clientId, client_secret: clientSecret };
      return execute(data, null, { url: MONDAY_OAUTH_TOKEN_URL });
    };
    module.exports = {
      oauthToken
    };
  }
});

// node_modules/monday-sdk-js/src/server.js
var require_server = __commonJS({
  "node_modules/monday-sdk-js/src/server.js"(exports, module) {
    var mondayApiClient = require_monday_api_client2();
    var { oauthToken } = require_oauth_service();
    var TOKEN_MISSING_ERROR = "Should send 'token' as an option or call mondaySdk.setToken(TOKEN)";
    var MondayServerSdk = class {
      constructor(options = {}) {
        this._token = options.token;
        this._apiVersion = options.apiVersion;
        this.setToken = this.setToken.bind(this);
        this.setApiVersion = this.setApiVersion.bind(this);
        this.api = this.api.bind(this);
      }
      setToken(token) {
        this._token = token;
      }
      setApiVersion(apiVersion) {
        this._apiVersion = apiVersion;
      }
      async api(query, options = {}) {
        const params = { query, variables: options.variables };
        const token = options.token || this._token;
        const apiVersion = options.apiVersion || this._apiVersion;
        if (!token)
          throw new Error(TOKEN_MISSING_ERROR);
        return await mondayApiClient.execute(params, token, { apiVersion });
      }
      oauthToken(code, clientId, clientSecret) {
        return oauthToken(code, clientId, clientSecret);
      }
    };
    function init(options = {}) {
      return new MondayServerSdk(options);
    }
    module.exports = init;
  }
});

// node_modules/monday-sdk-js/src/index.js
var require_src = __commonJS({
  "node_modules/monday-sdk-js/src/index.js"(exports, module) {
    var { isBrowser } = require_helpers();
    var init = isBrowser ? require_client() : require_server();
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      } else if (root) {
        root = factory();
      }
    })(typeof self !== "undefined" ? self : exports, function() {
      if (typeof __BUNDLE__ !== "undefined" && __BUNDLE__) {
        window.mondaySdk = init;
      }
      return init;
    });
  }
});
export default require_src();
//# sourceMappingURL=monday-sdk-js.js.map
