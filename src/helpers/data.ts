/*
 * @Author: Varandrew
 * @Date: 2020-06-18 16:34:09
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-19 11:33:22
 * @Description: file content
 */

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  return isPlainObject(data) ? JSON.stringify(data) : data
}

export function parseResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do noting
    }
  }

  return data
}
