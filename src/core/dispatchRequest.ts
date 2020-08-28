/*
 * @Author: Varandrew
 * @Date: 2020-06-22 13:20:56
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-08-28 15:35:24
 * @Description: file content
 */

import xhr from '../adapters/xhr'
import transform from './transform'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { transformRequest, parseResponse } from '../helpers/data'
import { WegetRequestConfig, WegetPromise, WegetResponse } from '@/types/index'

export default function dispatchRequest(config: WegetRequestConfig): WegetPromise {
  processConfig(config)

  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: WegetRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest!)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: WegetRequestConfig): string {
  const { url, params } = config

  return buildUrl(url!, params)
}

function transformResponseData(response: WegetResponse): WegetResponse {
  response.data = transform(response.data, response.headers, response.config.transformResponse!)

  return response
}

function throwIfCancellationRequested(config: WegetRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
