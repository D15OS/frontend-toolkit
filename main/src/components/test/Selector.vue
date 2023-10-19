<template>
  <el-popover
    trigger="click"
    :show-arrow="false"
    :teleported="false"
    :width="400"
    @hide="submit"
  >
    <template #reference>
      <div class="selector-container">
        {{ selectorText }}
      </div>
    </template>
    <Pane />
  </el-popover>
</template>

<script setup lang="ts">
import Pane from './Pane.vue'
import { ref } from 'vue';
const selectorText = ref('999')

const submit = ()=>{
  console.log('submit');
}
</script>

<style lang="less" scoped>
.selector-container {
  padding: 2px;
  border: 1px solid black;
  width: 400px;
}
</style>