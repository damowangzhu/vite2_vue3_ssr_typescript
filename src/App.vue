<template>
  <div class="page">
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link>
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script lang="ts">
// import request from './utils/request';
// request.get('/test');
export default {};
</script>
<style lang="scss">
.page {
  min-height: calc(100vh - 44px);
  padding-top: 25px;
  text-align: center;
}
</style>
