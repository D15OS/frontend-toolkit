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
    <Pane ref="pane" :data="categoryData" @change="onPaneChange" />
  </el-popover>
</template>

<script setup lang="ts">
import Pane from './Pane.vue'
import { ref } from 'vue'
import { type CategoryData, type RawData, type Category } from '../../components/test/type'
import { computed } from 'vue'

// props
const props = defineProps<{
  data: RawData[]
}>()

const pane = ref<InstanceType<typeof Pane> | null>(null)
const selectorText = computed(() => pane.value?.selectedCategoryList.map((item) => item?.name).join('>'))

const submit = () => {
  console.log('submit', pane.value?.selectedCategoryList)
}

// to tree
interface TreeRawData extends Omit<RawData, 'e_commerce_goods_category.parent_code'> {
  children?: TreeRawData[]
}
function buildTree(data: RawData[]): TreeRawData[] {
  const map: { [key: string]: TreeRawData } = {}
  // 初始化TreeRawData节点，并建立id到节点的映射
  data.forEach((item) => {
    const node: TreeRawData = {
      'e_commerce_goods_category.id': item['e_commerce_goods_category.id'],
      'e_commerce_goods_category.name': item['e_commerce_goods_category.name'],
      'e_commerce_goods_category.level': item['e_commerce_goods_category.level'],
      'e_commerce_goods_category.category_code': item['e_commerce_goods_category.category_code'],
    }
    map[item['e_commerce_goods_category.category_code']] = node
  })

  const allNodeData: TreeRawData[] = []
  // 建立父子关系
  data.forEach((item) => {
    const node = map[item['e_commerce_goods_category.category_code']]
    if (item['e_commerce_goods_category.parent_code'] === '0') {
      // 如果parent_code为'0'，则是根节点
      allNodeData.push(node)
    } else {
      const parent = map[item['e_commerce_goods_category.parent_code']]
      if (parent.children) {
        parent.children.push(node)
      } else {
        parent.children = [node]
      }
    }
  })
  return allNodeData
}

const treeRawDataList = buildTree(props.data)

const firstCategoryList = treeRawDataList.map((item) => {
  return {
    id: item['e_commerce_goods_category.id'],
    name: item['e_commerce_goods_category.name'],
    category_code: item['e_commerce_goods_category.category_code'],
  }
})

const secondCategoryList = ref([])
const thirdCategoryList = ref([])
const categoryData = computed<CategoryData>(() => {
  return [firstCategoryList, secondCategoryList.value, thirdCategoryList.value]
})
const onPaneChange = (selectedCategoryList: Category[]) => {
  console.log(selectedCategoryList)
}
console.log(treeRawDataList)
</script>

<style lang="less" scoped>
.selector-container {
  padding: 2px;
  border: 1px solid black;
  width: 240px;
}
</style>
