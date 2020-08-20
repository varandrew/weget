/*
 * @Author: Varandrew
 * @Date: 2020-06-22 13:20:56
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-07-30 17:44:34
 * @Description: file content
 */

import Weget from './core/Weget'
import defaults from './default'
import { extend } from './helpers/util'
import { WegetInstance, WegetRequestConfig, WegetStatic } from './types'
import mergeConfig from 'core/mergeConfig'

function createInstance(config: WegetRequestConfig): WegetStatic {
  const context = new Weget(config)
  const instance = Weget.prototype.request.bind(context)

  extend(instance, context)

  return instance as WegetStatic
}

const weget = createInstance(defaults)

weget.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default weget
