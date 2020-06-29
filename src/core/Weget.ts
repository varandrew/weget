/*
 * @Author: Varandrew
 * @Date: 2020-06-22 16:21:21
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-29 13:38:06
 * @Description: file content
 */

import { WegetRequesetConfig, WegetPromise, WegetResponse, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import { Method } from '../constants'
import InterceptorManager from './interceptorManger'

interface Interceptors {
  request: InterceptorManager<WegetRequesetConfig>
  response: InterceptorManager<WegetResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: WegetRequesetConfig) => WegetPromise)
  rejected?: RejectedFn
}

export default class Weget {
  interceptors: Interceptors

  public constructor() {
    this.interceptors = {
      request: new InterceptorManager<WegetRequesetConfig>(),
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
