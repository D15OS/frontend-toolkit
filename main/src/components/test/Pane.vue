<template>
  <div class="container">
    <el-select-v2
      v-model="value"
      style="width: 240px"
      filterable
      remote
      :remote-method="filterFields"
      clearable
      :options="options"
      :teleported="false"
      placeholder="请输入类目关键词"
      @change="onSearchChange"
    />
    <!-- 类目级别 -->
    <div class="row">
      <div class="label">类目级别</div>
      <div class="value-wrapper">
        <div 
          v-for="(item,index) in categories" 
          :key="index" 
          class="value"
          :class="{active:item.isSelected}"
          @click="changeCategoryLevel(index)"
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
    <!-- footer -->
    <div class="footer">
      <span>已选</span>
      <span>{{ '类目级别：'+ selectedCategoryLevel?.label }}</span>
      <span v-show="selectedBelongCategory">{{ '所属类目：'+ selectedBelongCategory }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import {type CategoryData,type CategoryValue} from '../../components/test/type'
import Category from './Category.vue'
import { computed } from 'vue';
// props
const props = defineProps<{
  data:CategoryData
}>()
// 类目级别
const categories = ref<CategoryValue[]>([
  { label: '一级类目', selectedValue: 0,isSelected:true },
  { label: '二级类目', selectedValue: 0,isSelected:false },
  { label: '三级类目', selectedValue: 0,isSelected:false }
])
// 已选类目级别
const selectedCategoryLevel = computed(()=>categories.value.find(item=>item.isSelected))
// 改变类目级别
const changeCategoryLevel  = (index:number)=>{
  categories.value.forEach((item)=>item.isSelected = false)
  categories.value[index].isSelected = true
  resetEachCategories()
}
// 重置每个类目的选中值
const resetEachCategories = ()=>{
  if (selectedCategoryLevel.value === categories.value[0]) categories.value.forEach(item => item.selectedValue = 0)
  if (selectedCategoryLevel.value === categories.value[1]) {
    if(categories.value[0].selectedValue === 0) categories.value[0].selectedValue = props.data.firstCategories[0].value
    categories.value[1].selectedValue  = 0
  }
  if (selectedCategoryLevel.value === categories.value[2]) 
  {
    if(categories.value[0].selectedValue === 0) categories.value[0].selectedValue = props.data.firstCategories[0].value
    if(categories.value[1].selectedValue === 0) categories.value[1].selectedValue  = props.data.secondCategories[0].value
  }
}
// 已选所属
const selectedBelongCategory = computed(()=>{
  const selectedFirstCategory = props.data.firstCategories.find(item=>item.value === categories.value[0].selectedValue)
  const selectedSecondCategory = props.data.secondCategories.find(item=>item.value === categories.value[1].selectedValue)
  const selectedThirdCategory = props.data.thirdCategories.find(item=>item.value === categories.value[2].selectedValue)
  const allSelectedCategory = [selectedFirstCategory,selectedSecondCategory,selectedThirdCategory]
  const text = allSelectedCategory.filter(item=>item!==undefined).map(item=>item?.label).join(' > ')
  return text
})

// useSearch
const value = ref('')
const firstCategoryOptions = props.data.firstCategories.map(item=>{return {label:item.label, value:item.value.toString()}})
const secondCategoryOptions = props.data.secondCategories.map(item=>{return {label:`${firstCategoryOptions[0].label}>${item.label}`, value:`${firstCategoryOptions[0].value}.${item.value.toString()}`}})
const allOptions =  [...firstCategoryOptions,...secondCategoryOptions]
const filterFields = (text:string)=>{
  if (text !== '') {
      options.value = allOptions.filter((item) => {
        return item.label.includes(text)
      })
  } else {
    options.value = []
  }
}

interface ListItem {
  label: string
  value: string
}

const options = ref<ListItem[]>([])
const onSearchChange = (value:string)=>{
  if(!value) return
  const arr = value.split('.')
  if (arr.length ===1) {
    changeCategoryLevel(1)
    categories.value[0].selectedValue = Number(arr[0])
  }
  if (arr.length === 2) {
    changeCategoryLevel(2)
    categories.value[0].selectedValue = Number(arr[0])
    categories.value[1].selectedValue = Number(arr[1])
  }
}




defineExpose({
  selectedBelongCategory
})

</script>

<style lang="less" scoped>
.container {
  @apply flex flex-col gap-3;
  min-height: 300px;
}
.row {
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
.footer {
  @apply mt-auto flex gap-3;
}
</style>