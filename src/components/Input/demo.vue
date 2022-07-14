<template>
  <div>
    text: {{text}}
    <a-input placeholder="请输入xxxxx" v-model="text"/>
    <a-form-item></a-form-item>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "demoVue",
  setup() {
    const text = ref('aaaaaaa')
    return {
      text
    }
  }
})
</script>

<style lang="scss" scoped>

</style>