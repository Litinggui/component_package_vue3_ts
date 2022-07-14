<template>
  <div>
    <a-form-item label="姓名">
      <template #label>
        <b style="width: 50px">姓名: </b>
      </template>
      <a-input placeholder="请输入姓名"/>
    </a-form-item>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FormDemo",
  setup(props, {emit}) {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>