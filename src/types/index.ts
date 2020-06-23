/*
 * @Author: Varandrew
 * @Date: 2020-02-29 12:02:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-23 15:55:04
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

export interface WegetResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: WegetRequesetConfig
  request: any
}

export interface WegetPromise<T = any> extends Promise<WegetResponse<T>> {}

export interface WegetError extends Error {
  config: WegetRequesetConfig
  code?: string
  request?: any
  response?: WegetResponse
  isWegetError: boolean
}

export interface Weget {
  request<T = any>(config: WegetRequesetConfig): WegetPromise<T>

  get<T = any>(url: string, config?: WegetRequesetConfig): WegetPromise<T>

  delete<T = any>(url: string, config?: WegetRequesetConfig): WegetPromise<T>

  head<T = any>(url: string, config?: WegetRequesetConfig): WegetPromise<T>

  options<T = any>(url: string, config?: WegetRequesetConfig): WegetPromise<T>

  post<T = any>(url: string, data?: any, config?: WegetRequesetConfig): WegetPromise<T>

  put<T = any>(url: string, data?: any, config?: WegetRequesetConfig): WegetPromise<T>

  patch<T = any>(url: string, data?: any, config?: WegetRequesetConfig): WegetPromise<T>
}

export interface WegetInstance extends Weget {
  <T = any>(config: WegetRequesetConfig): WegetPromise<T>

  <T = any>(url: string, config?: WegetRequesetConfig): WegetPromise<T>
}
