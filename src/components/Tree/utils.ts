import {RequiredTreeNodeOptions} from "@/components/Tree/types";

// 向下联动
const updateDownwards = (node: RequiredTreeNodeOptions, checked: boolean) => {
  const upData = (curNode: RequiredTreeNodeOptions) => {
    if(curNode.children.length) {
      curNode.children.forEach(item => {
        item.checked = checked
        if(item.children?.length) {
          upData(item as RequiredTreeNodeOptions)
        }
      })
    }
  }
  upData(node)
}

// 向上联动
const updateUpwards = (node: RequiredTreeNodeOptions, nodeList: RequiredTreeNodeOptions[]) => {
  const upData = (curNode: RequiredTreeNodeOptions) => {
    if(curNode.parentKey) {
      const parent = nodeList.find(item => item.nodeKey === curNode.parentKey) as RequiredTreeNodeOptions
      // 判断是否需要全选
      const shouldChecked = !parent.children.some(item => !item.checked)
      if(parent.checked !== shouldChecked) {
        parent.checked = shouldChecked
        upData(parent)
      }
    }
  }
  upData(node)
}

export {updateDownwards, updateUpwards}
