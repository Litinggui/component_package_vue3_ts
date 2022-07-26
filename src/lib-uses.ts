/*
  统一暴露自定义组件，全局引入
*/

import Input from "./components/Input";
import Form from './components/Form/Form'
import FormItem from "./components/Form/FormItem";
import Tabs from "./components/Tabs"
import TabPane from "./components/Tabs/TabPane"
import Tree from './components/Tree'
import {App} from 'vue'

const components = [
  Input,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tree
]

export default function (app: App) {
  components.forEach(item => app.component(item.name, item))
}
