<template>
  <div class="row">
    <div class="label">类目级别</div>
    <div class="value-wrapper">
      <div v-for="item in groupTypes" :key="item.value" class="value">
        {{ item.title }}    
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const groupTypes = [
    { title: '一级类目',value:0 },
    { title: '二级类目',value:1 },
    { title: '三级类目',value:2 }
]
const selectedGroupType = ref(0)
</script>

<style lang="less" scoped>
.row {
  display: flex;
  gap: 16px;
  .value-wrapper {
    display: flex;
    gap: 8px;
  }
}
</style>