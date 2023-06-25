<template>
  <WujieVue
    width="100%"
    height="100%"
    name="test"
    :exec="true"
    :alive="true"
    :url="url"
  />
</template>

<script setup>
const url = 'http://localhost:5174/'
</script>

<style lang="scss" scoped>

</style>