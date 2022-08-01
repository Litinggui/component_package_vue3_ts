type nodeKey = string | number; // 唯一索引

/*
* 用户传入的source必须要有 nodeKey, name
*
* */

interface TreeNodeOptions {
  nodeKey: nodeKey;
  name: string;
  level?: number; // 控制缩进
  loading?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  hasChildren?: boolean; // 是否有children
  children?: TreeNodeOptions[];
  parentKey?: nodeKey | null
}

interface TreeInterface {
  getSelectedNode: () => RequiredTreeNodeOptions | undefined;
  getCheckedNodes: () => RequiredTreeNodeOptions[];
  halfCheckedNodes: () => RequiredTreeNodeOptions[];
}

interface TreeNodeInterface {
  node: RequiredTreeNodeOptions;
  halfChecked: () => boolean;
}
/*
* 组件内部使用，所有参数都是必传，没传给默认值
* 这样写组件的时候不需要判断属性是否存在
* */

type RequiredTreeNodeOptions = Required<TreeNodeOptions>

type renderFncType = (node: RequiredTreeNodeOptions) => JSX.Element

export {
  TreeNodeOptions,
  nodeKey,
  renderFncType,
  RequiredTreeNodeOptions,
  TreeInterface,
  TreeNodeInterface
}
