<template>
  <div class="demo-box">
    <a-tree
        :source="list"
        :render="renderNode"
        :lazyLoad="lazyLoad"
        @handleSelected="handleSelected"
    />
  </div>
</template>

<script lang="tsx">
import {defineComponent, onMounted, ref} from 'vue';
import {RequiredTreeNodeOptions, TreeNodeOptions} from "../types";

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
    // https://lychub.github.io/vue-virtual-tree
    const list = ref<TreeNodeOptions[]>([]);
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
          disabled: i % 2 === 0,
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

    const renderNode = (node: RequiredTreeNodeOptions) =>  {
      return <i style="color: red; font-weight: bold">{node.name}</i>
    }

    return {
      list,
      lazyLoad,
      renderNode,
      handleSelected
    }
  }
});
</script>
