<template>
  <div class="app">
    <table-demo></table-demo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableDemo from "@/components/Table/demo.vue";

export default defineComponent({
  name: 'App',
  components: {
    TableDemo
  }
});
</script>

<style lang="scss">
  .app {
    color: $text-color;
    margin: 30px auto;
  }
</style>
