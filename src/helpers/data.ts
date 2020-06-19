/*
 * @Author: Varandrew
 * @Date: 2020-06-18 16:34:09
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-18 16:35:53
 * @Description: file content
 */

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  return isPlainObject(data) ? JSON.stringify(data) : data
}
