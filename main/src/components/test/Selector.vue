<template>
  <el-popover
    trigger="click"
    :show-arrow="false"
    :teleported="false"
    placement="bottom-start"
    :width="540"
    @hide="submit"
  >
    <template #reference>
      <div class="selector-container">
        {{ selectorText || '一级类目' }}
      </div>
    </template>
    <Pane ref="pane" :data="data" />
  </el-popover>
</template>

<script setup lang="ts">
import Pane from './Pane.vue'
import { ref } from 'vue';
import {type CategoryData} from '../../components/test/type'
import { computed } from 'vue';

// props
defineProps<{
  data:CategoryData
}>()

const pane = ref<InstanceType<typeof Pane> | null>(null)
const selectorText = computed(()=>pane.value?.selectedBelongCategory)

const submit = ()=>{
  console.log('submit');
}
</script>

<style lang="less" scoped>
.selector-container {
  padding: 2px;
  border: 1px solid black;
  width: 240px;
}
</style>