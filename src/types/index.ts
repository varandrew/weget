/*
 * @Author: Varandrew
 * @Date: 2020-02-29 12:02:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-22 10:49:55
 * @Description: file content
 */

import { Method } from '@/constants/index'

export interface WegetRequesetConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface WegetResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: WegetRequesetConfig
  request: any
}

export interface WegetPromise extends Promise<WegetResponse> {}

export interface WegetError extends Error {
  config: WegetRequesetConfig
  code?: string
  request?: any
  response?: WegetResponse
  isWegetError: boolean
}
