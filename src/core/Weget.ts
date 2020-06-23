/*
 * @Author: Varandrew
 * @Date: 2020-06-22 16:21:21
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-23 15:24:00
 * @Description: file content
 */

import { WegetRequesetConfig, WegetPromise } from '../types'
import dispatchRequest from './dispatchRequest'
import { Method } from '../constants'

export default class Weget {
  public request(payload: any, config?: any): WegetPromise {
    if (typeof payload === 'string') {
      if (!config) {
        config = {}
      }
      config.url = payload
    } else {
      config = payload
    }
    return dispatchRequest(config)
  }

  public get(url: string, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  public delete(url: string, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  public head(url: string, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  public options(url: string, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  public post(url: string, data?: any, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  public put(url: string, data?: any, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  public patch(url: string, data?: any, config?: WegetRequesetConfig): WegetPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  private _requestMethodWithoutData(method: Method, url: string, config?: WegetRequesetConfig) {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: WegetRequesetConfig
  ) {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
