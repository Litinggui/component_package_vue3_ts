import {defineComponent, PropType, ref, watch} from "vue";
import {RequiredTreeNodeOptions} from "@/components/Tree/types";

export default defineComponent({
  name: "ATreeNode",
  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOptions>,
      required: true
    },
    onExpandChildNode: Function as PropType<(node: RequiredTreeNodeOptions) => void>
  },
  emits: ['expandChildNode'],
  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { node }  = props
    const expandChildNode = () => {
      emit('expandChildNode', node)
    }
    const renderIcon = () => {
      return (
         <div class={['node-arrow', node.expanded ? 'expanded' : '']}>
           {
             node.hasChildren ?
                 node.loading ?
                     <i class="iconfont iconloading ico-loading" /> :
                     <i class="iconfont iconExpand" onClick={ expandChildNode } />
                 : null
           }
         </div>
      )
    }
    return () => {
      return (
          <div class="ant-tree" style={{paddingLeft: node.level * 18 + 'px'}}>
            <div class="ant-tree-node">
              { renderIcon() }
              <div class="node-content node-text">
                <span class="node-title">
                  {node.name}
                </span>
              </div>
            </div>
          </div>
      )
    }
  }
})
