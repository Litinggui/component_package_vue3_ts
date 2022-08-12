/*
  统一暴露自定义组件，全局引入
*/

import Input from "./Input";
import Form from './Form'
import FormItem from "./FormItem";
import Tabs from "./Tabs"
import TabPane from "./TabPane"
import Tree from './Tree'
import Table from './Table'
import {App} from 'vue'

const components = [
  Input,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tree,
  Table
]

export {
  Input,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tree,
  Table
}

export default function (app: App) {
  components.forEach(item => app.component(item.name, item))
}
