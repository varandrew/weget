/*
 * @Author: Varandrew
 * @Date: 2020-02-29 12:02:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-08-28 11:08:18
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
  cancelToken?: CancelToken

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

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancelled: (val: any) => boolean
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

// CancelToken 是实例类型的接口定义
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

// CancelToken 类静态方法
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// CancelToken 类的类类型
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

// Canceler 是取消方法的接口定义
export interface Canceler {
  (message?: string): void
}

// CancelExecutor 是 CancelToken 类构造函数参数的接口定义
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message: string): Cancel
}
