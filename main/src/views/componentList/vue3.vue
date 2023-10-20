<template>
  <Selector :data="categoryData" />
</template>

<script setup lang="ts">
import Selector from '../../components/test/Selector.vue'
import {type CategoryData} from '../../components/test/type'
const categoryData:CategoryData = {
  firstCategories:[{label:'美妆个护',value:1},{label:'3C数码',value:2},{label:'家用电器',value:3}],
  secondCategories:[{label:'彩妆工具',value:1},{label:'香水',value:2},{label:'美容护肤',value:3},{label:'彩妆套装1',value:4}],
  thirdCategories:[{label:'彩妆工具',value:1},{label:'香水',value:2},{label:'美容护肤',value:3},{label:'彩妆套装1',value:4}],
}
</script>
