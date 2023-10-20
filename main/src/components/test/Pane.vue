<template>
  <div class="container">
    <!-- 类目级别 -->
    <div class="row">
      <div class="label">类目级别</div>
      <div class="value-wrapper">
        <div 
          v-for="item in categories" 
          :key="item.value" 
          class="value"
          :class="{active:selectedCategory===item.value}"
          @click="selectedCategory = item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 一级类目 -->
    <div class="row">
      <div class="label">一级类目</div>
      <div class="value-wrapper">
        <div v-show="isSelectFirstCategory" class="value" :class="{active:selectedFirstCategory===0}">
          全部
        </div>
        <div 
          v-for="item in data.firstCategories" 
          :key="item.value" 
          class="value"
          :class="{
            active:selectedFirstCategory===item.value,
            disabled:isSelectFirstCategory
          }"
          @click="selectedFirstCategory = item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {type CategoryData} from '../../components/test/type'
import { computed } from 'vue';
import { watch } from 'vue';
// props
defineProps<{
  data:CategoryData
}>()
// 类目级别
const categories = [
  { label: '一级类目', value: 1 },
  { label: '二级类目', value: 2 },
  { label: '三级类目', value: 3 }
]
const selectedCategory = ref(1)
watch(selectedCategory,()=>{
  if (selectedCategory.value === 1) selectedFirstCategory.value = 0
})
// 一级类目
const isSelectFirstCategory = computed(()=>selectedCategory.value===1)
const selectedFirstCategory = ref(0)

</script>

<style lang="less" scoped>
.container {
  min-height: 300px;
}
.row {
  @apply mb-2;
  display: flex;
  gap: 16px;
  .label {
    @apply p-1;
  }
  .value-wrapper {
    display: flex;
    gap: 8px;
    .value{
      @apply p-1 cursor-pointer;
      &.active {
        @apply bg-red-400 text-white;
      }
      &.disabled {
        @apply text-gray-300 pointer-events-none;
      }
    }
  }
}
</style>