/*
 * @Author: Varandrew
 * @Date: 2020-02-29 11:39:05
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-19 10:32:45
 * @Description: file content
 */
import { WegetRequesetConfig } from '@/types/index'
import xhr from './adapters/xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function weget(config: WegetRequesetConfig): void {
  processConfig(config)
  xhr(config)
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

export default weget
