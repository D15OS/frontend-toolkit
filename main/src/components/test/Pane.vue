<template>
  <div class="container">
    <!-- 类目级别 -->
    <div class="row">
      <div class="label">类目级别</div>
      <div class="value-wrapper">
        <div 
          v-for="(item,index) in categories" 
          :key="index" 
          class="value"
          :class="{active:selectedCategoryIndex===index}"
          @click="selectedCategoryIndex = index"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 一级类目 -->
    <Category 
      :category="categories[0]" 
      :category-items=" data.firstCategories"
      label="一级类目" 
      @change-selected-value="value=>categories[0].selectedValue = value"
    />
    <!-- 二级类目 -->
    <Category 
      v-show="!categories[0].isSelected"
      :category="categories[1]" 
      :category-items=" data.secondCategories"
      label="二级类目" 
      @change-selected-value="value=>categories[1].selectedValue = value"
    />
    <!-- 三级类目 -->
    <Category 
      v-show="categories[2].isSelected"
      :category="categories[2]" 
      :category-items=" data.thirdCategories"
      label="三级类目" 
      @change-selected-value="value=>categories[2].selectedValue = value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import {type CategoryData} from '../../components/test/type'
import Category from './Category.vue'
// props
const props = defineProps<{
  data:CategoryData
}>()
// 类目级别
const categories = ref([
  { label: '一级类目', selectedValue: 0,isSelected:true },
  { label: '二级类目', selectedValue: 0,isSelected:false },
  { label: '三级类目', selectedValue: 0,isSelected:false }
])
const selectedCategoryIndex = ref(0)
watch(selectedCategoryIndex,()=>{
  changeIsSelected()
  resetEachCategories()
})
const changeIsSelected = ()=>{
  categories.value.forEach((item,index)=>item.isSelected = index===selectedCategoryIndex.value)
}
const resetEachCategories = ()=>{
  if (selectedCategoryIndex.value === 0) categories.value[0].selectedValue = 0
  if (selectedCategoryIndex.value === 1) {
    categories.value[0].selectedValue  = props.data.firstCategories[0].value
    categories.value[1].selectedValue  = 0
  }
  if (selectedCategoryIndex.value === 2) categories.value[1].selectedValue  = props.data.secondCategories[0].value
}
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
    @apply p-1 w-24 text-right shrink-0;
  }
  .value-wrapper {
    display: flex;
    flex-wrap: wrap;
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