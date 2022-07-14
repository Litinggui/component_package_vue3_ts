import {computed, defineComponent, PropType, provide, ref} from "vue";
import './index.scss'
import {AntRuleItem, FormItemKey, trigger} from "@/components/Form/types";
import Schema, {RuleItem} from "async-validator";

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
      type: [Object, Array] as PropType<AntRuleItem | AntRuleItem[]>,
      default: () => ({})
    }
  },
  emits: [],
  setup(props, {emit, slots}) {
    const errMsg = ref('')
    const getRule = (curTrigger: trigger): AntRuleItem[] => {
      const rules = props.rules
      const ruleArr = Array.isArray(rules) ? rules : [rules]
      const trueRules = ruleArr.filter(item => {
        console.log(item);
        const trigger = item?.trigger || 'change'
        return trigger === curTrigger
      })

      return trueRules
    }
    // 数据校验
    const validate = (value: string, rules: AntRuleItem[] ): Promise<any> => {
      // 判断时候传入校验字段和规则
      if(rules && props.prop) {
        // 实例化校验规则d
        const schema = new Schema({[props.prop]: rules})
        // 调用校验规则，传入输入的值
        return schema.validate({[props.prop]: value}).then(() => {
          errMsg.value = '';
          return true
        }).catch(({errors}) => {
          console.log(errors);
          errMsg.value = errors[0].message
          return errors
        })
      }
      return Promise.resolve(true)
    }
    // 接收input改变的方法
    const handlerValueChange = (value: string) => {
      console.log('handlerValueChange', value);
      const trueRules = getRule('change');
      if(trueRules.length) {
        validate(value, trueRules)
      }
    }
    // 接收失去焦点事件
    const handlerControBlur = (value: string) => {
      console.log('handlerControBlur', value);
      const trueRules = getRule('blur');
      if(trueRules.length) {
        validate(value, trueRules)
      }
    }
    // 依赖注入
    provide(FormItemKey, {
      handlerValueChange,
      handlerControBlur
    })

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
