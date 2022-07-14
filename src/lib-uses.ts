/*
  统一暴露自定义组件，全局引入
*/

import Input from "./components/Input";
import FormItem from "./components/Form/FormItem";
import {App} from 'vue'

const components = [
  Input,
  FormItem
]

export default function (app: App) {
  components.forEach(item => app.component(item.name, item))
}