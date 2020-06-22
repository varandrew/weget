/*
 * @Author: Varandrew
 * @Date: 2020-06-22 13:20:56
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-22 13:36:50
 * @Description: file content
 */

import { WegetRequesetConfig, WegetPromise, WegetResponse } from '@/types/index'
import xhr from './adapters/xhr'
import { buildUrl } from './helpers/url'
import { transformRequest, parseResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function weget(config: WegetRequesetConfig): WegetPromise {
  processConfig(config)

  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: WegetRequesetConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: WegetRequesetConfig): string {
  const { url, params } = config

  return buildUrl(url, params)
}

function transformRequestData(config: WegetRequesetConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: WegetRequesetConfig): any {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

function transformResponseData(response: WegetResponse): WegetResponse {
  response.data = parseResponse(response)
  return response
}

export default weget
