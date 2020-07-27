/*
 * @Author: Varandrew
 * @Date: 2020-06-22 16:21:21
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-29 17:29:25
 * @Description: file content
 */

import { WegetRequestConfig, WegetPromise, WegetResponse, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import { Method } from '../constants'
import InterceptorManager from './interceptorManger'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<WegetRequestConfig>
  response: InterceptorManager<WegetResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: WegetRequestConfig) => WegetPromise)
  rejected?: RejectedFn
}

export default class Weget {
  defaults: WegetRequestConfig
  interceptors: Interceptors

  public constructor(initConfig: WegetRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<WegetRequestConfig>(),
      response: new InterceptorManager<WegetResponse>()
    }
  }

  public request(payload: any, config?: any): WegetPromise {
    if (typeof payload === 'string') {
      if (!config) {
        config = {}
      }
      config.url = payload
    } else {
      config = payload
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!

      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  public get(url: string, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  public delete(url: string, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  public head(url: string, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  public options(url: string, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  public post(url: string, data?: any, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  public put(url: string, data?: any, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  public patch(url: string, data?: any, config?: WegetRequestConfig): WegetPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  private _requestMethodWithoutData(method: Method, url: string, config?: WegetRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: WegetRequestConfig
  ) {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
