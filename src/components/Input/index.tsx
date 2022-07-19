import { defineComponent, inject } from "vue";
import './index.scss'
import {FormItemContext, FormItemKey} from "@/components/Form/types";

export default defineComponent({
  name: "AInput",
  inheritAttrs: false, // 设置父节点不继承属性
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      validator:(value: string) => {
        // 这个值必须匹配下列字符串中的一个
        return ['text', 'password', 'number', 'tel', 'textarea', 'time'].indexOf(value) !== -1
      },
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit, attrs}) {
    // 接收FormItem注入
    const formItemCtx = inject(FormItemKey) as FormItemContext;
    const oninput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      if(value !== props.modelValue) {
        emit('update:modelValue', value)
        formItemCtx.handlerValueChange(value)
      }
    }
    const onblur = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      formItemCtx.handlerControBlur(props.modelValue)
    }
    return () => {
      return (
        <div class="ant-field-wrap">
          <input
            type={props.type}
            class="ant-field"
            placeholder={attrs.placeholder as string}
            onInput={oninput}
            onBlur={onblur}
            value={props.modelValue}
          />
        </div>
      )
    }
  }
})
