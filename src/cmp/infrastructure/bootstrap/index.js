import GlobalStorageBootstrap from './GlobalStorageBootstrap'
import LocalStorageBootstrap from './LocalStorageBootstrap'

export default class Bootstrap {
  static init({config} = {}) {
    switch (config && config.gdpr && config.gdpr.storeConsentGlobally) {
      case true:
        return GlobalStorageBootstrap.init({
          config,
          window
        })
      case false:
        return LocalStorageBootstrap.init({
          config,
          window
        })
      default:
        return LocalStorageBootstrap.init({
          config,
          window
        })
    }
  }
}
