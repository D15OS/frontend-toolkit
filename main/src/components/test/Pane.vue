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
          v-for="(item, index) in categoryLevels"
          :key="index"
          class="value"
          :class="{ active: item.isSelected }"
          @click="changeCategoryLevel(index)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 一级类目 -->
    <Category
      :category-level="categoryLevels[0]"
      :category-items="data[0]"
      label="一级类目"
      @change-selected-value="(value) => (categoryLevels[0].selectedCode = value)"
    />
    <!-- 二级类目 -->
    <Category
      v-show="!categoryLevels[0].isSelected"
      :category-level="categoryLevels[1]"
      :category-items="data[1]"
      label="二级类目"
      @change-selected-value="(value) => (categoryLevels[1].selectedCode = value)"
    />
    <!-- 三级类目 -->
    <Category
      v-show="categoryLevels[2].isSelected"
      :category-level="categoryLevels[2]"
      :category-items="data[2]"
      label="三级类目"
      @change-selected-value="(value) => (categoryLevels[2].selectedCode = value)"
    />
    <!-- footer -->
    <div class="footer">
      <span>已选</span>
      <span>{{ '类目级别：' + selectedCategoryLevel?.label }}</span>
      <span v-show="selectedCategoryList">{{ '所属类目：' + selectedCategoryList }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import { type CategoryData, type CategoryLevel } from '../../components/test/type'
import Category from './Category.vue'
import { computed } from 'vue'
// props
const props = defineProps<{
  data: CategoryData
}>()
// 类目级别
const categoryLevels = ref<CategoryLevel[]>([
  { label: '一级类目', selectedCode: '0', isSelected: true },
  { label: '二级类目', selectedCode: '0', isSelected: false },
  { label: '三级类目', selectedCode: '0', isSelected: false },
])
// 已选类目级别
const selectedCategoryLevel = computed(() => categoryLevels.value.find((item) => item.isSelected))
// 改变类目级别
const changeCategoryLevel = (index: number) => {
  categoryLevels.value.forEach((item) => (item.isSelected = false))
  categoryLevels.value[index].isSelected = true
  resetEachCategoryLevel()
}
// 重置每个类目的选中值
const resetEachCategoryLevel = () => {
  if (selectedCategoryLevel.value === categoryLevels.value[0])
    categoryLevels.value.forEach((item) => (item.selectedCode = '0'))
  if (selectedCategoryLevel.value === categoryLevels.value[1]) {
    if (categoryLevels.value[0].selectedCode === '0')
      categoryLevels.value[0].selectedCode = props.data[0][0].category_code
    categoryLevels.value[1].selectedCode = '0'
  }
  if (selectedCategoryLevel.value === categoryLevels.value[2]) {
    if (categoryLevels.value[0].selectedCode === '0')
      categoryLevels.value[0].selectedCode = props.data[0][0].category_code
    if (categoryLevels.value[1].selectedCode === '0')
      categoryLevels.value[1].selectedCode = props.data[1][0].category_code
  }
}
// 已选类目路径
const selectedCategoryList = computed(() => {
  const selectedFirstCategory = props.data[0].find(
    (item) => item.category_code === categoryLevels.value[0].selectedCode
  )
  const selectedSecondCategory = props.data[1].find(
    (item) => item.category_code === categoryLevels.value[1].selectedCode
  )
  const selectedThirdCategory = props.data[2].find(
    (item) => item.category_code === categoryLevels.value[2].selectedCode
  )
  const allSelectedCategory = [selectedFirstCategory, selectedSecondCategory, selectedThirdCategory].filter(
    (item) => item !== undefined
  )
  return allSelectedCategory
})
// on change
const emit = defineEmits(['change'])
watch(selectedCategoryList, () => {
  emit('change', selectedCategoryList)
})

// useSearch
const value = ref('')
const firstCategoryOptions = props.data[0].map((item) => {
  return { label: item.name, value: item.category_code }
})
const secondCategoryOptions = props.data[1].map((item) => {
  return {
    label: `${firstCategoryOptions[0].label}>${item.name}`,
    value: `${firstCategoryOptions[0].value}.${item.category_code}`,
  }
})
const allOptions = [...firstCategoryOptions, ...secondCategoryOptions]
const filterFields = (text: string) => {
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
const onSearchChange = (value: string) => {
  if (!value) return
  const arr = value.split('.')
  if (arr.length === 1) {
    changeCategoryLevel(1)
    categoryLevels.value[0].selectedCode = arr[0]
  }
  if (arr.length === 2) {
    changeCategoryLevel(2)
    categoryLevels.value[0].selectedCode = arr[0]
    categoryLevels.value[1].selectedCode = arr[1]
  }
}

defineExpose({
  selectedCategoryList,
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

    .value {
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
