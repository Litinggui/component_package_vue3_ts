import { defineComponent, ref } from "vue";
import './index.scss'

export default defineComponent({
  name: "AFormItem",
  inheritAttrs: false, // 设置父节点不继承属性
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  emits: [],
  setup(props, {emit, slots}) {
    const errMsg = ref('')
    const renderLabel = () => {
        return slots.label ? slots.label() : <label class="item-label">{props.label}:</label>
    }
    return () => {
      return (
        <div class="ant-form-item">
          { renderLabel() }
          <div class="item-content">
            <div class="item-control-wrap">
              { slots.default!()}
            </div>
            <p class="item-error">
              {errMsg.value}
            </p>
          </div>
        </div>
      )
    }
  }
})