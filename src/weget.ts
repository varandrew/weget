/*
 * @Author: Varandrew
 * @Date: 2020-06-22 13:20:56
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-07-24 17:06:07
 * @Description: file content
 */

import Weget from './core/Weget'
import defaults from './default'
import { extend } from './helpers/util'
import { WegetInstance, WegetRequestConfig } from './types'

function createInstance(config: WegetRequestConfig): WegetInstance {
  const context = new Weget(config)
  const instance = Weget.prototype.request.bind(context)

  extend(instance, context)

  return instance as WegetInstance
}

const weget = createInstance(defaults)

export default weget
