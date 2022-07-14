<template>
  <div class="app">
    <form-demo/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormDemo from './components/Form/FormDemo.vue';

export default defineComponent({
  name: 'App',
  components: {
    FormDemo
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
