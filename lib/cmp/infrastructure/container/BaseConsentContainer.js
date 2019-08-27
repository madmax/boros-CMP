"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DomainEventBus = _interopRequireDefault(require("../../domain/event_bus/DomainEventBus"));

var _GetConsentDataUseCase = _interopRequireDefault(require("../../application/services/consent/GetConsentDataUseCase"));

var _ChainedVendorListRepository = _interopRequireDefault(require("../repository/ChainedVendorListRepository"));

var _InMemoryVendorListRepository = _interopRequireDefault(require("../repository/InMemoryVendorListRepository"));

var _HttpVendorListRepository = _interopRequireDefault(require("../repository/HttpVendorListRepository"));

var _ConsentStringVendorConsentsRepository = _interopRequireDefault(require("../repository/ConsentStringVendorConsentsRepository"));

var _GetConsentStatusUseCase = _interopRequireDefault(require("../../application/services/consent/GetConsentStatusUseCase"));

var _GetVendorConsentsUseCase = _interopRequireDefault(require("../../application/services/vendor_consents/GetVendorConsentsUseCase"));

var _GetVendorListUseCase = _interopRequireDefault(require("../../application/services/vendor_list/GetVendorListUseCase"));

var _PingUseCase = _interopRequireDefault(require("../../application/services/ping/PingUseCase"));

var _SetVendorConsentsUseCase = _interopRequireDefault(require("../../application/services/vendor_consents/SetVendorConsentsUseCase"));

var _Configuration = _interopRequireDefault(require("../configuration/Configuration"));

var _errorObserverFactory = require("../observer/errorObserverFactory");

var _NewVendorsStatusService = require("../../domain/vendor_consents/NewVendorsStatusService");

var _UpdateConsentVendorsService = _interopRequireDefault(require("../../domain/consent/UpdateConsentVendorsService"));

var _globalVendorListVersionChanged = require("../../domain/consent/globalVendorListVersionChanged");

var _ConsentFactory = _interopRequireDefault(require("../../domain/consent/ConsentFactory"));

var _VendorConsentsFactory = _interopRequireDefault(require("../../domain/vendor_consents/VendorConsentsFactory"));

var _Log = require("../service/log/Log");

var _globalVendorListVersionChangedObserverFactory = require("../observer/globalVendorListVersionChangedObserverFactory");

var _HttpTranslationVendorListRepository = _interopRequireDefault(require("../repository/HttpTranslationVendorListRepository"));

var _fetcher = require("../service/fetcher");

var BaseConsentContainer =
/*#__PURE__*/
function () {
  function BaseConsentContainer(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        config = _ref.config,
        cmpVersion = _ref.cmpVersion,
        window = _ref.window,
        _ref$eager = _ref.eager,
        eager = _ref$eager === void 0 ? true : _ref$eager;

    this._config = new _Configuration.default({
      gdpr: config.gdpr,
      consent: config.consent,
      vendorList: config.vendorList,
      log: config.log,
      cmpVersion: cmpVersion
    });
    this._window = window;
    this._instances = new Map();

    if (eager) {
      this._buildEagerSingletonInstances();
    }
  }

  var _proto = BaseConsentContainer.prototype;

  _proto.getInstance = function getInstance(_ref2) {
    var key = _ref2.key;

    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]());
      } catch (e) {
        throw new Error("Error creating instance: " + key + ", detailed message:" + e.message);
      }
    }

    return this._instances.get(key);
  };

  _proto._buildConsentFactory = function _buildConsentFactory() {
    return new _ConsentFactory.default({
      allowedVendorIds: this._config.consent.allowedVendorIds,
      vendorListRepository: this.getInstance({
        key: 'VendorListRepository'
      })
    });
  };

  _proto._buildVendorListRepository = function _buildVendorListRepository() {
    return new _ChainedVendorListRepository.default({
      inMemoryVendorListRepository: this.getInstance({
        key: 'InMemoryVendorListRepository'
      }),
      httpVendorListRepository: this.getInstance({
        key: 'HttpTranslationVendorListRepository'
      })
    });
  };

  _proto._buildInMemoryVendorListRepository = function _buildInMemoryVendorListRepository() {
    return new _InMemoryVendorListRepository.default();
  };

  _proto._buildHttpVendorListRepository = function _buildHttpVendorListRepository() {
    return new _HttpVendorListRepository.default({
      fetcher: this.getInstance({
        key: 'Fetcher'
      }),
      vendorListHost: this._config.vendorList.host,
      vendorListFilename: this._config.vendorList.filename
    });
  };

  _proto._buildHttpTranslationVendorListRepository = function _buildHttpTranslationVendorListRepository() {
    return new _HttpTranslationVendorListRepository.default({
      fetcher: this.getInstance({
        key: 'Fetcher'
      }),
      consentLanguage: this._config.consent.consentLanguage,
      vendorListRepository: this.getInstance({
        key: 'HttpVendorListRepository'
      })
    });
  };

  _proto._buildFetcher = function _buildFetcher() {
    return (0, _fetcher.fetcherFactory)();
  };

  _proto._buildLog = function _buildLog() {
    return new _Log.Log({
      level: this._config.log.level,
      console: console
    });
  };

  _proto._buildVendorConsentsFactory = function _buildVendorConsentsFactory() {
    return new _VendorConsentsFactory.default({
      gdprApplies: this._config.gdpr.gdprApplies,
      storeConsentGlobally: this._config.gdpr.storeConsentGlobally
    });
  };

  _proto._buildVendorConsentsRepository = function _buildVendorConsentsRepository() {
    return new _ConsentStringVendorConsentsRepository.default({
      cmpId: this._config.consent.cmpId,
      cmpVersion: this._config.consent.cmpVersion,
      consentScreen: this._config.consent.consentScreen,
      consentLanguage: this._config.consent.consentLanguage,
      vendorListRepository: this.getInstance({
        key: 'VendorListRepository'
      }),
      consentRepository: this.getInstance({
        key: 'ConsentRepository'
      }),
      vendorConsentsFactory: this.getInstance({
        key: 'VendorConsentsFactory'
      })
    });
  };

  _proto._buildGetConsentDataUseCase = function _buildGetConsentDataUseCase() {
    return new _GetConsentDataUseCase.default({
      consentRepository: this.getInstance({
        key: 'ConsentRepository'
      }),
      storeConsentGlobally: this._config.gdpr.storeConsentGlobally,
      gdprApplies: this._config.gdpr.gdprApplies
    });
  };

  _proto._buildGetConsentStatusUseCase = function _buildGetConsentStatusUseCase() {
    return new _GetConsentStatusUseCase.default({
      consentRepository: this.getInstance({
        key: 'ConsentRepository'
      })
    });
  };

  _proto._buildGetVendorConsentsUseCase = function _buildGetVendorConsentsUseCase() {
    return new _GetVendorConsentsUseCase.default({
      vendorConsentsRepository: this.getInstance({
        key: 'VendorConsentsRepository'
      })
    });
  };

  _proto._buildGetVendorListUseCase = function _buildGetVendorListUseCase() {
    return new _GetVendorListUseCase.default({
      vendorListRepository: this.getInstance({
        key: 'VendorListRepository'
      })
    });
  };

  _proto._buildPingUseCase = function _buildPingUseCase() {
    return new _PingUseCase.default();
  };

  _proto._buildSetVendorConsentsUseCase = function _buildSetVendorConsentsUseCase() {
    return new _SetVendorConsentsUseCase.default({
      vendorConsentsRepository: this.getInstance({
        key: 'VendorConsentsRepository'
      })
    });
  };

  _proto._buildErrorObserverFactory = function _buildErrorObserverFactory() {
    var logger = this.getInstance({
      key: 'Log'
    });
    return (0, _errorObserverFactory.errorObserverFactory)(logger);
  };

  _proto._buildUpdateConsentVendorsService = function _buildUpdateConsentVendorsService() {
    return new _UpdateConsentVendorsService.default({
      newVendorsStatusService: this.getInstance({
        key: 'NewVendorsStatusService'
      }),
      vendorConsentsRepository: this.getInstance({
        key: 'VendorConsentsRepository'
      })
    });
  };

  _proto._buildNewVendorsStatusService = function _buildNewVendorsStatusService() {
    return new _NewVendorsStatusService.NewVendorsStatusService({
      option: this._config.consent.newVendorsStatusOption
    });
  };

  _proto._buildGlobalVendorListVersionChangedObserver = function _buildGlobalVendorListVersionChangedObserver() {
    return (0, _globalVendorListVersionChangedObserverFactory.globalVendorListVersionChangedObserverFactory)({
      updateConsentVendorsService: this.getInstance({
        key: 'UpdateConsentVendorsService'
      })
    });
  };

  _proto._buildEagerSingletonInstances = function _buildEagerSingletonInstances() {
    _DomainEventBus.default.register({
      eventName: _globalVendorListVersionChanged.GLOBAL_VENDOR_LIST_VERSION_CHANGED,
      observer: this.getInstance({
        key: 'GlobalVendorListVersionChangedObserver'
      })
    });
  };

  return BaseConsentContainer;
}();

exports.default = BaseConsentContainer;