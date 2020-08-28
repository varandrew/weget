/*
 * @Author: Varandrew
 * @Date: 2020-06-22 13:20:56
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-08-28 15:49:42
 * @Description: file content
 */

import Weget from './core/Weget'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import { extend } from './helpers/util'
import { WegetInstance, WegetRequestConfig, WegetStatic } from './types'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancelled } from './cancel/Cancel'

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

weget.CancelToken = CancelToken
weget.Cancel = Cancel
weget.isCancelled = isCancelled

export default weget
