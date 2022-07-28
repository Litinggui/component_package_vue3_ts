import {computed, defineComponent, PropType, ref, Slot, watch} from "vue";
import {renderFncType, RequiredTreeNodeOptions} from "@/components/Tree/types";
import ACheckbox from './Checkbox'

export default defineComponent({
  name: "ATreeNode",
  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOptions>,
      required: true
    },
    iconSlots: Object as PropType<Slot>,
    showChecked: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    render: Function as PropType<renderFncType>,
    onExpandChildNode: Function as PropType<(node: RequiredTreeNodeOptions) => void>,
    onHandleSelected: Function as PropType<(node: RequiredTreeNodeOptions) => void>,
    onHandleChange: Function as PropType<([checked, node]: [boolean, RequiredTreeNodeOptions]) => void>
  },
  emits: ['expandChildNode', 'handleSelected', 'handleChange'],
  components: {
    ACheckbox
  },
  setup(props, {emit}) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const {node, render, iconSlots, showChecked, checkStrictly} = props
    // 展开节点
    const expandChildNode = () => {
      emit('expandChildNode', node)
    }
    // 选择节点
    const handleSelected = (e: MouseEvent) => {
      e.stopPropagation()
      if (!node.disabled) {
        emit('handleSelected', node)
      }
    }
    // 计算当前节点都有那些 class
    const textCls = computed(() => {
      let result = 'node-title'
      if (node.disabled) {
        result += ' disabled'
      }
      if (node.selected) {
        result += ' selected'
      }
      return result
    })
    // 计算何时需要半选

    const halfChecked = computed(() => {
      let reslut = false
      if(!checkStrictly && node.children.length) {
        const checkeds = node.children.filter(item => item.checked)
        if(checkeds.length > 0 && (checkeds.length !== node.children.length)) {
          reslut = true
        }
      }
      return reslut
    })
    const normalContent = ():JSX.Element => {
      if(render) {
        return render(node)
      }else {
        return (
          <span class={textCls.value} onClick={handleSelected}>
            {node.name}
          </span>
        )
      }
    }
    const renderIcon = (): JSX.Element => {
      return (
        <div class={['node-arrow', node.expanded ? 'expanded' : '']}>
          {
            node.hasChildren
                ? iconSlots ? iconSlots(node.loading) : node.loading
                ? <i class="iconfont iconloading ico-loading"/> : <i class="iconfont iconExpand"/>
                : null
          }
        </div>
      )
    }

    const handleChange = (checked: boolean) => {
      emit('handleChange', [checked, node])
    }

    const renderContent = (): JSX.Element => {
      // 判断是否显示可选框
      if(showChecked) {
        return (
          <a-checkbox
            class="node-content node-checkbox"
            modelValue={node.checked}
            disabled={node.disabled}
            halfChecked={halfChecked.value}
            onChange={handleChange}
          >
            {normalContent()}
          </a-checkbox>
        )
      }else {
        return (
          <div class="node-content node-text">
            {normalContent()}
          </div>
        )
      }
    }

    return () => {
      return (
        <div class="ant-tree" onClick={expandChildNode} style={{paddingLeft: node.level * 18 + 'px'}}>
          <div class="ant-tree-node">
            {renderIcon()}
            {renderContent()}
          </div>
        </div>
      )
    }
  }
})
