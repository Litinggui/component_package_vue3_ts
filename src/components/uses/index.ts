// 获取组件实例，组件实例上定义方法供调用
import {getCurrentInstance} from "vue";

function expore<T>(extra: T) {
  const instance = getCurrentInstance()
  if(instance) {
    Object.assign(instance.proxy, extra)
  }
}

export {expore}

