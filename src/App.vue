<template>
  <div class="app">
    <tabs-demo/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabsDemo from "@/components/Tabs/demo.vue";

export default defineComponent({
  name: 'App',
  components: {
    TabsDemo
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
