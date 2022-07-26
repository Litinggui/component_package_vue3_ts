<template>
  <div>
    <a-tree
      :source="list"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {TreeNodeOptions} from "@/components/Tree/types";

function recursion(path = '0', level = 3): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 5; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions  = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
      // expanded: true
    };

    if (level > 0) {
      treeNode.children = recursion(nodeKey, level - 1);
    } else {
      treeNode.hasChildren = false;
    }

    list.push(treeNode);
  }
  return list;
}

export default defineComponent({
  name: "TreeDemo",
  setup() {
    const list = ref<TreeNodeOptions[]>([]);

    onMounted(() => {
      list.value = recursion();
    });

    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
