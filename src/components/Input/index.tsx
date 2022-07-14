import { defineComponent } from "vue";
import './index.scss'

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
        return ['text', 'number', 'tel', 'textarea', 'time'].indexOf(value) !== -1
      },
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit, attrs}) {
    console.log('attrs', attrs);

    const oninput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      if(value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    }
    return () => {
      return (
        <div class="ant-field-wrap">
          <input 
            type="text" 
            class="ant-field" 
            placeholder={attrs.placeholder as string}
            onInput={oninput}
            value={props.modelValue}
          />
        </div>
      )
    }
  }
})