import {computed, defineComponent, inject, onBeforeMount, onMounted, PropType, provide, ref} from "vue";
import {AntRuleItem, FormContext, FormItemContext, FormItemKey, FormKey, trigger} from "@/components/Form/types";
import Schema, {RuleItem} from "async-validator";
import {ValidateError} from "async-validator/dist-types/interface";

let id = 0;
function generateId() {
  return 'fotm-item-' + id++
}
export default defineComponent({
  name: "AFormItem",
  inheritAttrs: false, // 设置父节点不继承属性
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, Array] as PropType<AntRuleItem | AntRuleItem[]>
    }
  },
  emits: [],
  setup(props, {emit, slots}) {
    const errMsg = ref('')
    const parent = inject<FormContext>(FormKey)
    const curId = generateId()
    // 组件实例初始化完成把组件相关信息传给Form组件
    onMounted(() => {
      parent?.addItem({
        id: curId,
        prop: props.prop,
        validate
      })
    })
    onBeforeMount(() => {
      parent?.removeItem(curId)
    })
    const getRule = (curTrigger?: trigger): AntRuleItem[] => {
      // 获取实例得rules或者AForm传来的rules
      const rules = props.rules || parent?.rules[props.prop]
      if(rules) {
        const ruleArr = Array.isArray(rules) ? rules : [rules]
        // 如果curTrigger存在，则是自己触发得验证，否则是表单触发得验证
        if(curTrigger) {
          if(curTrigger === 'change') {
            return ruleArr.filter(item => item.trigger !== 'blur')
          }else {
            return ruleArr.filter(item => item.trigger === 'blur')
          }
        }else {
          return ruleArr
        }
      }
      return []
    }
    // 数据校验
    const validate = (value: string, rules?: AntRuleItem[] ): Promise<boolean | ValidateError[]> => {
      const trueRules = rules || getRule()
      // 判断时候传入校验字段和规则
      if(trueRules.length && props.prop) {
        // 实例化校验规则
        const schema = new Schema({[props.prop]: trueRules})
        // 调用校验规则，传入输入的值
        return schema.validate({[props.prop]: value}).then(() => {
          errMsg.value = '';
          return Promise.resolve(true)
        }).catch(({errors}) => {
          console.log(errors);
          errMsg.value = errors[0].message
          return Promise.reject(errors)
        })
      }
      return Promise.reject(false)
    }
    // 接收input改变的方法
    const handlerValueChange = (value: string) => {
      const trueRules = getRule('change');
      if(trueRules.length) {
        validate(value, trueRules)
      }
    }
    // 接收失去焦点事件
    const handlerControBlur = (value: string) => {
      const trueRules = getRule('blur');
      if(trueRules.length) {
        validate(value, trueRules)
      }
    }
    // 依赖注入
    provide<Partial<FormItemContext>>(FormItemKey, {
      handlerValueChange,
      handlerControBlur,
    })

    const renderLabel = () => {
        return slots.label ? slots.label() : <label class="item-label">{props.label}</label>
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
