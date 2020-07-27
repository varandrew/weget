/*
 * @Author: Varandrew
 * @Date: 2020-06-22 10:50:46
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-22 11:01:02
 * @Description: file content
 */

import { WegetRequestConfig, WegetResponse } from '@/types/index'

export class WegetError extends Error {
  isWegetError: boolean
  config: WegetRequestConfig
  code?: string | null
  request?: any
  response?: WegetResponse

  public constructor(
    message: string,
    config: WegetRequestConfig,
    code?: string | null,
    request?: any,
    response?: WegetResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isWegetError = true

    Object.setPrototypeOf(this, WegetError.prototype)
  }
}

export function createError(
  message: string,
  config: WegetRequestConfig,
  code?: string | null,
  request?: any,
  response?: WegetResponse
): WegetError {
  const error = new WegetError(message, config, code, request, response)

  return error
}
