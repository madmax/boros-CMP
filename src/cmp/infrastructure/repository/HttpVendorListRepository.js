/* eslint-disable no-undef */
import 'whatwg-fetch'
import GlobalVendorListAccessError from '../../domain/GlobalVendorListAccessError'
import {
  latestVendorListLocator,
  versionVendorListLocator
} from '../../domain/iabVendorListLocator'

/**
 * @class
 * @implements VendorListRepository
 */
export default class HttpVendorListRepository {
  constructor({
    latestLocator = latestVendorListLocator,
    versionLocator = versionVendorListLocator
  } = {}) {
    this._loadLatestVendorList = loadLatestVendorList({latestLocator})
    this._loadVendorListVersion = loadVendorListVersion({versionLocator})
  }

  getGlobalVendorList({vendorListVersion} = {}) {
    return Promise.resolve()
      .then(
        () =>
          (vendorListVersion &&
            this._loadVendorListVersion({vendorListVersion})) ||
          this._loadLatestVendorList()
      )
      .then(filterOkFetchResponse)
      .then(fetchResponse => fetchResponse.json())
  }
}

const loadLatestVendorList = ({latestLocator}) => () => fetch(latestLocator())

const loadVendorListVersion = ({versionLocator}) => ({vendorListVersion}) =>
  fetch(versionLocator({vendorListVersion}))

const filterOkFetchResponse = fetchResponse => {
  if (!fetchResponse.ok) {
    throw new GlobalVendorListAccessError(
      'Invalid response fetching the global vendor list'
    )
  }
  return fetchResponse
}
