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
    <div class="row">
      <div class="label">{{ `${!categories[0].isSelected?'所属':''}一级类目` }}</div>
      <div class="value-wrapper">
        <div v-show="categories[0].isSelected" class="value" :class="{active:categories[0].selectedValue===0}">
          全部
        </div>
        <div 
          v-for="item in data.firstCategories" 
          :key="item.value" 
          class="value"
          :class="{
            active:categories[0].selectedValue===item.value,
            disabled:categories[0].isSelected
          }"
          @click="categories[0].selectedValue = item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 二级类目 -->
    <div v-show="!categories[0].isSelected" class="row">
      <div class="label">{{ `${!categories[1].isSelected?'所属':''}二级类目` }}</div>
      <div class="value-wrapper">
        <div v-show="categories[1].isSelected" class="value" :class="{active:categories[1].selectedValue===0}">
          全部
        </div>
        <div 
          v-for="item in data.secondCategories" 
          :key="item.value" 
          class="value"
          :class="{
            active:categories[1].selectedValue===item.value,
            disabled:categories[1].isSelected
          }"
          @click="categories[1].selectedValue = item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 三级类目 -->
    <div v-show="categories[2].isSelected" class="row">
      <div class="label">{{ `${!categories[2].isSelected?'所属':''}三级类目` }}</div>
      <div class="value-wrapper">
        <div v-show="categories[2].isSelected" class="value" :class="{active:categories[2].selectedValue===0}">
          全部
        </div>
        <div 
          v-for="item in data.thirdCategories" 
          :key="item.value" 
          class="value"
          :class="{
            active:categories[2].selectedValue===item.value,
            disabled:categories[2].isSelected
          }"
          @click="categories[2].selectedValue = item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';
import {type CategoryData} from '../../components/test/type'
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
const changeIsSelected = ()=>{
  categories.value.forEach((item,index)=>item.isSelected = index===selectedCategoryIndex.value)
}
watch(selectedCategoryIndex,()=>{
  changeIsSelected()
  if (selectedCategoryIndex.value === 0) categories.value[0].selectedValue = 0
  if (selectedCategoryIndex.value === 1) {
    categories.value[0].selectedValue  = props.data.firstCategories[0].value
    categories.value[1].selectedValue  = 0
  }
  if (selectedCategoryIndex.value === 2) categories.value[1].selectedValue  = props.data.secondCategories[0].value
})
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