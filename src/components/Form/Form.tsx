import {defineComponent, getCurrentInstance, PropType, provide} from "vue";
import {AntFormRules, FormContext, FormItemContext, FormKey, validateFun} from "@/components/Form/types";
import './index.scss'
import { expore } from "../uses";
import {ValidateError} from "async-validator/dist-types/interface";
import FormItem from "@/components/Form/FormItem";

export default defineComponent({
  name: "AForm",
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object as PropType<AntFormRules>
  },
  emits: ['validate'],
  setup(props, {slots, emit}) {
    const formItems: FormItemContext[] = []
    const addItem = (item: FormItemContext) => {
      formItems.push(item)
    }
    const removeItem = (id: string) => {
      if(formItems.length) {
        const index = formItems.findIndex(item => item.id === id)
        if(index > -1) {
          formItems.splice(index, 1)
        }
      }
    }
    // 使用Partial给接口所有属性加可选属性
    provide<Partial<FormContext>>(FormKey, {
      model: props!.model,
      rules: props.rules,
      addItem,
      removeItem
    })
    const validate = (callback?: (valid: boolean) => void): Promise<boolean | ValidateError[]> => {
      // 过滤所有带有prop属性的formItem组件，调用组件的validate方法
      return Promise.all(
        formItems
          .filter(item => item.prop)
          .map(item => item.validate(props.model[item.prop]))
      ).then(res => {
        if(callback) {callback(true)}
        emit('validate', true)
        return Promise.resolve(true)
      }).catch(err => {
        if(callback) {callback(false)}
        emit('validate', err)
        return Promise.reject(err)
      })
    }
    const onsubmit = (e: Event) => {
      console.log('submit')
      e.preventDefault()
    }
    // 获取组件实例，组件实例上定义方法供调用
    expore<{validate: validateFun}>({validate})
    return () => {
      return (
        <form class="ant-form" onSubmit={ onsubmit }>
          {slots!.default!()}
        </form>
      )
    }
  }
})

