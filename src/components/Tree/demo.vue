<template>
  <div class="demo-box">
    <button @click="getSelectedNode">获取选中节点</button>
    <button @click="getCheckedNodes">获取勾选节点</button>
    <button @click="halfCheckedNodes">获取半选节点</button>
    <a-tree
        ref="aTree"
        :source="list"
        :lazyLoad="lazyLoad"
        show-checked
        @handleSelected="handleSelected"
    >
    </a-tree>
  </div>
</template>

<script lang="tsx">
import {defineComponent, onMounted, ref} from 'vue';
import {RequiredTreeNodeOptions, TreeInterface, TreeNodeOptions} from "./types";

function recursion(path = '0'): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 2; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions  = {
      nodeKey,
      name: nodeKey,
      // children: [],
      hasChildren: true
    };
    list.push(treeNode);
  }
  return list;
}

export default defineComponent({
  name: 'TreeDemo',
  setup(props) {
    const list = ref<TreeNodeOptions[]>([]);
    const aTree = ref<TreeInterface>()
    onMounted(() => {
      list.value = recursion();
    });
    const lazyLoad = (node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => {
      const result: TreeNodeOptions[] = [];
      for (let i = 0; i < 2; i += 1) {
        const nodeKey = `${node.nodeKey}-${i}`;
        const treeNode: TreeNodeOptions  = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true
        };
        result.push(treeNode);
      }
      setTimeout(() => {
        callback(result);
      }, 1000);
    }

    const handleSelected = (node: RequiredTreeNodeOptions) => {
      // console.log('@@@@@@@@@@@@handleSelected', node);
    }
    const getCheckedNodes = () => {
      const nodes = aTree.value?.getCheckedNodes()
      console.log('getCheckedNodes', nodes);
    }
    const getSelectedNode = () => {
      const node = aTree.value?.getSelectedNode()
      console.log('getSelectedNode', node);
    }

    const halfCheckedNodes = () => {
      const nodes = aTree.value?.halfCheckedNodes()
      console.log('halfCheckedNodes', nodes);
    }

    return {
      list,
      aTree,
      lazyLoad,
      handleSelected,
      getSelectedNode,
      getCheckedNodes,
      halfCheckedNodes
    }
  }
});
</script>
