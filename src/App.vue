<template>
  <div class="app">
    <h3>Tree demo</h3>
    <tree-demo></tree-demo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeDemo from "@/components/Tree/demo.vue";

export default defineComponent({
  name: 'App',
  components: {
    TreeDemo
  }
});
</script>

<style lang="scss">
  .app {
    color: $text-color;
    width: 200px;
    margin: 30px auto;
  }
</style>
