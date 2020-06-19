/*
 * @Author: Varandrew
 * @Date: 2020-05-29 11:46:52
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-18 16:29:37
 * @Description: file content
 */

const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
