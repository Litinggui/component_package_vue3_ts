<template>
  <div>
    <a-tabs v-model="currentPane" @update:ModelValue="updateModelValue">
      <a-tab-pane name="TabOne">
        <template #title="name">
          <b style="color: #4bba2e">首页-{{name}}</b>
        </template>
        TabOneTabOne
      </a-tab-pane>
      <a-tab-pane name="TabTwo">TabTwoTabTwoTabTwo</a-tab-pane>
      <a-tab-pane name="TabThree">
        <template #title="name">
          <b style="color: #35deee">产品-{{name}}</b>
        </template>
        TabThreeTabThreeTabThree
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import ATabPane from "@/components/Tabs/TabPane";

export default defineComponent({
  name: "TabsDemo",
  components: {ATabPane},
  setup() {
    const currentPane = ref('TabThree')
    const updateModelValue = (name: string) => {
      currentPane.value = name
      console.log('name', currentPane.value);

    }
    return {
      currentPane,
      updateModelValue
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
