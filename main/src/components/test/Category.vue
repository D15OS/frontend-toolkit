<template>
  <div class="row">
    <div class="label">{{ prefix }}{{ label }}</div>
    <div class="value-wrapper">
      <div v-show="categoryLevel.isSelected" class="value" :class="{ active: categoryLevel.selectedCode === '0' }">
        全部
      </div>
      <div
        v-for="item in categoryItems"
        :key="item.category_code"
        class="value"
        :class="{
          active: categoryLevel.selectedCode === item.category_code,
          disabled: categoryLevel.isSelected,
        }"
        @click="emit('changeSelectedValue', item.category_code)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type CategoryLevel, type Category } from '../../components/test/type'

const emit = defineEmits(['changeSelectedValue'])
const props = defineProps<{
  categoryLevel: CategoryLevel
  categoryItems: Category[]
  label: String
}>()
const prefix = computed(() => (!props.categoryLevel.isSelected ? '所属' : ''))
</script>

<style lang="less">
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
</style>
