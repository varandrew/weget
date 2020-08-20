/*
 * @Author: Varandrew
 * @Date: 2020-02-29 12:02:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-07-30 17:42:00
 * @Description: file content
 */

import { Method } from '@/constants/index'

export interface WegetRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: WegetTransformer | WegetTransformer[]
  transformResponse?: WegetTransformer | WegetTransformer[]

  [propName: string]: any
}

export interface WegetResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: WegetRequestConfig
  request: any
}

export interface WegetPromise<T = any> extends Promise<WegetResponse<T>> {}

export interface WegetError extends Error {
  config: WegetRequestConfig
  code?: string
  request?: any
  response?: WegetResponse
  isWegetError: boolean
}

export interface Weget {
  defaults: WegetRequestConfig
  interceptors: {
    request: WegetInterceptorManager<WegetRequestConfig>
    response: WegetInterceptorManager<WegetResponse>
  }

  request<T = any>(config: WegetRequestConfig): WegetPromise<T>

  get<T = any>(url: string, config?: WegetRequestConfig): WegetPromise<T>

  delete<T = any>(url: string, config?: WegetRequestConfig): WegetPromise<T>

  head<T = any>(url: string, config?: WegetRequestConfig): WegetPromise<T>

  options<T = any>(url: string, config?: WegetRequestConfig): WegetPromise<T>

  post<T = any>(url: string, data?: any, config?: WegetRequestConfig): WegetPromise<T>

  put<T = any>(url: string, data?: any, config?: WegetRequestConfig): WegetPromise<T>

  patch<T = any>(url: string, data?: any, config?: WegetRequestConfig): WegetPromise<T>
}

export interface WegetInstance extends Weget {
  interceptors: any
  <T = any>(config: WegetRequestConfig): WegetPromise<T>

  <T = any>(url: string, config?: WegetRequestConfig): WegetPromise<T>
}

export interface WegetStatic extends WegetInstance {
  create(config?: WegetRequestConfig): WegetInstance
}

export interface WegetInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface WegetTransformer {
  (data: any, headers?: any): any
}
