<template>
  <div class="container">
    <RouterLink class="tab-item" to="/vue3">vue3</RouterLink>
    <RouterLink class="tab-item" to="/react">react</RouterLink>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.container {
  @apply p-8;
  width:100%;
  height:100%;
}
.tab-item {
  @apply p-2 mr-2 cursor-pointer;
  border: 1px solid;
}
</style>