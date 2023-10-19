<template>
  <div class="container h-full">
    <header>
      <RouterLink :class="{ 'active': routeName === 'components-vue3' }" class="tab-item vue" to="/vue3">Vue3</RouterLink>
      <RouterLink :class="{ 'active': routeName === 'components-react' }" class="tab-item react" to="/react">
        React
      </RouterLink>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const routeName = computed(() => route.name)


</script>

<style lang="less" scoped>
.container {
  @apply p-8 w-full h-full bg-black;

  header {
    @apply px-4 -mb-3 text-lg;
  }

  main {
    @apply bg-white p-8;
    height: calc(100% - 32px);
    border-radius: 10px
  }
}

.tab-item {
  @apply px-5 py-2 mr-2 cursor-pointer inline-block bg-black text-slate-100 font-semibold shadow-md;
  border-radius: 16px;
  border: 2px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  transition: all .3s linear;

  &.vue {
    background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #42d392, #647eff);

    &.active {
      @apply shadow-green-200;
      color: #42d392;
    }
  }

  &.react {
    background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #cb96fd, #61dafb);

    &.active {
      @apply shadow-cyan-200;
      color: #61dafb;
    }
  }
}
</style>